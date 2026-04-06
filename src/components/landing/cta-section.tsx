"use client"

import { useRouter } from "next/navigation"
import { Shield, ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import { Spotlight } from "@/components/effects/spotlight"
import { InView } from "@/components/effects/in-view"

export function CTASection() {
  const router = useRouter()

  return (
    <section className="relative overflow-hidden bg-black py-24 sm:py-32">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.03] blur-[100px]" />
      </div>

      <Spotlight
        className="relative mx-auto max-w-4xl px-4 sm:px-6"
        spotlightSize={600}
        spotlightColor="rgba(6, 182, 212, 0.06)"
      >
        <InView>
          <div className="rounded-2xl border border-zinc-800/50 bg-zinc-950/50 p-8 text-center backdrop-blur-sm sm:p-14">
            <motion.div
              className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-cyan-500/10"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(6, 182, 212, 0)",
                  "0 0 30px rgba(6, 182, 212, 0.2)",
                  "0 0 0px rgba(6, 182, 212, 0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Shield className="size-7 text-cyan-400" />
            </motion.div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Activez votre protection
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-zinc-500">
              Ne laissez pas votre reputation au hasard. Lancez un scan gratuit
              et decouvrez ce qu&apos;Internet dit de vous.
            </p>

            <motion.button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-8 py-3.5 font-semibold text-black transition-colors hover:bg-cyan-400"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Scanner gratuitement
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>

            <p className="mt-4 text-xs text-zinc-600">
              Gratuit &middot; Sans inscription &middot; Resultats en 30 secondes
            </p>
          </div>
        </InView>
      </Spotlight>
    </section>
  )
}
