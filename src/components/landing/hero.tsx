"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Shield, Zap } from "lucide-react"
import { motion } from "motion/react"
import { BackgroundPaths } from "@/components/effects/background-paths"
import { TextScramble } from "@/components/effects/text-scramble"
import { AnimatedNumber } from "@/components/effects/animated-number"

const PLACEHOLDER_TEXTS = [
  "Entrez votre nom...",
  "Jean Dupont",
  "Votre pseudo en ligne...",
  "Marie Martin",
]

function TypewriterPlaceholder() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const text = PLACEHOLDER_TEXTS[currentIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(text.slice(0, displayText.length + 1))
          if (displayText.length === text.length) {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          setDisplayText(text.slice(0, displayText.length - 1))
          if (displayText.length === 0) {
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % PLACEHOLDER_TEXTS.length)
          }
        }
      },
      isDeleting ? 30 : 80
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentIndex])

  return displayText
}

function ScanButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <motion.button
      type="submit"
      disabled={isSubmitting}
      className="group relative shrink-0 overflow-hidden rounded-lg bg-cyan-500/90 px-6 py-3 font-semibold text-black transition-colors hover:bg-cyan-400 disabled:opacity-50"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative flex items-center gap-2">
        <Search className="size-4" />
        {isSubmitting ? "Scan en cours..." : "Lancer le scan"}
      </span>
    </motion.button>
  )
}

function StatItem({
  value,
  label,
  suffix,
  delay,
}: {
  value: number
  label: string
  suffix?: string
  delay: number
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="text-center"
    >
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] sm:text-4xl">
          {isVisible ? (
            <AnimatedNumber
              value={value}
              springOptions={{ bounce: 0, duration: 2500 }}
            />
          ) : (
            "0"
          )}
        </span>
        {suffix && (
          <span className="text-lg font-bold text-cyan-400">{suffix}</span>
        )}
      </div>
      <p className="mt-1 text-sm text-zinc-500">{label}</p>
    </motion.div>
  )
}

export function Hero() {
  const [query, setQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [headlinePhase, setHeadlinePhase] = useState<0 | 1>(0)
  const router = useRouter()
  const placeholder = TypewriterPlaceholder()

  useEffect(() => {
    const timer = setTimeout(() => setHeadlinePhase(1), 3000)
    return () => clearTimeout(timer)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    setIsSubmitting(true)
    router.push(`/scan?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <BackgroundPaths />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />

      <div className="absolute left-1/2 top-1/4 -translate-x-1/2">
        <motion.div
          className="size-[600px] rounded-full bg-cyan-500/5 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-sm text-cyan-400"
        >
          <Shield className="size-3.5" />
          <span>Protection e-reputation avancee</span>
        </motion.div>

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {headlinePhase === 0 ? (
              <TextScramble
                key="exposed"
                duration={1.8}
                className="font-sans text-white"
              >
                Votre reputation est exposee.
              </TextScramble>
            ) : (
              <TextScramble
                key="protect"
                duration={1.5}
                className="font-sans bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
              >
                Nous la protegeons.
              </TextScramble>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mx-auto mt-6 max-w-xl text-lg text-zinc-400"
          >
            Scannez votre presence en ligne en 30 secondes.
            <br className="hidden sm:block" />
            Gratuit. Sans inscription. 437 plateformes analysees.
          </motion.p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mx-auto mt-10 w-full max-w-lg"
        >
          <div className="relative flex gap-2 rounded-xl border border-zinc-800 bg-zinc-950/80 p-1.5 shadow-[0_0_30px_rgba(6,182,212,0.05)] backdrop-blur-sm transition-shadow focus-within:border-cyan-500/30 focus-within:shadow-[0_0_40px_rgba(6,182,212,0.1)]">
            <div className="relative flex-1">
              <Zap className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-500/50" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="h-11 w-full rounded-lg bg-transparent pl-10 pr-3 font-mono text-sm text-cyan-100 placeholder:text-zinc-600 focus:outline-none"
              />
            </div>
            <ScanButton isSubmitting={isSubmitting} />
          </div>
          <p className="mt-3 text-center text-xs text-zinc-600">
            Vos donnees ne sont ni stockees ni partagees
          </p>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-16 grid w-full max-w-lg grid-cols-3 gap-6"
        >
          <StatItem value={437} label="plateformes surveillees" delay={1500} />
          <StatItem
            value={12847}
            label="scans effectues"
            delay={1800}
          />
          <StatItem value={30} label="secondes par scan" suffix="s" delay={2100} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-zinc-600"
          >
            <span className="text-xs uppercase tracking-widest">Decouvrir</span>
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
