"use client"

import { cn } from "@/lib/utils"
import { motion, useInView, type Variants, type Transition } from "motion/react"
import { useRef } from "react"

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export type InViewProps = {
  children: React.ReactNode
  className?: string
  variants?: Variants
  transition?: Transition
  once?: boolean
  amount?: "some" | "all" | number
}

export function InView({
  children,
  className,
  variants = defaultVariants,
  transition = { duration: 0.5, delay: 0 },
  once = true,
  amount = 0.3,
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export type InViewGroupProps = {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

export function InViewGroup({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
}: InViewGroupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.2 })

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export type InViewItemProps = {
  children: React.ReactNode
  className?: string
  variants?: Variants
}

export function InViewItem({
  children,
  className,
  variants = defaultVariants,
}: InViewItemProps) {
  return (
    <motion.div variants={variants} className={cn(className)}>
      {children}
    </motion.div>
  )
}
