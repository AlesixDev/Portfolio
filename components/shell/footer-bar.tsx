"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { socialLinks } from "@/lib/data"

export function FooterBar({ open, height }: { open: boolean; height: number }) {
  return (
    <motion.footer
      aria-hidden={!open}
      initial={false}
      animate={{ opacity: open ? 1 : 0, y: open ? 0 : 10 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ height, pointerEvents: open ? "auto" : "none" }}
      className="absolute inset-x-2.5 bottom-0 z-40 grid grid-cols-[auto_1fr] items-center gap-3 px-1 text-sm sm:inset-x-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-4 sm:px-3"
    >
      <Place />

      <nav className="flex items-center justify-end gap-3.5 text-[0.8rem] sm:justify-start sm:gap-5 sm:text-sm">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="link-frame text-frame-muted transition-colors duration-300 hover:text-frame-fg"
          >
            {link.name}
          </a>
        ))}
      </nav>

      <span className="ml-auto hidden text-frame-muted sm:inline">© 2026 Alex Za</span>
    </motion.footer>
  )
}

function Place() {
  const [hover, setHover] = useState(false)

  return (
    <div
      className="relative w-fit"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        type="button"
        data-cursor="time"
        onClick={() => setHover((h) => !h)}
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 ${
          hover ? "bg-frame-fg text-bg" : "bg-frame-panel text-frame-fg"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        Sevilla
      </button>

      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full left-0 mb-3 w-[min(18rem,calc(100vw-2rem))] rounded-2xl bg-frame-fg p-4 text-bg shadow-[0_20px_40px_-16px_rgba(0,0,0,0.5)]"
          >
            <span
              aria-hidden
              className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 bg-frame-fg"
            />
            <Clock />
            <div className="mt-4 flex items-center justify-between text-xs opacity-60">
              <span>Sevilla, Spain</span>
              <span>UTC+1</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZone: "Europe/Madrid",
})

function madrid(now: Date) {
  const [h, m, sec] = fmt.format(now).split(":").map(Number)

  return { h, m, s: sec, ms: now.getMilliseconds() }
}

function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let id = 0
    const tick = () => {
      setNow(new Date())
      id = requestAnimationFrame(tick)
    }

    id = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(id)
  }, [])

  const { h, m, s, ms } = madrid(now)
  const sec = s + ms / 1000
  const min = m + sec / 60
  const hr = (h % 12) + min / 60

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 100 100" className="h-28 w-28 text-bg" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={i}
            x1="50"
            y1="6"
            x2="50"
            y2={i % 3 === 0 ? 13 : 10}
            stroke="currentColor"
            strokeOpacity={i % 3 === 0 ? 0.9 : 0.4}
            strokeWidth={i % 3 === 0 ? 2 : 1.5}
            strokeLinecap="round"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
        <Hand angle={hr * 30} length={22} width={3.5} />
        <Hand angle={min * 6} length={32} width={2.5} />
        <Hand angle={sec * 6} length={38} width={1.2} tail={8} />
        <circle cx="50" cy="50" r="2.5" fill="currentColor" />
      </svg>

      <div className="mt-4 flex items-baseline gap-1 font-mono tabular-nums">
        <span className="text-[1.6rem] leading-none font-medium tracking-[-0.02em]">
          {pad(h)}
          <span className="opacity-50">:</span>
          {pad(m)}
          <span className="opacity-50">:</span>
          {pad(s)}
        </span>
        <span className="text-sm opacity-50">.{String(ms).padStart(3, "0")}</span>
      </div>
    </div>
  )
}

function Hand({
  angle,
  length,
  width,
  tail = 0,
}: {
  angle: number
  length: number
  width: number
  tail?: number
}) {
  return (
    <line
      x1="50"
      y1={50 + tail}
      x2="50"
      y2={50 - length}
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      transform={`rotate(${angle} 50 50)`}
    />
  )
}
