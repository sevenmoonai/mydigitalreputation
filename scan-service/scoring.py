"""Calcul du score de réputation en ligne."""

import logging
from typing import Any

logger = logging.getLogger("scan-engine.scoring")

# Seuils de pondération
WEIGHT_GOOGLE_NEGATIVE = 0.40
WEIGHT_COVERAGE = 0.20
WEIGHT_REVIEWS = 0.20
WEIGHT_SENTIMENT = 0.20

# Constantes
NEGATIVE_PENALTY_PER_RESULT = 12
MAX_NEGATIVE_PENALTY = 48
COVERAGE_BASELINE = 15
REVIEWS_PLACEHOLDER = 15  # MVP : pas de scraping d'avis


def calculate_score(
    google_results: list[dict[str, Any]],
    platform_results: list[dict[str, Any]],
    sentiment: dict[str, int],
) -> int:
    """Calcule le score de réputation (0-100).

    Pondération :
    - Google négatif (40%) : chaque résultat négatif dans le top 10 = -12 pts
    - Couverture profils (20%) : ratio profils trouvés / 15
    - Avis (20%) : placeholder 15 pts (MVP)
    - Sentiment (20%) : ratio positif / total
    """
    score = 100.0

    # --- Google négatif (40% du poids) ---
    top_10 = google_results[:10]
    negative_count = sum(
        1 for r in top_10 if r.get("sentiment") == "negative"
    )
    google_penalty = min(
        negative_count * NEGATIVE_PENALTY_PER_RESULT,
        MAX_NEGATIVE_PENALTY,
    )
    score -= google_penalty

    # --- Couverture profils (20%) ---
    found_profiles = sum(1 for p in platform_results if p.get("found"))
    coverage_bonus = min(found_profiles / COVERAGE_BASELINE, 1.0) * 20
    # On ne retire pas de points, on ajoute le bonus (base déjà à 100)
    # Le bonus compense les pénalités : on part de 100 et on retire/ajoute
    score = score - 20 + coverage_bonus

    # --- Avis (20%) : placeholder MVP ---
    score = score - 20 + REVIEWS_PLACEHOLDER

    # --- Sentiment global (20%) ---
    positive = sentiment.get("positive", 0)
    total = sentiment.get("total", 0)
    sentiment_score = (positive / max(total, 1)) * 20
    score = score - 20 + sentiment_score

    final = int(max(0, min(100, round(score))))

    logger.info(
        "Score calculé: %d (neg_google=%d, profils=%d, sentiment=%d/%d)",
        final,
        negative_count,
        found_profiles,
        positive,
        total,
    )
    return final
