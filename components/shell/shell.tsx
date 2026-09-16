"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useMotionValue } from "motion/react"
import { FooterBar } from "@/components/shell/footer-bar"
import { ScrollProvider } from "@/lib/scroll-context"
import { Cursor } from "@/components/effects/cursor"

const ZONE = 90
const FOOTER = 64

export function Shell({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [footerOpen, setFooterOpen] = useState(false)
  const [touch, setTouch] = useState(false)
  const read = useMotionValue(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const card = el.parentElement as HTMLElement
    const sync = () => {
      const margin = parseFloat(getComputedStyle(card).marginBottom) || 0
      el.style.setProperty("--card-h", `${Math.round(el.clientHeight + margin)}px`)
    }

    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(el)

    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const coarse = window.matchMedia("(hover: none)")
    const sync = () => setTouch(coarse.matches)

    sync()
    coarse.addEventListener("change", sync)

    return () => coarse.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const update = () => read.set(el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight))

    update()
    el.addEventListener("scroll", update, { passive: true })

    return () => el.removeEventListener("scroll", update)
  }, [read])

  useEffect(() => {
    if (touch) return

    const onMove = (e: MouseEvent) => setFooterOpen(e.clientY > window.innerHeight - ZONE)
    const onLeave = () => setFooterOpen(false)

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
    }
  }, [touch])

  const open = !touch && footerOpen

  return (
    <ScrollProvider value={scrollRef}>
      <div className="fixed inset-0 flex flex-col p-2.5 sm:p-4">
        <motion.div
          animate={{ marginBottom: open ? FOOTER : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-card"
        >
          <div
            ref={scrollRef}
            className="scroll-area relative h-full overflow-x-hidden overflow-y-auto"
          >
            {children}
          </div>
          <motion.div
            aria-hidden
            style={{ scaleX: read }}
            className="pointer-events-none absolute inset-x-0 top-0 z-30 h-0.5 origin-left bg-fg/50"
          />
        </motion.div>

        {!touch && <FooterBar open={open} height={FOOTER} />}
      </div>
      <Cursor />
    </ScrollProvider>
  )
}
