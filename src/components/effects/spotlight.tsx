"use client"

import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring } from "motion/react"
import { useRef, useState } from "react"

export type SpotlightProps = {
  children: React.ReactNode
  className?: string
  spotlightSize?: number
  spotlightColor?: string
}

export function Spotlight({
  children,
  className,
  spotlightSize = 400,
  spotlightColor = "rgba(255, 255, 255, 0.08)",
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 500, damping: 100 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 100 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative overflow-hidden", className)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${spotlightSize}px circle at ${springX}px ${springY}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
