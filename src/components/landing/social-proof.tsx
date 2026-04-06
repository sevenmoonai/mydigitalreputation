"use client"

import { motion } from "motion/react"
import { InView, InViewGroup, InViewItem } from "@/components/effects/in-view"

const platforms = [
  { name: "Google", icon: "G" },
  { name: "LinkedIn", icon: "in" },
  { name: "Twitter / X", icon: "X" },
  { name: "Facebook", icon: "f" },
  { name: "Instagram", icon: "IG" },
  { name: "YouTube", icon: "YT" },
  { name: "TikTok", icon: "TT" },
  { name: "Reddit", icon: "R" },
  { name: "GitHub", icon: "GH" },
  { name: "Glassdoor", icon: "GD" },
  { name: "Trustpilot", icon: "TP" },
  { name: "Pages Jaunes", icon: "PJ" },
]

function PlatformCard({ name, icon, index }: { name: string; icon: string; index: number }) {
  return (
    <InViewItem>
      <motion.div
        className="group relative flex flex-col items-center gap-3 rounded-xl border border-zinc-800/50 bg-zinc-950/50 p-5 backdrop-blur-sm transition-colors hover:border-cyan-500/20 hover:bg-zinc-900/50"
        whileHover={{
          boxShadow: "0 0 25px rgba(6, 182, 212, 0.08)",
        }}
      >
        <motion.div
          className="flex size-12 items-center justify-center rounded-lg bg-zinc-800/50 font-mono text-sm font-bold text-zinc-400 transition-colors group-hover:bg-cyan-500/10 group-hover:text-cyan-400"
          initial={{ opacity: 0.6 }}
          whileInView={{
            opacity: [0.6, 1, 0.6],
          }}
          viewport={{ once: false }}
          transition={{
            duration: 2,
            delay: index * 0.15,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          {icon}
        </motion.div>
        <span className="text-xs text-zinc-500 transition-colors group-hover:text-zinc-300">
          {name}
        </span>

        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: "radial-gradient(circle at center, rgba(6, 182, 212, 0.03) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </InViewItem>
  )
}

export function SocialProof() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.03),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <InView>
          <div className="text-center">
            <motion.div
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs text-cyan-400"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-cyan-500" />
              </span>
              Reseau de surveillance actif
            </motion.div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              437 plateformes sous surveillance
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-500">
              Notre scanner analyse en temps reel les reseaux sociaux, moteurs de
              recherche, annuaires et forums pour etablir votre profil de reputation
              complet.
            </p>
          </div>
        </InView>

        <InViewGroup
          className="mt-14 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6"
          staggerDelay={0.05}
        >
          {platforms.map((platform, i) => (
            <PlatformCard
              key={platform.name}
              name={platform.name}
              icon={platform.icon}
              index={i}
            />
          ))}
        </InViewGroup>

        <InView transition={{ duration: 0.5, delay: 0.3 }}>
          <p className="mt-8 text-center text-sm text-zinc-600">
            + 425 autres plateformes analysees automatiquement
          </p>
        </InView>
      </div>
    </section>
  )
}
