"use client"

import Link from "next/link"
import { Check, Shield, Eye, Swords } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tilt } from "@/components/effects/tilt"
import { Spotlight } from "@/components/effects/spotlight"
import { cn } from "@/lib/utils"
import type { PricingTier } from "./pricing-tiers"

const iconMap = {
  shield: <Shield className="size-5" />,
  eye: <Eye className="size-5" />,
  swords: <Swords className="size-5" />,
} as const

export function PricingCard({ tier }: { tier: PricingTier }) {
  const icon = iconMap[tier.iconName]

  return (
    <Tilt maxTilt={8} scale={1.02} className="h-full">
      <Spotlight
        spotlightSize={350}
        spotlightColor={`${tier.glowColor}15`}
        className={cn(
          "h-full rounded-xl border bg-card/50 backdrop-blur-sm transition-all duration-300",
          tier.highlighted
            ? "border-[var(--accent-glow)]/30 shadow-[0_0_30px_var(--accent-glow)/0.08]"
            : "border-white/[0.06] hover:border-white/[0.1]"
        )}
      >
        <div className="flex h-full flex-col p-6 sm:p-8">
          {tier.badge && (
            <div className="mb-4">
              <Badge
                className={cn(
                  "border-0 font-semibold",
                  tier.highlighted
                    ? "bg-[var(--accent-glow)]/15 text-[var(--accent-glow)]"
                    : "bg-amber-500/15 text-amber-400"
                )}
              >
                {tier.badge}
              </Badge>
            </div>
          )}

          <div className={cn(
            "mb-4 flex size-10 items-center justify-center rounded-lg",
            tier.highlighted
              ? "bg-[var(--accent-glow)]/10 text-[var(--accent-glow)]"
              : "text-muted-foreground bg-white/5"
          )}>
            {icon}
          </div>

          <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {tier.codename}
          </p>

          <div className="mt-4 mb-1">
            <span className="text-4xl font-bold tracking-tight text-foreground">
              {tier.price}
            </span>
            {tier.priceDetail && (
              <span className="ml-1 text-sm text-muted-foreground">
                {tier.priceDetail}
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground">{tier.description}</p>

          <div className="my-6 h-px bg-white/[0.06]" />

          <ul className="flex-1 space-y-3">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <div className={cn(
                  "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                  tier.highlighted
                    ? "text-[var(--accent-glow)] drop-shadow-[0_0_4px_var(--accent-glow)]"
                    : "text-[var(--accent-safe)]"
                )}>
                  <Check className="size-3.5" strokeWidth={2.5} />
                </div>
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            {tier.highlighted ? (
              <Button
                size="lg"
                render={<Link href={tier.ctaHref} />}
                className="w-full bg-[var(--accent-glow)] text-black font-semibold hover:bg-[var(--accent-glow)]/90 shadow-[0_0_20px_var(--accent-glow)/0.3] transition-shadow hover:shadow-[0_0_30px_var(--accent-glow)/0.4]"
              >
                {tier.cta}
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                render={<Link href={tier.ctaHref} />}
                className="w-full border-white/10 hover:border-white/20 hover:bg-white/5"
              >
                {tier.cta}
              </Button>
            )}
          </div>
        </div>
      </Spotlight>
    </Tilt>
  )
}
