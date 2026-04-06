"""Orchestrateur de scan — coordonne les scanners et envoie les résultats."""

import asyncio
import logging
from typing import Any

from scanners.google_scanner import search as google_search
from scanners.sherlock_scanner import scan_username
from scoring import calculate_score
from webhook import send_results

logger = logging.getLogger("scan-engine.orchestrator")


async def run_scan(
    scan_id: str,
    query: str,
    webhook_url: str,
    secret: str,
) -> None:
    """Exécute un scan complet : Sherlock + Google en parallèle.

    Envoie des résultats partiels via webhook pendant l'exécution,
    puis le résultat final avec le score.
    """
    from main import scan_semaphore

    async with scan_semaphore:
        logger.info("Scan %s démarré pour '%s'", scan_id, query)

        google_results: list[dict[str, Any]] = []
        platform_results: list[dict[str, Any]] = []

        # Callback pour résultats partiels Sherlock
        async def on_sherlock_partial(partial: list[dict[str, Any]]) -> None:
            await send_results(
                webhook_url,
                secret,
                scan_id,
                "results",
                {"platformResults": partial},
            )

        # Exécution parallèle des deux scanners
        sherlock_task = asyncio.create_task(
            _safe_scan(
                "sherlock",
                scan_username(query, callback=on_sherlock_partial),
            )
        )
        google_task = asyncio.create_task(
            _safe_scan("google", google_search(query))
        )

        results = await asyncio.gather(sherlock_task, google_task)
        platform_results = results[0] or []
        google_results = results[1] or []

        # Calcul du sentiment agrégé
        sentiment = _aggregate_sentiment(google_results)

        # Score final
        score = calculate_score(google_results, platform_results, sentiment)

        # Problèmes détectés
        problems = _detect_problems(google_results, platform_results)

        # Envoi des résultats finaux (données)
        await send_results(
            webhook_url,
            secret,
            scan_id,
            "results",
            {
                "googleResults": google_results,
                "platformResults": platform_results,
                "sentiment": sentiment,
                "problemsDetected": problems,
            },
        )

        # Envoi de la complétion (score + statut)
        await send_results(
            webhook_url,
            secret,
            scan_id,
            "complete",
            {"score": score},
        )

        logger.info(
            "Scan %s terminé — score: %d, problèmes: %d",
            scan_id,
            score,
            len(problems),
        )


async def _safe_scan(
    name: str, coro: Any
) -> list[dict[str, Any]]:
    """Wrapper pour capturer les erreurs d'un scanner sans crasher l'autre."""
    try:
        return await coro
    except Exception as exc:
        logger.error("Scanner %s a échoué: %s", name, exc, exc_info=True)
        return []


def _aggregate_sentiment(
    google_results: list[dict[str, Any]],
) -> dict[str, int]:
    """Agrège les sentiments des résultats Google."""
    positive = sum(1 for r in google_results if r.get("sentiment") == "positive")
    negative = sum(1 for r in google_results if r.get("sentiment") == "negative")
    neutral = sum(1 for r in google_results if r.get("sentiment") == "neutral")
    total = len(google_results)

    return {
        "positive": positive,
        "negative": negative,
        "neutral": neutral,
        "total": total,
    }


def _detect_problems(
    google_results: list[dict[str, Any]],
    platform_results: list[dict[str, Any]],
) -> list[dict[str, str]]:
    """Identifie les problèmes de réputation détectés."""
    problems: list[dict[str, str]] = []

    # Résultats Google négatifs dans le top 10
    for r in google_results[:10]:
        if r.get("sentiment") == "negative":
            problems.append({
                "type": "negative_search_result",
                "description": f"{r.get('title', '')} — {r.get('snippet', '')}",
                "url": r.get("url", ""),
                "severity": "high",
            })

    # Plateformes importantes manquantes
    important_platforms = {
        "LinkedIn", "Twitter", "Facebook", "Instagram",
        "GitHub", "YouTube",
    }
    found_platforms = {
        r["platform"]
        for r in platform_results
        if r.get("found")
    }
    missing = important_platforms - found_platforms
    for platform in sorted(missing):
        problems.append({
            "type": "missing_profile",
            "description": f"Aucun profil détecté sur {platform}",
            "url": "",
            "severity": "medium",
        })

    return problems
