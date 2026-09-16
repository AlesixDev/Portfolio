"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useTransform } from "motion/react"
import { projects, type Project } from "@/lib/data"
import { SiteShot } from "@/components/ui/site-shot"
import { useSectionProgress } from "@/lib/use-section-progress"
import { useMobile } from "@/lib/use-mobile"

export function Projects() {
  const ref = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const mobile = useMobile()

  const progress = useSectionProgress(ref, (top, height, vh) => [top, top + height - vh])
  const x = useTransform(progress, [0, 1], [0, -distance])

  useEffect(() => {
    const el = track.current
    if (!el) return

    const measure = () => setDistance(Math.max(0, el.scrollWidth - el.clientWidth))

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)

    return () => ro.disconnect()
  }, [])

  return (
    <section id="projects" ref={ref} className="relative py-20 sm:h-[360vh] sm:py-0">
      <div className="flex flex-col justify-center sm:sticky sm:top-0 sm:h-[var(--card-h,100svh)] sm:overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-14 lg:px-20">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-fg sm:text-4xl lg:text-5xl">
            Sites that are live.
          </h2>
        </div>

        <div
          ref={track}
          className="mt-8 w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] sm:mt-10 sm:overflow-hidden [&::-webkit-scrollbar]:hidden"
        >
          <motion.div
            style={mobile ? undefined : { x }}
            className="flex w-max gap-5 px-5 sm:gap-8 sm:px-14 lg:px-20"
          >
            {projects.map((project) => (
              <Screen key={project.name} project={project} />
            ))}
            <div className="w-[8vw] shrink-0" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Screen({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-[80vw] shrink-0 snap-center sm:w-[min(38rem,52vw)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-panel transition-colors duration-500 group-hover:border-border-strong">
        <SiteShot
          url={project.url}
          alt={`${project.name} screenshot`}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-6">
        <h3 className="flex items-center gap-2 text-xl font-semibold tracking-[-0.025em] text-fg">
          {project.name}
          <span className="translate-x-[-6px] text-base text-muted opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
            ↗
          </span>
        </h3>
        <span className="text-sm text-faint">{project.year}</span>
      </div>
      <p className="mt-1.5 max-w-md text-[0.95rem] leading-[1.6] text-muted">
        {project.description}
      </p>
    </a>
  )
}
