"use client"

import { useEffect, type RefObject } from "react"
import { useMotionValue } from "motion/react"
import { useScrollContainer } from "@/lib/scroll-context"

export function useSectionProgress(
  ref: RefObject<HTMLElement | null>,
  range: (top: number, height: number, viewport: number) => [from: number, to: number],
) {
  const container = useScrollContainer()
  const progress = useMotionValue(0)

  useEffect(() => {
    const root = container?.current
    const el = ref.current
    if (!root || !el) return

    let from = 0
    let to = 1

    const measure = () => {
      ;[from, to] = range(el.offsetTop, el.offsetHeight, root.clientHeight)
      update()
    }

    const update = () => {
      const p = (root.scrollTop - from) / (to - from || 1)
      progress.set(Math.min(1, Math.max(0, p)))
    }

    measure()
    root.addEventListener("scroll", update, { passive: true })

    const ro = new ResizeObserver(measure)
    ro.observe(root)
    ro.observe(el)

    return () => {
      root.removeEventListener("scroll", update)
      ro.disconnect()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container, ref, progress])

  return progress
}
