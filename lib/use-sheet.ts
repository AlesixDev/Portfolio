"use client"

import { useLayoutEffect, useState, type CSSProperties, type RefObject } from "react"

const GUTTER = 16

export function useSheet(ref: RefObject<HTMLElement | null>, open: boolean) {
  const [style, setStyle] = useState<CSSProperties | undefined>()

  useLayoutEffect(() => {
    if (!open) return

    const el = ref.current
    if (!el || window.innerWidth >= 640) return setStyle(undefined)

    const rect = el.getBoundingClientRect()
    setStyle({ left: GUTTER - rect.left, width: window.innerWidth - GUTTER * 2, translate: "none" })
  }, [ref, open])

  return style
}
