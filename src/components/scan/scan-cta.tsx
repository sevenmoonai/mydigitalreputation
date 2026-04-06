"use client"

import Link from "next/link"
import { Shield, ArrowRight } from "lucide-react"
import { motion } from "motion/react"

interface ScanCTAProps {
  authenticated?: boolean
  scanId?: string
}

export function ScanCTA({ authenticated = false, scanId }: ScanCTAProps) {
  const signUpUrl = scanId ? `/sign-up?scanId=${scanId}` : "/sign-up"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/30 via-[#0a0a0a] to-emerald-950/20 p-8 text-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,200,0.05),transparent_60%)]" />

      <div className="relative">
        <Shield className="mx-auto mb-4 size-10 text-cyan-400/60" />

        <h3 className="mb-2 text-xl font-bold text-zinc-100">
          {authenticated
            ? "Consultez votre tableau de bord"
            : "Activez la protection"}
        </h3>
        <p className="mx-auto mb-6 max-w-sm text-sm text-zinc-500">
          {authenticated
            ? "Retrouvez tous vos scans et alertes en un seul endroit."
            : "Creez un compte gratuit pour sauvegarder ce rapport et activer la surveillance continue."}
        </p>

        {authenticated ? (
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
          >
            Aller au dashboard
            <ArrowRight className="size-4" />
          </Link>
        ) : (
          <Link
            href={signUpUrl}
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-black transition-all hover:from-cyan-400 hover:to-emerald-400"
          >
            <Shield className="size-4" />
            Creer un compte gratuit
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </motion.div>
  )
}
