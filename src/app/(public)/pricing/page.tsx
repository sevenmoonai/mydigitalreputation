import type { Metadata } from "next"
import { PricingCard } from "@/components/pricing/pricing-card"
import { PRICING_TIERS } from "@/components/pricing/pricing-tiers"

export const metadata: Metadata = {
  title: "Tarifs — MyDigitalReputation",
  description:
    "Choisissez votre niveau de protection : scan gratuit, monitoring preventif ou operation de nettoyage complete pour votre reputation en ligne.",
}

export default function PricingPage() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 size-[800px] rounded-full bg-[var(--accent-glow)]/[0.03] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Choisissez votre niveau de{" "}
            <span className="text-[var(--accent-glow)]">protection</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            De la surveillance basique a l&apos;operation de nettoyage complete.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:gap-8 md:grid-cols-3 items-stretch">
          {PRICING_TIERS.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Besoin d&apos;une solution specifique ?{" "}
            <a
              href="/contact"
              className="text-[var(--accent-glow)] underline underline-offset-2 transition-colors hover:text-[var(--accent-glow)]/80"
            >
              Parlons-en
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
