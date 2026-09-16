"use client"

import { useSyncExternalStore } from "react"

const QUERY = "(max-width: 639px)"

const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener("change", cb)

  return () => mq.removeEventListener("change", cb)
}

export function useMobile() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}
