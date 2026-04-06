"use client"

import { Search, BarChart3, Shield } from "lucide-react"
import { motion } from "motion/react"
import { Tilt } from "@/components/effects/tilt"
import { ShineBorder } from "@/components/effects/shine-border"
import { InView, InViewGroup, InViewItem } from "@/components/effects/in-view"

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Scannez",
    description:
      "Entrez votre nom ou pseudo. Notre moteur analyse plus de 437 plateformes et les resultats Google en quelques secondes.",
    accent: "#06b6d4",
  },
  {
    icon: BarChart3,
    step: "02",
    title: "Analysez",
    description:
      "Obtenez un score de reputation, la liste de vos profils en ligne et les eventuels contenus problematiques.",
    accent: "#10b981",
  },
  {
    icon: Shield,
    step: "03",
    title: "Protegez",
    description:
      "Suivez nos recommandations pour renforcer votre presence positive et supprimer les contenus genants.",
    accent: "#8b5cf6",
  },
]

function StepCard({
  icon: Icon,
  step,
  title,
  description,
  accent,
}: (typeof steps)[number]) {
  return (
    <InViewItem>
      <Tilt maxTilt={8} scale={1.02}>
        <ShineBorder
          color={[accent, `${accent}80`, accent]}
          duration={10}
          borderRadius={16}
        >
          <div className="relative p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-600">{step}</span>
              <div
                className="flex size-10 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: `${accent}15`,
                  boxShadow: `0 0 20px ${accent}20`,
                }}
              >
                <Icon
                  className="size-5"
                  style={{ color: accent }}
                />
              </div>
            </div>

            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              {description}
            </p>

            <div
              className="absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}30, transparent)`,
              }}
            />
          </div>
        </ShineBorder>
      </Tilt>
    </InViewItem>
  )
}

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-28">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <InView>
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-500">
              Protocole
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              3 etapes pour reprendre le controle
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-500">
              Un processus simple et automatise pour scanner, analyser et proteger
              votre reputation numerique.
            </p>
          </div>
        </InView>

        <InViewGroup
          className="mt-14 grid gap-6 sm:grid-cols-3"
          staggerDelay={0.15}
        >
          {steps.map((step) => (
            <StepCard key={step.step} {...step} />
          ))}
        </InViewGroup>
      </div>
    </section>
  )
}
