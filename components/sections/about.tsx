"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useSheet } from "@/lib/use-sheet"
import { AnimatePresence, motion, useTransform, type MotionValue } from "motion/react"
import { about, terms } from "@/lib/data"
import { useSectionProgress } from "@/lib/use-section-progress"
import { ToolIcon } from "@/components/ui/tool-icon"

type Token = {
  text: string
  term?: string
  tail?: string
  start: number
  end: number
  para: number
}

const TERM_WEIGHT = 10
const PIN = 1 / 3
const READ_START = 0.38
const READ_END = 0.92

const read = (start: number, end: number, to: string) =>
  `color-mix(in srgb, ${to} calc(clamp(0, (var(--p) - ${start.toFixed(4)}) / ${(end - start).toFixed(4)}, 1) * 100%), #3a3a3a)`

function tokenize(src: string): Token[] {
  const raw: Omit<Token, "start" | "end">[] = []
  const re = /\[\[(\w+):([^\]]+)\]\](\S*)|(\S+)/g

  src.split(/\n\s*\n/).forEach((para, p) => {
    let m: RegExpExecArray | null
    while ((m = re.exec(para))) {
      if (m[1]) raw.push({ text: m[2], term: m[1], tail: m[3], para: p })
      else raw.push({ text: m[4], para: p })
    }
  })

  const total = raw.reduce((n, t) => n + (t.term ? TERM_WEIGHT : 1), 0)
  let acc = 0

  return raw.map((t) => {
    const w = t.term ? TERM_WEIGHT : 1
    const start = READ_START + (acc / total) * (READ_END - READ_START)
    acc += w
    const end = READ_START + (acc / total) * (READ_END - READ_START)

    return { ...t, start, end }
  })
}

export function About() {
  const ref = useRef<HTMLElement>(null)
  const tokens = useMemo(() => tokenize(about), [])
  const paragraphs = useMemo(() => {
    const out: Token[][] = []
    for (const t of tokens) (out[t.para] ??= []).push(t)

    return out
  }, [tokens])

  const progress = useSectionProgress(ref, (top, height, vh) => [top - vh, top + height - vh])
  const scale = useTransform(progress, [0, PIN], [0.86, 1])
  const opacity = useTransform(progress, [0, PIN * 0.6], [0, 1])

  return (
    <section id="about" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-[var(--card-h,100svh)] items-center justify-center overflow-hidden px-5 sm:px-14">
        <motion.div
          style={{ scale, opacity, ["--p" as string]: progress }}
          className="mx-auto w-full max-w-6xl space-y-7 text-justify text-[1.2rem] leading-[1.5] font-medium tracking-[-0.02em] [hyphens:auto] [text-align-last:left] sm:text-[1.7rem] lg:text-[2.05rem]"
        >
          {paragraphs.map((para, p) => (
            <p key={p}>
              {para.map((token, i) => (
                <span key={i}>
                  {i > 0 && " "}
                  {token.term ? <Term token={token} progress={progress} /> : <Word token={token} />}
                </span>
              ))}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Word({ token }: { token: Token }) {
  return <span style={{ color: read(token.start, token.end, "#f4f4f4") }}>{token.text}</span>
}

function Term({ token, progress }: { token: Token; progress: MotionValue<number> }) {
  const note = terms[token.term!]
  const [hover, setHover] = useState(false)
  const [inSlice, setInSlice] = useState(false)

  const lit = token.start + (token.end - token.start) * 0.15
  const color = read(token.start, lit, "#f4f4f4")
  const underline = read(token.start, lit, "#9a9a9a")

  useEffect(
    () => progress.on("change", (p) => setInSlice(p >= lit && p < token.end)),
    [progress, lit, token.end],
  )

  const open = hover || inSlice
  const anchor = useRef<HTMLSpanElement>(null)
  const sheet = useSheet(anchor, open)

  return (
    <span
      ref={anchor}
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span
        style={{ color, textDecorationColor: underline }}
        className="cursor-help underline decoration-[1.5px] underline-offset-[7px]"
      >
        {token.text}
      </span>
      <span style={{ color }}>{token.tail}</span>

      <AnimatePresence>
        {open && note && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={sheet}
            className="absolute top-full left-1/2 z-30 mt-4 block w-80 -translate-x-1/2 rounded-2xl border border-border-strong bg-panel p-5 text-left text-base font-normal tracking-normal [text-align-last:auto] shadow-[0_30px_50px_-20px_rgba(0,0,0,0.9)]"
          >
            <span
              aria-hidden
              className="absolute -top-1.5 left-1/2 hidden h-3 w-3 -translate-x-1/2 rotate-45 border-t border-l border-border-strong bg-panel sm:block"
            />
            <span className="block text-base font-semibold text-fg">{note.title}</span>
            <span className="mt-1.5 block text-[0.92rem] leading-[1.6] text-muted">
              {note.body}
            </span>
            {note.tags.length > 0 && (
              <span className="mt-4 flex flex-wrap gap-1.5">
                {note.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className="inline-flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-xs text-fg"
                  >
                    {tag.icon && <ToolIcon icon={tag.icon} size={12} />}
                    {tag.name}
                  </span>
                ))}
              </span>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
