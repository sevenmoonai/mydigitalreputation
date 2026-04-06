"use client"

import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring } from "motion/react"

export type MouseEffectCardProps = {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export function MouseEffectCard({
  children,
  className,
  glowColor = "0, 255, 200",
}: MouseEffectCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const spotlightX = useSpring(mouseX, { stiffness: 500, damping: 50 })
  const spotlightY = useSpring(mouseY, { stiffness: 500, damping: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5 group",
        className
      )}
    >
      <motion.div
        className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${spotlightX}px ${spotlightY}px, rgba(${glowColor}, 0.12), transparent 40%)`,
        }}
      />
      <motion.div
        className="absolute size-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          left: spotlightX,
          top: spotlightY,
          backgroundColor: `rgba(${glowColor}, 0.15)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
