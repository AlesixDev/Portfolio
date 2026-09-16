"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react"

export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [down, setDown] = useState(false)
  const [flip, setFlip] = useState({ up: false, left: false })
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 1400, damping: 80, mass: 0.15 })
  const sy = useSpring(y, { stiffness: 1400, damping: 80, mass: 0.15 })

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    const sync = () => setEnabled(fine.matches)

    sync()
    fine.addEventListener("change", sync)

    return () => fine.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (!enabled) return

    document.documentElement.classList.add("no-cursor")

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)

      const up = e.clientY > window.innerHeight - 56
      const left = e.clientX > window.innerWidth - 140
      setFlip((f) => (f.up === up && f.left === left ? f : { up, left }))

      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [role=button], [data-cursor]",
      )
      if (!el) return setLabel(null)

      const custom = el.dataset.cursor
      if (custom) return setLabel(custom)
      if (el instanceof HTMLAnchorElement && el.target === "_blank") return setLabel("open")

      setLabel("")
    }

    const press = () => setDown(true)
    const release = () => setDown(false)

    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("pointerdown", press)
    window.addEventListener("pointerup", release)

    return () => {
      document.documentElement.classList.remove("no-cursor")
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerdown", press)
      window.removeEventListener("pointerup", release)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const hot = label !== null

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[100] will-change-transform"
    >
      <motion.svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        animate={{ scale: down ? 0.85 : 1, rotate: hot ? -12 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{ transformOrigin: "2px 2px" }}
      >
        <path
          d="M4 3.5 L4 18.2 L8.1 14.6 L10.8 20.4 L13.6 19.1 L11 13.4 L16.4 13.1 Z"
          fill="#ffffff"
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </motion.svg>

      <AnimatePresence>
        {label && (
          <motion.span
            initial={{ opacity: 0, x: flip.left ? 4 : -4, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: flip.left ? 4 : -4, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className={`absolute rounded-full bg-white px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide whitespace-nowrap text-black uppercase shadow ${
              flip.up ? "bottom-2" : "top-5"
            } ${flip.left ? "right-2" : "left-5"}`}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
