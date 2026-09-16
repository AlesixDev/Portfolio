"use client"

import { useRef } from "react"
import { motion, useTransform, type MotionValue } from "motion/react"
import { repos, type Repo } from "@/lib/data"
import { ToolIcon } from "@/components/ui/tool-icon"
import { Magnet } from "@/components/effects/magnet"
import { useSectionProgress } from "@/lib/use-section-progress"

const PEEK = 14
const SHRINK = 0.04
const ease = (t: number) => 1 - Math.pow(1 - t, 3)

export function Repos() {
  const ref = useRef<HTMLElement>(null)
  const n = repos.length
  const progress = useSectionProgress(ref, (top, height, vh) => [top, top + height - vh])

  return (
    <section
      id="repos"
      ref={ref}
      className="relative"
      style={{ height: `calc(var(--card-h, 100svh) * ${n})` }}
    >
      <div className="sticky top-0 h-[var(--card-h,100svh)] overflow-hidden">
        <div className="relative mx-auto h-full w-full max-w-6xl px-6 sm:px-14 lg:px-20">
          <div className="absolute top-8 left-6 sm:top-12 sm:left-14 lg:left-20">
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-fg sm:text-4xl lg:text-5xl">
              Tools and code.
            </h2>
          </div>

          <div className="relative h-full [--stack-h:25rem] sm:[--stack-h:26rem]">
            {repos.map((repo, i) => (
              <Card key={repo.name} repo={repo} index={i} total={n} progress={progress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Card({
  repo,
  index,
  total,
  progress,
}: {
  repo: Repo
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const segments = Math.max(1, total - 1)
  const enter = useTransform(progress, (p) =>
    index === 0 ? 1 : ease(Math.min(1, Math.max(0, p * segments - (index - 1)))),
  )
  const depth = useTransform(progress, (p) =>
    Math.min(total - 1 - index, Math.max(0, p * segments - index)),
  )

  const y = useTransform([enter, depth], ([e, d]: number[]) =>
    e < 1 ? `calc((1 - ${e}) * 110vh)` : `${-d * PEEK}px`,
  )
  const scale = useTransform(depth, (d) => 1 - d * SHRINK)

  return (
    <motion.article
      style={{
        top: "max(5.5rem, calc((100% - var(--stack-h)) / 2))",
        y,
        scale,
        zIndex: index + 1,
        transformOrigin: "top center",
        height: "var(--stack-h)",
      }}
      className="absolute inset-x-0 flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-panel p-6 shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.8)] sm:p-10"
    >
      <ToolIcon
        icon={repo.lang.icon}
        size={300}
        className="pointer-events-none absolute -right-16 -bottom-20 opacity-[0.05] grayscale sm:-right-10"
      />

      <div className="relative flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-2 text-fg">
          <ToolIcon icon={repo.lang.icon} size={15} />
          {repo.lang.name}
        </span>
        <span className="text-faint">{repo.year}</span>
      </div>

      <div className="relative">
        <h3 className="text-3xl font-semibold tracking-[-0.04em] text-fg sm:text-5xl lg:text-6xl">
          {repo.name}
        </h3>
        <p className="mt-3 max-w-lg text-[0.95rem] leading-[1.55] text-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] overflow-hidden sm:mt-4 sm:text-lg sm:[-webkit-line-clamp:5]">
          {repo.description}
        </p>
      </div>

      <div className="relative flex items-center justify-between gap-6">
        <Magnet strength={0.25} className="w-fit">
          <a
            href={repo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-card transition-transform duration-300 hover:scale-[1.03] sm:px-6 sm:py-3"
          >
            View on GitHub
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        </Magnet>
        {repo.stars > 0 && <span className="text-sm text-muted">★ {repo.stars}</span>}
      </div>
    </motion.article>
  )
}
