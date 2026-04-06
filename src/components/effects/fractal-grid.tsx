"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

export type FractalGridProps = {
  className?: string
  color?: string
  cellSize?: number
}

export function FractalGrid({
  className,
  color = "rgba(0, 255, 200, 0.3)",
  cellSize = 24,
}: FractalGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationId: number
    let time = 0

    const draw = () => {
      if (!ctx || !canvas) return

      const w = canvas.width / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio

      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = color
      ctx.lineWidth = 0.5

      const cols = Math.ceil(w / cellSize)
      const rows = Math.ceil(h / cellSize)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellSize
          const y = j * cellSize
          const noise =
            Math.sin(i * 0.15 + time) * Math.cos(j * 0.15 + time * 0.7)

          ctx.globalAlpha = Math.max(0.05, 0.15 + noise * 0.12)
          ctx.strokeRect(x, y, cellSize, cellSize)
        }
      }

      if (!prefersReducedMotion) {
        time += 0.015
        animationId = requestAnimationFrame(draw)
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [color, cellSize])

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
    />
  )
}
