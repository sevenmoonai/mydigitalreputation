"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Shield, ScanSearch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"

const navLinks = [
  { href: "/scan", label: "Scan" },
  { href: "/pricing", label: "Tarifs" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          "bg-black/60 backdrop-blur-xl backdrop-saturate-150",
          "border-b",
          scrolled
            ? "border-white/10 shadow-lg shadow-black/20"
            : "border-white/[0.04]"
        )}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Shield className="size-5 text-[var(--accent-glow)] transition-all group-hover:drop-shadow-[0_0_8px_var(--accent-glow)]" />
            <span className="text-sm font-semibold tracking-tight text-foreground">
              My
              <span className="text-[var(--accent-glow)] transition-all group-hover:drop-shadow-[0_0_6px_var(--accent-glow)]">
                Digital
              </span>
              Reputation
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
              >
                {link.label}
                <span className="absolute inset-x-3 -bottom-px h-px bg-[var(--accent-glow)] scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button
              variant="ghost"
              size="sm"
              render={<Link href="/sign-in" />}
              className="text-muted-foreground hover:text-foreground"
            >
              Se connecter
            </Button>
            <ScannerCTA />
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center size-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="flex flex-col items-center gap-4 mt-4"
              >
                <Button
                  variant="ghost"
                  size="lg"
                  render={<Link href="/sign-in" onClick={() => setMobileOpen(false)} />}
                  className="text-muted-foreground"
                >
                  Se connecter
                </Button>
                <Link href="/scan" onClick={() => setMobileOpen(false)}>
                  <span className="inline-flex items-center gap-2 rounded-lg border border-[var(--accent-glow)]/30 bg-[var(--accent-glow)]/10 px-5 py-2.5 text-sm font-medium text-[var(--accent-glow)] shadow-[0_0_15px_var(--accent-glow)/0.15] transition-all hover:bg-[var(--accent-glow)]/20 hover:shadow-[0_0_25px_var(--accent-glow)/0.25]">
                    <ScanSearch className="size-4" />
                    Scanner
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ScannerCTA() {
  return (
    <Link href="/scan">
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--accent-glow)]/30 bg-[var(--accent-glow)]/10 px-3 py-1.5 text-sm font-medium text-[var(--accent-glow)] shadow-[0_0_15px_var(--accent-glow)/0.1] transition-all hover:bg-[var(--accent-glow)]/20 hover:shadow-[0_0_25px_var(--accent-glow)/0.2] hover:border-[var(--accent-glow)]/50">
        <ScanSearch className="size-3.5" />
        Scanner
      </span>
    </Link>
  )
}
