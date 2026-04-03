import type { Metadata } from "next"
import { PricingCard, PRICING_TIERS } from "@/components/pricing/pricing-card"

export const metadata: Metadata = {
  title: "Tarifs — MyDigitalReputation",
  description:
    "Decouvrez nos offres : scan gratuit, monitoring preventif et service defensif sur-mesure pour proteger votre reputation en ligne.",
}

export default function PricingPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Des offres adaptees a vos besoins
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Commencez gratuitement, evoluez quand vous en avez besoin.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  )
}
