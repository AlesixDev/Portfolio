"use client"

import { motion } from "motion/react"
import SplitText from "@/components/reactbits/SplitText"
import BlurText from "@/components/reactbits/BlurText"
import GradientWaves from "@/components/reactbits/GradientWaves"
import { Magnet } from "@/components/effects/magnet"
import { useScrollContainer } from "@/lib/scroll-context"
import { useGpu } from "@/lib/use-gpu"

export function Hero() {
  const container = useScrollContainer()
  const gpu = useGpu()

  const go = (id: string) => {
    const root = container?.current
    const target = root?.querySelector<HTMLElement>(id)

    if (root && target) root.scrollTo({ top: target.offsetTop, behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative flex h-[var(--card-h,100svh)] items-center justify-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]">
        {gpu && gpu !== "none" ? (
          <GradientWaves
            horizonColor="#0a0a0a"
            waveColor="#3a3a3a"
            crestColor="#d0d0d0"
            speed={0.45}
            amplitude={2.4}
            swell={30}
            turbulence={18}
            fogDepth={12}
            detail={gpu === "software" ? "lowest" : "low"}
            resolution={gpu === "software" ? 0.25 : 0.5}
            fps={gpu === "software" ? 20 : 30}
            mouseInteraction={gpu !== "software"}
            parallaxStrength={0.4}
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_50%_70%,#2a2a2a_0%,#0a0a0a_65%)]" />
        )}
      </div>

      <div className="relative flex flex-col items-center px-6 text-center">
        <h1 className="flex flex-col items-center text-5xl leading-[1.02] font-bold tracking-[-0.045em] text-fg sm:text-7xl lg:text-[6.5rem]">
          <span className="flex items-center gap-4">
            <SplitText
              text="Hello!"
              tag="span"
              splitType="chars"
              delay={60}
              duration={1}
              ease="power4.out"
              from={{ opacity: 0, y: 60, rotate: 6 }}
              to={{ opacity: 1, y: 0, rotate: 0 }}
              threshold={0}
              rootMargin="0px"
            />
            <motion.span
              aria-hidden
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5, type: "spring", bounce: 0.5 }}
              className="wave text-[0.8em]"
            >
              👋
            </motion.span>
          </span>
          <SplitText
            text="I'm Alex Za."
            tag="span"
            splitType="words"
            delay={110}
            duration={1}
            ease="power3.out"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0}
            rootMargin="0px"
            className="outline-text"
          />
        </h1>

        <BlurText
          text="I build the interface, then I run the machine it lives on. Fast sites, quiet servers, no drama."
          delay={40}
          animateBy="words"
          direction="bottom"
          className="mt-8 max-w-lg justify-center text-base leading-[1.7] text-muted sm:text-lg"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnet strength={0.2}>
            <button
              type="button"
              onClick={() => go("#projects")}
              className="group inline-flex items-center gap-2.5 rounded-full bg-fg px-6 py-3 text-sm font-semibold text-card transition-transform duration-300 hover:scale-[1.03]"
            >
              See my work
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </Magnet>
          <Magnet strength={0.2}>
            <button
              type="button"
              onClick={() => go("#contact")}
              className="inline-flex items-center rounded-full border border-border-strong bg-card/80 px-6 py-3 text-sm font-medium text-fg transition-colors duration-300 hover:border-fg"
            >
              Get in touch
            </button>
          </Magnet>
        </motion.div>
      </div>
    </section>
  )
}
