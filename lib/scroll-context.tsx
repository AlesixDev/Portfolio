"use client"

import { createContext, useContext, type RefObject } from "react"

const ScrollContext = createContext<RefObject<HTMLDivElement | null> | null>(null)

export const ScrollProvider = ScrollContext.Provider

export function useScrollContainer() {
  return useContext(ScrollContext)
}
