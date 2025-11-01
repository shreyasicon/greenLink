import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { GridBackground } from "@/components/grid-background"
import { Footer } from "@/components/footer"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "🌱 GreenLink-Lite",
  description: "Agentic Network Optimizer - Real-time telecom node performance",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <GridBackground />
        <Navbar />
        <div className="min-h-[calc(100vh-8rem)]">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
