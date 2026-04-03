import Link from "next/link"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type PricingTier = {
  name: string
  price: string
  priceDetail?: string
  description: string
  features: string[]
  cta: string
  ctaHref: string
  highlighted?: boolean
  badge?: string
}

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <Card
      className={cn(
        "relative flex flex-col",
        tier.highlighted && "border-primary shadow-md"
      )}
    >
      {tier.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge>{tier.badge}</Badge>
        </div>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{tier.name}</CardTitle>
        <CardDescription>{tier.description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold tracking-tight">
            {tier.price}
          </span>
          {tier.priceDetail && (
            <span className="ml-1 text-sm text-muted-foreground">
              {tier.priceDetail}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={tier.highlighted ? "default" : "outline"}
          size="lg"
          render={<Link href={tier.ctaHref} />}
        >
          {tier.cta}
        </Button>
      </CardFooter>
    </Card>
  )
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Gratuit",
    price: "0\u00A0\u20AC",
    description: "Decouvrez votre reputation en ligne",
    features: [
      "Scan illimite",
      "Dashboard basique",
      "Score de reputation",
      "Resultats Google + reseaux",
    ],
    cta: "Commencer gratuitement",
    ctaHref: "/scan",
  },
  {
    name: "Preventif",
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
    badge: "Populaire",
  },
  {
    name: "Defensif",
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
  },
]
