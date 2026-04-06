"""MyDigitalReputation — Scan Engine API."""

import asyncio
import logging
import os
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from dotenv import load_dotenv
from fastapi import BackgroundTasks, FastAPI, Header, HTTPException
from pydantic import BaseModel, HttpUrl

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("scan-engine")

MAX_CONCURRENT_SCANS = int(os.getenv("MAX_CONCURRENT_SCANS", "3"))
WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET", "")

# Sémaphore globale pour limiter les scans simultanés
scan_semaphore: asyncio.Semaphore


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Initialise les ressources au démarrage."""
    global scan_semaphore
    scan_semaphore = asyncio.Semaphore(MAX_CONCURRENT_SCANS)
    logger.info(
        "Scan engine démarré (max %d scans simultanés)", MAX_CONCURRENT_SCANS
    )
    yield
    logger.info("Scan engine arrêté")


app = FastAPI(
    title="MyDigitalReputation Scan Engine",
    version="1.0.0",
    lifespan=lifespan,
)


class ScanRequest(BaseModel):
    scanId: str
    query: str
    webhookUrl: HttpUrl
    secret: str


class ScanResponse(BaseModel):
    status: str
    scanId: str


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/scan", status_code=202, response_model=ScanResponse)
async def start_scan(
    body: ScanRequest,
    background_tasks: BackgroundTasks,
    authorization: str = Header(default=""),
) -> ScanResponse:
    """Lance un scan en arrière-plan et renvoie 202 immédiatement."""
    expected = f"Bearer {WEBHOOK_SECRET}"
    if authorization != expected:
        raise HTTPException(status_code=401, detail="Invalid authorization")

    if scan_semaphore.locked() and scan_semaphore._value == 0:
        raise HTTPException(
            status_code=429,
            detail="Trop de scans en cours, réessayez plus tard",
        )

    # Import ici pour éviter les imports circulaires
    from orchestrator import run_scan

    background_tasks.add_task(
        run_scan,
        scan_id=body.scanId,
        query=body.query,
        webhook_url=str(body.webhookUrl),
        secret=body.secret,
    )

    logger.info("Scan %s accepté pour '%s'", body.scanId, body.query)
    return ScanResponse(status="scanning", scanId=body.scanId)
