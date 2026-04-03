"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Hero() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/scan?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Reprenez le controle de votre reputation en ligne
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Scannez votre presence en ligne en 30 secondes — gratuit, sans
            inscription.
          </p>
          <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-md">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Votre nom ou pseudo..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-11"
              />
              <Button type="submit" size="lg" className="shrink-0 gap-2">
                <Search className="size-4" />
                Scanner maintenant
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
