# MyDigitalReputation — Design Brief

## POV Statement

> **Des particuliers et professionnels soucieux de leur image** ont besoin de **protéger et maîtriser leur réputation en ligne** parce que **leur nom est googlé avant chaque décision — embauche, contrat, rendez-vous**. Ils se sentent **vulnérables et impuissants** et devraient se sentir **protégés, en contrôle, puissants**. Le produit doit être ressenti comme **un QG d'agent secret numérique** — mystérieux, technologique, protecteur.

## Identité & Direction Créative

### Concept : "L'Agence Secrète de la Réputation"
On n'est PAS un SaaS générique de plus. On est une **agence d'élite qui opère dans l'ombre** pour protéger la réputation de ses clients. Chaque interaction doit transmettre :

- **Maîtrise technologique** — On scanne 400+ plateformes, on surveille le dark web, on utilise de l'IA avancée
- **Protection** — Bouclier numérique, surveillance bienveillante, sentinelle
- **Secret/Élite** — Interface de type "mission control", données qui apparaissent comme un briefing
- **Innovation** — Effets visuels qui montrent qu'on est à la pointe (particles, glitch, scan animations)

### Métaphore visuelle
- Interface = **salle de contrôle de cybersécurité**
- Scan = **radar qui balaye et détecte**
- Score = **jauge de bouclier / intégrité du système**
- Alertes = **signaux interceptés**
- Profils = **identités construites (cover identities)**

### Palette & Mood
- **Dark-first** — fond noir/très foncé, accents néon (cyan/vert/violet)
- **Glow effects** — éléments qui brillent, borders lumineuses
- **Data visualization** — chiffres animés, particules, grilles de surveillance
- **Typographie** — titres bold avec effets (glitch, shimmer), corps clean
- **Motion** — tout est vivant, rien n'est statique

## Pages à redesigner (par priorité)

### Wave 1 — Impact visuel immédiat
1. **Landing page** (/, hero, social proof, how-it-works, FAQ)
2. **Scan page** (/scan — l'expérience core)
3. **Scan results** (/scan/[id] — le "wow moment")

### Wave 2 — Conversion & Dashboard
4. **Pricing** (/pricing)
5. **Dashboard overview** (/dashboard)
6. **Navbar + Footer** (layout global)

### Wave 3 — Pages secondaires
7. Dashboard pages internes (scans, profiles, alerts, projects, settings)
8. Blog, Contact, Legal

## Composants UI locaux à utiliser

### KokonutUI (effets visuels)
- `background-paths.tsx` — fond animé pour le hero
- `beams-background.tsx` — rayons lumineux pour le scanner
- `shape-hero.tsx` — shapes animées en fond
- `liquid-glass-card.tsx` — cartes glass morphism
- `mouse-effect-card.tsx` — spotlight au survol
- `glitch-text.tsx` — effet glitch pour les titres
- `matrix-text.tsx` — révélation style Matrix
- `shimmer-text.tsx` — texte brillant
- `particle-button.tsx` — bouton avec explosion de particules
- `gradient-button.tsx` — CTA avec gradient

### CultUI (effets créatifs)
- `fractal-grid.tsx` — grille fractale en fond
- `shine-border.tsx` — bordure brillante
- `gradient-heading.tsx` — titres en gradient
- `number-ticker.tsx` — compteurs animés
- `magic-card.tsx` — carte avec effet magique au hover

### MotionUI (animations)
- `text-scramble.tsx` — révélation de texte scramblé
- `glow-effect.tsx` — effet de glow
- `spotlight.tsx` — spot lumineux au hover
- `border-trail.tsx` — bordure animée
- `tilt.tsx` — tilt 3D au hover
- `animated-number.tsx` — nombres animés
- `in-view.tsx` — animations au scroll

## Concurrence

| Concurrent | Point fort | Point faible | Ce qu'on vole |
|-----------|-----------|-------------|---------------|
| **BrandYourself** | Scan gratuit + cleanup | UI datée, pas impressionnante | Le modèle freemium scan |
| **Birdeye** | Dashboard unifié reviews | Enterprise, pas sexy | La densité de données |
| **Reputation.com** | Analytics poussées | Trop corporate | Les benchmarks par catégorie |
| **DeleteMe** | Privacy-first | Trop simple, pas de dashboard | La promesse de suppression |
| **Caliber** | Trust Score en temps réel | Ciblé enterprise seulement | Le score comme KPI central |

**Ce que PERSONNE ne fait :** une interface qui donne l'impression d'être dans un film de cybersécurité. Tout le monde fait du SaaS blanc générique. Notre avantage = l'expérience émotionnelle.

## Stack technique
- Next.js 16 + Convex + Clerk + shadcn/ui
- Animations: motion/react + composants UI locaux
- Theme: dark-first, Vercel theme comme base puis customisation
