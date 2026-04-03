# My Digital Reputation — Design Spec

## Overview

SaaS de gestion d'e-reputation pour particuliers et dirigeants. Le produit combine un scan gratuit de presence en ligne (hook d'acquisition) avec des services payants de monitoring et de nettoyage de reputation.

**Approche** : Scan-First SaaS — l'utilisateur decouvre la valeur avant de creer un compte.

## Cible

- **MVP** : B2C — dirigeants et particuliers
- **Hook** : le defensif (la personne a deja un probleme)
- **Retention** : le preventif (monitoring continu)

## Acquisition

Les utilisateurs arrivent via des landing pages SEO ciblant les problemes de reputation ("comment supprimer un avis Google negatif", "contenu genant sur internet", etc.). Ils sont deja conscients de leur probleme.

## Parcours utilisateur

### Funnel principal

1. Article SEO / Landing page → le visiteur cherche une solution a un probleme de reputation
2. Page `/scan` → il tape son nom ou pseudo
3. Resultats en temps reel (streaming) → score, profils trouves, problemes detectes
4. CTA signup → creer un compte gratuit pour sauvegarder le rapport
5. Dashboard → score, alertes, actions recommandees
6. Upsell → monitoring (preventif) ou nettoyage (defensif)

### Parcours preventif (upsell monitoring)

Le dashboard gratuit affiche un score statique (one-shot). Un bandeau rappelle l'anciennete du scan et propose d'activer le monitoring temps reel (plan preventif a ~150 EUR/mois). Ce plan inclut le monitoring 24h, les alertes email + in-app, et des credits mensuels pour creer des profils.

### Parcours defensif (upsell nettoyage)

Quand des problemes sont detectes, le dashboard propose de les faire disparaitre. L'utilisateur accede a une page de demande de projet, voit le resume des problemes, et reserve un appel de diagnostic via Cal.com. Apres le call, un devis est etabli (~800-900 EUR par projet). Le suivi se fait dans le dashboard avec une timeline des etapes.

### Creation de profils (self-service)

L'utilisateur accede a une liste de plateformes recommandees, triees par autorite de domaine. Il selectionne une plateforme, suit un guide pas-a-pas, et consomme un credit. Phase 2 introduira la creation semi-automatisee.

## Pricing

| Niveau | Type | Prix | Inclus |
|--------|------|------|--------|
| Gratuit | — | 0 EUR | Compte, scan one-shot, dashboard statique |
| Preventif | Abonnement | ~150 EUR/mois | Monitoring continu, alertes, credits creation de profils |
| Defensif | Projet ponctuel (sur devis) | a partir de 800 EUR | Nettoyage, suppression de contenus, accompagnement expert, call de diagnostic |

Note : le defensif n'est pas un plan Stripe. Un utilisateur free ou preventif peut demander un projet de nettoyage. Le pricing defensif est un devis apres call de diagnostic.

## Architecture

### Stack

| Couche | Techno | Role |
|--------|--------|------|
| Frontend | Next.js 16 + shadcn/ui | Pages SEO (SSR) + App dashboard (CSR) |
| Backend | Convex | DB temps reel, queries, mutations, crons |
| Auth | Clerk | Signup/login, gestion des plans |
| Scan engine | Micro-service Python (FastAPI) | Wrapper Sherlock + Google scraping + sentiment |
| Hebergement app | Vercel | Next.js |
| Hebergement scan | Railway / Fly.io | Service Python persistant |
| Paiements | Stripe | Abonnements + credits (phase 2) |
| Emails | Resend | Alertes, digests, transactionnels (phase 2) |
| Call booking | Cal.com (embed) | Prise de RDV pour les projets defensifs |
| Blog | MDX dans le repo | Articles SEO, guides |

### Flux scan

```
Next.js → Convex mutation: startScan(query)
  → Convex action: triggerScan() → HTTP POST vers FastAPI
    → FastAPI lance en parallele:
      - Sherlock (400+ plateformes)
      - Google Custom Search API
      - Scraping avis en ligne
    → Chaque resultat partiel → webhook HTTP vers Convex httpAction
      → Convex mutation: updateScan() → push temps reel au frontend
```

Le frontend n'appelle jamais le micro-service directement. Convex est la source de verite.

**Gestion d'erreur** : un cron Convex toutes les 5 minutes verifie les scans en status `"running"` depuis plus de 10 minutes et les passe en `"failed"` avec un message d'erreur. L'utilisateur peut relancer le scan.

### Score de reputation (0-100)

| Facteur | Poids | Logique |
|---------|-------|---------|
| Resultats Google negatifs en page 1 | 40% | Chaque resultat negatif = -10 a -15 points |
| Couverture plateformes | 20% | Ratio profils existants / profils recommandes |
| Avis en ligne | 20% | Note moyenne ponderee par plateforme |
| Sentiment global des mentions | 20% | Ratio positif/negatif sur l'ensemble |

Echelle : 80-100 excellent, 60-79 correct, 40-59 problemes visibles, 0-39 critique.

## Data model (Convex)

### users
- `clerkId`: string (index)
- `name`: string
- `email`: string
- `plan`: "free" | "preventive" (defensif gere via table projects, pas un plan)
- `credits`: number
- `createdAt`: number

