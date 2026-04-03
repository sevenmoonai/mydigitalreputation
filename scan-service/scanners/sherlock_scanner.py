"""Scanner Sherlock — détection de profils sur les réseaux sociaux."""

import asyncio
import json
import logging
import shutil
import tempfile
from pathlib import Path
from typing import Any, Callable, Coroutine

logger = logging.getLogger("scan-engine.sherlock")


async def scan_username(
    username: str,
    callback: Callable[[list[dict[str, Any]]], Coroutine[Any, Any, None]] | None = None,
) -> list[dict[str, Any]]:
    """Lance un scan Sherlock sur un nom d'utilisateur.

    Utilise le CLI sherlock avec --json car l'import direct
    de sherlock_project n'est pas stable en tant que bibliothèque.
    """
    sherlock_bin = shutil.which("sherlock")
    if sherlock_bin is None:
        logger.error("Sherlock CLI introuvable dans le PATH")
        return []

    results: list[dict[str, Any]] = []
    tmpdir = tempfile.mkdtemp()
    output_file = Path(tmpdir) / f"{username}.json"

    try:
        proc = await asyncio.create_subprocess_exec(
            sherlock_bin,
            username,
            "--json", str(output_file),
            "--timeout", "15",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )

        _, stderr = await asyncio.wait_for(proc.communicate(), timeout=120)

        if proc.returncode != 0:
            logger.warning(
                "Sherlock terminé avec code %d: %s",
                proc.returncode,
                stderr.decode(errors="replace")[:500],
            )

        if output_file.exists():
            raw = json.loads(output_file.read_text(encoding="utf-8"))
            results = _parse_sherlock_output(raw, username)
        else:
            logger.warning("Fichier de résultats Sherlock introuvable")

    except asyncio.TimeoutError:
        logger.error("Sherlock timeout après 120s pour '%s'", username)
    except (json.JSONDecodeError, OSError) as exc:
        logger.error("Erreur parsing résultats Sherlock: %s", exc)
    finally:
        # Nettoyage du répertoire temporaire
        import shutil as _shutil
        _shutil.rmtree(tmpdir, ignore_errors=True)

    # Envoi de résultats partiels par lots de 20
    if callback and results:
        batch_size = 20
        for i in range(0, len(results), batch_size):
            batch = results[: i + batch_size]
            try:
                await callback(batch)
            except Exception as exc:
                logger.warning("Erreur callback partiel: %s", exc)

    logger.info(
        "Sherlock: %d plateformes trouvées pour '%s'",
        sum(1 for r in results if r["found"]),
        username,
    )
    return results


def _parse_sherlock_output(
    raw: dict[str, Any], username: str
) -> list[dict[str, Any]]:
    """Transforme la sortie JSON de Sherlock en format uniforme."""
    results: list[dict[str, Any]] = []

    for platform, data in raw.items():
        if platform.startswith("_") or not isinstance(data, dict):
            continue

        try:
            url = data.get("url_user", "")
            status = data.get("status", {})
            found = status.get("message", "") == "Claimed"

            results.append({
                "platform": platform,
                "url": url,
                "found": found,
            })
        except (AttributeError, TypeError) as exc:
            logger.debug("Skip plateforme %s: %s", platform, exc)
            continue

    return results
