"""Webhook sender — envoie les résultats au backend Next.js/Convex."""

import asyncio
import logging
from typing import Any

import httpx

logger = logging.getLogger("scan-engine.webhook")

MAX_RETRIES = 3
BASE_DELAY = 1.0  # secondes


async def send_results(
    webhook_url: str,
    secret: str,
    scan_id: str,
    result_type: str,
    data: dict[str, Any],
) -> bool:
    """Envoie les résultats via POST avec retry exponentiel.

    Args:
        webhook_url: URL du webhook destinataire.
        secret: Secret partagé pour l'authentification.
        scan_id: Identifiant du scan.
        result_type: 'partial' ou 'complete'.
        data: Payload à envoyer.

    Returns:
        True si l'envoi a réussi, False sinon.
    """
    payload = {
        "scanId": scan_id,
        "type": result_type,
        **data,
    }

    headers = {
        "Authorization": f"Bearer {secret}",
        "Content-Type": "application/json",
    }

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            async with httpx.AsyncClient(timeout=15) as client:
                resp = await client.post(
                    webhook_url,
                    json=payload,
                    headers=headers,
                )
                resp.raise_for_status()

            logger.info(
                "Webhook envoyé (%s) pour scan %s [tentative %d]",
                result_type,
                scan_id,
                attempt,
            )
            return True

        except (httpx.HTTPStatusError, httpx.RequestError) as exc:
            logger.warning(
                "Webhook échoué pour scan %s [tentative %d/%d]: %s",
                scan_id,
                attempt,
                MAX_RETRIES,
                exc,
            )
            if attempt < MAX_RETRIES:
                delay = BASE_DELAY * (2 ** (attempt - 1))
                await asyncio.sleep(delay)

    logger.error(
        "Webhook définitivement échoué pour scan %s après %d tentatives",
        scan_id,
        MAX_RETRIES,
    )
    return False
