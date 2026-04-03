"""Scanner Google — recherche de résultats liés à un nom."""

import logging
import os
from typing import Any

import httpx

logger = logging.getLogger("scan-engine.google")

GOOGLE_API_URL = "https://www.googleapis.com/customsearch/v1"

# Mots-clés de sentiment (français)
NEGATIVE_KEYWORDS = {
    "arnaque", "fraud", "fraude", "plainte", "scam", "problème",
    "mauvais", "négatif", "avis négatif", "escroc", "danger",
    "attention", "escroquerie", "méfiance", "litige", "faux",
}
POSITIVE_KEYWORDS = {
    "expert", "recommandé", "professionnel", "excellent", "5 étoiles",
    "fiable", "confiance", "meilleur", "qualité", "reconnu",
    "compétent", "sérieux", "référence", "performant", "certifié",
}


async def search(name: str) -> list[dict[str, Any]]:
    """Recherche Google Custom Search pour un nom.

    Retourne les 20 premiers résultats avec analyse de sentiment.
    """
    api_key = os.getenv("GOOGLE_API_KEY", "")
    cx = os.getenv("GOOGLE_CX", "")

    if not api_key or not cx:
        logger.error("GOOGLE_API_KEY ou GOOGLE_CX non configuré")
        return []

    results: list[dict[str, Any]] = []

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            # Google CSE retourne max 10 résultats par requête
            for start_index in (1, 11):
                resp = await client.get(
                    GOOGLE_API_URL,
                    params={
                        "key": api_key,
                        "cx": cx,
                        "q": name,
                        "num": 10,
                        "start": start_index,
                    },
                )
                resp.raise_for_status()
                data = resp.json()

                for item in data.get("items", []):
                    title = item.get("title", "")
                    snippet = item.get("snippet", "")
                    sentiment = analyze_sentiment(title, snippet)
                    position = len(results) + 1

                    results.append({
                        "url": item.get("link", ""),
                        "title": title,
                        "snippet": snippet,
                        "sentiment": sentiment,
                        "position": position,
                    })

    except httpx.HTTPStatusError as exc:
        logger.error("Google API HTTP %d: %s", exc.response.status_code, exc)
    except httpx.RequestError as exc:
        logger.error("Google API erreur réseau: %s", exc)

    logger.info("Google: %d résultats pour '%s'", len(results), name)
    return results


def analyze_sentiment(title: str, snippet: str) -> str:
    """Analyse basique du sentiment à partir du titre et du snippet.

    Retourne 'positive', 'negative' ou 'neutral'.
    """
    text = f"{title} {snippet}".lower()

    neg_count = sum(1 for kw in NEGATIVE_KEYWORDS if kw in text)
    pos_count = sum(1 for kw in POSITIVE_KEYWORDS if kw in text)

    if neg_count > pos_count:
        return "negative"
    if pos_count > neg_count:
        return "positive"
    return "neutral"
