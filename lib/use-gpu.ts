"use client"

import { useEffect, useState } from "react"

const SOFTWARE = /swiftshader|llvmpipe|softpipe|software|mesa offscreen|basic render/i

export type Gpu = "hardware" | "software" | "none"

function detect(): Gpu {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "none"

  const canvas = document.createElement("canvas")
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl")
  if (!gl) return "none"

  const info = gl.getExtension("WEBGL_debug_renderer_info")
  const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : ""
  gl.getExtension("WEBGL_lose_context")?.loseContext()

  return SOFTWARE.test(renderer) ? "software" : "hardware"
}

export function useGpu() {
  const [gpu, setGpu] = useState<Gpu | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => setGpu(detect()))

    return () => cancelAnimationFrame(id)
  }, [])

  return gpu
}
