"use client"

import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring } from "motion/react"
import { useRef } from "react"

export type TiltProps = {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  perspective?: number
  scale?: number
  speed?: number
}

export function Tilt({
  children,
  className,
  maxTilt = 15,
  perspective = 1000,
  scale = 1.05,
  speed = 400,
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scaleValue = useMotionValue(1)

  const springConfig = { stiffness: speed, damping: 30 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)
  const springScale = useSpring(scaleValue, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const tiltX = (mouseY / (rect.height / 2)) * -maxTilt
    const tiltY = (mouseX / (rect.width / 2)) * maxTilt

    rotateX.set(tiltX)
    rotateY.set(tiltY)
    scaleValue.set(scale)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    scaleValue.set(1)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
        perspective,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  )
}
