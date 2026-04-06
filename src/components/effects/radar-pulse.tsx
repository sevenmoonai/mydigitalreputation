"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export function RadarPulse({
  className,
  color = "rgba(0, 255, 200, 0.4)",
}: {
  className?: string
  color?: string
}) {
  return (
    <div className={cn("relative size-64", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: color }}
          initial={{ scale: 0.3, opacity: 0.8 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut",
          }}
        />
      ))}
      <motion.div
        className="absolute inset-0 origin-center"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${color} 40deg, transparent 80deg)`,
          borderRadius: "50%",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}
