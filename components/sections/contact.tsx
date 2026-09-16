"use client"

import { useRef, useState } from "react"
import { motion } from "motion/react"
import { useInView } from "@/lib/use-in-view"
import { EMAIL, socialLinks } from "@/lib/data"
import { AnimatedContent } from "@/components/effects/animated-content"
import { Magnet } from "@/components/effects/magnet"
import LightRays from "@/components/reactbits/LightRays"

const ease = [0.16, 1, 0.3, 1] as const

export function Contact() {
  const [copied, setCopied] = useState(false)
  const title = useRef<HTMLHeadingElement>(null)
  const shown = useInView(title, 0.5)

  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL)

    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contact" className="relative py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[82rem] px-5 sm:px-14 lg:px-20">
        <AnimatedContent>
          <div className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-border bg-panel px-6 py-16 text-center sm:px-14 sm:py-24">
            <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
              <LightRays
                raysOrigin="top-right"
                raysColor="#ffffff"
                raysSpeed={0.9}
                lightSpread={0.9}
                rayLength={2.2}
                followMouse
                mouseInfluence={0.12}
                fadeDistance={1.1}
                saturation={0}
                noiseAmount={0.05}
                distortion={0.04}
              />
            </div>
            <h2
              ref={title}
              className="relative z-10 max-w-3xl text-4xl leading-[1.05] font-bold tracking-[-0.04em] text-fg sm:text-7xl"
            >
              {["Let\u2019s", "build", "something."].map((word, i) => (
                <span
                  key={word}
                  className="inline-block overflow-hidden py-[0.08em] align-baseline"
                >
                  <motion.span
                    initial={false}
                    animate={shown ? { y: 0, rotate: 0 } : { y: "115%", rotate: 4 }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
                    className="inline-block origin-bottom-left"
                  >
                    {word}
                  </motion.span>
                  {i < 2 && "\u00a0"}
                </span>
              ))}
            </h2>
            <motion.p
              initial={false}
              animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="relative z-10 mt-8 max-w-md text-lg leading-[1.7] text-muted"
            >
              A site, a server nobody wants to own, or a question about something I made. I usually
              reply within a day.
            </motion.p>

            <motion.div
              initial={false}
              animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.8, delay: 0.65, ease }}
              className="relative z-10 mt-12 flex flex-wrap items-center justify-center gap-3"
            >
              <Magnet strength={0.2}>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-3 rounded-full bg-fg px-7 py-4 text-base font-semibold text-card transition-transform duration-300 hover:scale-[1.03]"
                >
                  {EMAIL}
                </a>
              </Magnet>
              <Magnet strength={0.2}>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex items-center rounded-full border border-border-strong px-6 py-4 text-sm font-medium text-fg transition-colors duration-300 hover:border-fg"
                >
                  <motion.span
                    key={String(copied)}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {copied ? "Copied ✓" : "Copy email"}
                  </motion.span>
                </button>
              </Magnet>
            </motion.div>

            <div className="relative z-10 mt-14 flex flex-wrap justify-center gap-x-7 gap-y-2">
              {socialLinks
                .filter((l) => !l.href.startsWith("mailto:"))
                .map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-fg"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                      <path d={link.icon} fillRule="evenodd" />
                    </svg>
                    {link.name}
                  </a>
                ))}
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}
