"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion } from "motion/react"

export function AnimatedContent({
  children,
  distance = 24,
  duration = 0.8,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  distance?: number
  duration?: number
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { root: el.closest(".scroll-area"), rootMargin: "0px 0px -10% 0px" },
    )
    io.observe(el)

    return () => io.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance, filter: "blur(6px)" }}
      animate={shown ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
