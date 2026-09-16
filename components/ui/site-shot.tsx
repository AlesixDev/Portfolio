"use client"

import { useState } from "react"

export function siteShotUrl(url: string, width = 1280, height = 800) {
  const params = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    colorScheme: "dark",
    waitUntil: "networkidle2",
    "viewport.width": String(width),
    "viewport.height": String(height),
    "viewport.deviceScaleFactor": "1",
  })

  return `https://api.microlink.io/?${params.toString()}`
}

export function SiteShot({
  url,
  alt,
  className = "",
}: {
  url: string
  alt: string
  className?: string
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-panel ${className}`}>
      {(!loaded || failed) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[0.62rem] tracking-[0.25em] text-faint uppercase">
            {failed ? new URL(url).hostname : "loading"}
          </span>
        </div>
      )}
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={siteShotUrl(url)}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover object-top transition-opacity duration-[900ms] ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  )
}
