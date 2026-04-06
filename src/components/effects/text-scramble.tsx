"use client"

import { cn } from "@/lib/utils"
import { useMotionValue, animate } from "motion/react"
import { useEffect, useState } from "react"

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"

export type TextScrambleProps = {
  children: string
  className?: string
  duration?: number
  characterSet?: string
  trigger?: boolean
}

export function TextScramble({
  children,
  className,
  duration = 1.5,
  characterSet = CHARACTERS,
  trigger = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children)
  const progress = useMotionValue(0)

  useEffect(() => {
    if (!trigger) {
      setDisplayText(children)
      return
    }

    progress.set(0)

    const controls = animate(progress, 1, {
      duration,
      ease: "easeInOut",
      onUpdate: (latest) => {
        const chars = children.split("")
        const scrambledChars = chars.map((char, i) => {
          if (char === " ") return " "
          const threshold = i / chars.length
          if (latest > threshold) {
            return char
          }
          return characterSet[Math.floor(Math.random() * characterSet.length)]
        })
        setDisplayText(scrambledChars.join(""))
      },
      onComplete: () => {
        setDisplayText(children)
      },
    })

    return () => controls.stop()
  }, [children, duration, characterSet, trigger, progress])

  return (
    <span className={cn("font-mono", className)}>
      {displayText}
    </span>
  )
}
