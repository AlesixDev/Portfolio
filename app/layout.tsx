import type { Metadata } from "next"
import { Figtree, Geist_Mono } from "next/font/google"
import { Shell } from "@/components/shell/shell"
import "./globals.css"

const sans = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
})

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Alex Za",
  description:
    "I build interfaces and run the servers behind them. Frontend developer and sysadmin based in Spain.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} h-full antialiased`}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
