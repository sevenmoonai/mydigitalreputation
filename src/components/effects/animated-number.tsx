"use client"

import { cn } from "@/lib/utils"
import { motion, useSpring, useTransform } from "motion/react"
import { useEffect } from "react"

export type AnimatedNumberProps = {
  value: number
  className?: string
  springOptions?: {
    bounce?: number
    duration?: number
  }
  formatOptions?: Intl.NumberFormatOptions
}

export function AnimatedNumber({
  value,
  className,
  springOptions = { bounce: 0, duration: 2000 },
  formatOptions,
}: AnimatedNumberProps) {
  const spring = useSpring(0, springOptions)
  const display = useTransform(spring, (current) =>
    formatOptions
      ? Intl.NumberFormat("fr-FR", formatOptions).format(current)
      : Math.round(current).toLocaleString("fr-FR")
  )

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return (
    <motion.span className={cn("tabular-nums", className)}>
      {display}
    </motion.span>
  )
}
