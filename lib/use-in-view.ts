"use client"

import { useEffect, useState, type RefObject } from "react"

export function useInView(ref: RefObject<HTMLElement | null>, amount = 0.3) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { root: el.closest(".scroll-area"), threshold: amount },
    )
    io.observe(el)

    return () => io.disconnect()
  }, [ref, amount])

  return inView
}
