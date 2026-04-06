"use client"

import { cn } from "@/lib/utils"

export type GlowEffectCardProps = {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export function GlowEffectCard({
  children,
  className,
  glowColor = "rgba(0, 255, 200, 0.12)",
}: GlowEffectCardProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`)
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-6",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${glowColor}, transparent 40%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
