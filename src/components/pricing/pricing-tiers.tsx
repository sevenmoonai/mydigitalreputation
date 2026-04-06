export type PricingTier = {
  name: string
  codename: string
  price: string
  priceDetail?: string
  description: string
  features: string[]
  cta: string
  ctaHref: string
  highlighted?: boolean
  badge?: string
  iconName: "shield" | "eye" | "swords"
  accentColor: string
  glowColor: string
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Gratuit",
    codename: "Acces libre",
    price: "0\u00A0\u20AC",
    description: "Decouvrez votre empreinte numerique",
    features: [
      "Scan illimite",
      "Dashboard basique",
      "Score de reputation",
      "Resultats Google + reseaux",
    ],
    cta: "Commencer gratuitement",
    ctaHref: "/scan",
    iconName: "shield",
    accentColor: "text-muted-foreground",
    glowColor: "rgba(161,161,170",
  },
  {
    name: "Preventif",
    codename: "Agent de terrain",
    price: "150\u00A0\u20AC",
    priceDetail: "/mois",
    description: "Surveillance continue de votre reputation",
    features: [
      "Tout le plan Gratuit",
      "Monitoring 24/7",
      "Alertes email + in-app",
      "Credits creation profils (10/mois)",
      "Rapports mensuels",
    ],
    cta: "Contactez-nous",
    ctaHref: "/contact",
    highlighted: true,
    badge: "Recommande",
    iconName: "eye",
    accentColor: "text-[var(--accent-glow)]",
    glowColor: "rgba(0,200,200",
  },
  {
    name: "Defensif",
    codename: "Operation speciale",
    price: "800\u00A0\u20AC",
    priceDetail: "et plus / projet",
    description: "Nettoyage et protection sur-mesure",
    features: [
      "Diagnostic expert",
      "Suppression de contenus",
      "Creation de profils strategiques",
      "Accompagnement personnalise",
      "Suivi du projet",
    ],
    cta: "Reserver un appel",
    ctaHref: "/contact",
    badge: "Par projet",
    iconName: "swords",
    accentColor: "text-amber-400",
    glowColor: "rgba(245,158,11",
  },
]
