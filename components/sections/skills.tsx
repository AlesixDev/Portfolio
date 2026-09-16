"use client"

import { useState } from "react"
import { Note } from "@/components/ui/note"
import { useMobile } from "@/lib/use-mobile"
import { motion } from "motion/react"
import { toolCategories, type Tool } from "@/lib/data"
import { Section } from "@/components/ui/section"
import { AnimatedContent } from "@/components/effects/animated-content"
import { ToolIcon } from "@/components/ui/tool-icon"
import { Magnet } from "@/components/effects/magnet"

export function Skills() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <Section id="skills" title="What I work with.">
      <div className="space-y-12">
        {toolCategories.map((cat, ci) => (
          <AnimatedContent
            key={cat.label}
            delay={ci * 0.06}
            className={`relative ${open && cat.tools.some((t) => t.name === open) ? "z-40" : "z-0"}`}
          >
            <div className="grid gap-5 sm:grid-cols-[12rem_1fr] sm:gap-10">
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-fg">{cat.label}</h3>
                <p className="mt-0.5 text-sm text-muted">{cat.note}</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {cat.tools.map((tool, i) => (
                  <Chip
                    key={tool.name}
                    tool={tool}
                    delay={0.1 + i * 0.04}
                    open={open === tool.name}
                    onOpen={(o) => setOpen(o ? tool.name : null)}
                  />
                ))}
              </ul>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </Section>
  )
}

function Chip({
  tool,
  delay,
  open,
  onOpen,
}: {
  tool: Tool
  delay: number
  open: boolean
  onOpen: (open: boolean) => void
}) {
  const mobile = useMobile()

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
      onMouseEnter={() => !mobile && onOpen(true)}
      onMouseLeave={() => !mobile && onOpen(false)}
    >
      <Magnet strength={0.18}>
        <button
          type="button"
          onClick={() => onOpen(!open)}
          aria-expanded={open}
          className={`group inline-flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-sm transition-colors duration-300 ${
            open ? "border-fg bg-fg text-card" : "border-border-strong text-fg hover:border-fg"
          }`}
        >
          <ToolIcon
            icon={tool.icon}
            size={16}
            className={`transition-[filter] duration-300 ${open ? "" : "grayscale group-hover:grayscale-0"}`}
          />
          {tool.name}
        </button>
      </Magnet>

      <Note
        open={open}
        mobile={mobile}
        onClose={() => onOpen(false)}
        className="top-full left-0 mt-3 w-72 p-4"
      >
        {!mobile && (
          <span
            aria-hidden
            className="absolute -top-1.5 left-6 h-3 w-3 rotate-45 border-t border-l border-border-strong bg-panel"
          />
        )}
        <div className="flex items-center gap-2.5">
          <ToolIcon icon={tool.icon} size={18} />
          <span className="font-semibold text-fg">{tool.name}</span>
        </div>
        <p className="mt-2 text-[0.92rem] leading-[1.55] text-fg">{tool.blurb}</p>
        <p className="mt-2 text-sm leading-[1.55] text-muted">{tool.use}</p>
      </Note>
    </motion.li>
  )
}