### scans
- `userId?`: Id<"users"> (nullable — scan anonyme avant signup, rattache au compte via scanId en URL apres inscription)
- `query`: string
- `score`: number (0-100)
- `status`: "running" | "completed" | "failed"
- `googleResults`: array of { url, title, snippet, sentiment, position }
- `platformResults`: array of { platform, url, found, username }
- `sentiment`: { positive, negative, neutral }
- `problemsDetected`: array of { type, description, severity }
- `createdAt`: number

### profiles
- `userId`: Id<"users">
- `platform`: string
- `url`: string
- `status`: "suggested" | "in_progress" | "created" | "verified"
- `creditsUsed`: number
- `createdAt`: number

### alerts
- `userId`: Id<"users">
- `type`: "new_result" | "sentiment_change" | "new_review" | "mention"
- `source`: string
- `title`: string
- `url`: string
- `severity`: "info" | "warning" | "critical"
- `read`: boolean
- `createdAt`: number

### projects
- `userId`: Id<"users">
- `status`: "pending_call" | "quoted" | "in_progress" | "completed"
- `price`: number
- `callBookedAt?`: number
- `steps`: array of { title, status, completedAt? }
- `contentsToRemove`: array of { url, type, status }
- `profilesCreated`: array of Id<"profiles">
- `createdAt`: number

### platforms
- `name`: string
- `slug`: string
- `category`: "social" | "review" | "directory" | "professional" | "other"
- `domainAuthority`: number
- `autoCreatable`: boolean
- `guideUrl?`: string
- `sherlockSupported`: boolean

Table `platforms` seedee manuellement au MVP (~30-50 plateformes prioritaires). Extensible via admin ou script.

## Pages

### Pages publiques (SEO)

| Route | Role |
|-------|------|
| `/` | Landing page — hero avec champ de scan, social proof, pricing, FAQ |
| `/scan` | Page de scan dediee — champ de recherche, resultats streaming, CTA signup |
| `/scan/[id]` | Resultats d'un scan — rapport complet, score, problemes, CTA signup |
| `/pricing` | Plans et tarifs — 3 colonnes, FAQ pricing |
| `/blog/[slug]` | Articles SEO — contenu long-form, CTA scan integre |
| `/guides/[slug]` | Guides pratiques — "Comment supprimer...", "Comment creer un profil sur..." |
| `/contact` | Formulaire + Cal.com embed |

### Pages app authentifiees

| Route | Role |
|-------|------|
| `/dashboard` | Vue d'ensemble — score, alertes, actions recommandees, etat monitoring |
| `/dashboard/scans` | Historique des scans — liste, relancer, comparer evolution |
| `/dashboard/profiles` | Gestion des profils — crees, suggeres, guides, credits restants |
| `/dashboard/alerts` | Centre d'alertes — feed temps reel, filtres, marquer lu |
| `/dashboard/projects` | Projets de nettoyage — timeline, contenus cibles, statuts |
| `/dashboard/projects/[id]` | Detail d'un projet — etapes, progression, contenus |
| `/dashboard/settings` | Compte et abo — plan, credits, facturation, notifications |

### Layout app

Sidebar collapsible + header (recherche, alertes, avatar). Footer bar avec credits restants et plan actuel. Inspire du dashboard-reference shadcn-ui-kit.

## Scan engine — Sherlock

Sherlock (GitHub: sherlock-project/sherlock) est un outil Python CLI qui recherche un username sur 400+ plateformes. Il constitue le moteur principal du scan de presence.

**Integration** : micro-service Python (FastAPI) heberge separement. Sherlock est trop lourd (400+ requetes HTTP) pour tourner dans une Action Convex. Le service gere la queue, le rate limiting (max 3 scans simultanes au MVP), et retourne les resultats progressivement via webhook.

## Donnees personnelles

Le produit manipule des donnees personnelles (noms, profils en ligne, mentions). Obligations :
- Politique de confidentialite et CGU des le MVP
- Retention des scans anonymes : 30 jours, puis suppression automatique
- Droit a l'effacement : l'utilisateur peut supprimer son compte et toutes ses donnees
- Les scans ne sont jamais partages entre utilisateurs

## Phases

### Phase 1 — MVP

- Landing page + page scan + resultats streaming
- Inscription Clerk + dashboard avec score et problemes
- Micro-service FastAPI + Sherlock + Google search + sentiment basique
- Profils suggeres avec guides manuels
- Page projets avec booking Cal.com
- 5-10 articles/guides SEO de lancement
- Pricing affiche (CTA "Contactez-nous", pas de paiement en ligne)

### Phase 2 — Monetisation + Monitoring

- Stripe : abonnements + systeme de credits
- Monitoring cron (check quotidien pour users premium)
- Alertes email (Resend) + alertes in-app temps reel
- Creation de profils semi-automatisee
- Elargissement du scan

### Phase 3 — Scale

- i18n (site EN)
- Dashboard avance : evolution du score, graphiques
- Gestion complete des projets de nettoyage
- API pour agences / whitelabel
- SEO programmatique a grande echelle
