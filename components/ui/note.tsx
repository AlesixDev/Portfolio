"use client"

import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "motion/react"
import type { CSSProperties, ReactNode } from "react"

const ease = [0.16, 1, 0.3, 1] as const

export function Note({
  open,
  mobile,
  onClose,
  className = "",
  style,
  children,
}: {
  open: boolean
  mobile: boolean
  onClose: () => void
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  if (mobile) {
    return createPortal(
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
              className="fixed inset-0 z-[60] bg-black/60"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease }}
              className="fixed inset-x-0 bottom-0 z-[61] rounded-t-3xl border-t border-border-strong bg-panel p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-left text-base font-normal tracking-normal shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.9)]"
            >
              <span
                aria-hidden
                className="mx-auto mb-5 block h-1 w-10 rounded-full bg-border-strong"
              />
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body,
    )
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.span
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.97 }}
          transition={{ duration: 0.25, ease }}
          style={style}
          className={`absolute z-30 block rounded-2xl border border-border-strong bg-panel shadow-[0_30px_50px_-20px_rgba(0,0,0,0.9)] ${className}`}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
