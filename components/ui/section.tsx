import type { ReactNode } from "react"
import { AnimatedContent } from "@/components/effects/animated-content"

export function Wide({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-14 lg:px-20 ${className}`}>{children}</div>
  )
}

export function SectionHead({
  title,
  sub,
  aside,
}: {
  title: string
  sub?: string
  aside?: ReactNode
}) {
  return (
    <AnimatedContent>
      <div className="mb-14 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div>
          <h2 className="text-4xl font-semibold tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          {sub && <p className="mt-4 max-w-lg text-lg leading-[1.6] text-muted">{sub}</p>}
        </div>
        {aside && <div className="max-w-xs text-sm leading-[1.6] text-muted">{aside}</div>}
      </div>
    </AnimatedContent>
  )
}

export function Section({
  id,
  title,
  sub,
  aside,
  children,
  className = "",
  bleed = false,
}: {
  id?: string
  title?: string
  sub?: string
  aside?: ReactNode
  children: ReactNode
  className?: string
  bleed?: boolean
}) {
  return (
    <section id={id} className={`relative py-24 lg:py-32 ${className}`}>
      <Wide>{title && <SectionHead title={title} sub={sub} aside={aside} />}</Wide>
      {bleed ? (
        <div className="mx-auto w-full max-w-[82rem] px-5 sm:px-14 lg:px-20">{children}</div>
      ) : (
        <Wide>{children}</Wide>
      )}
    </section>
  )
}
