import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTracker } from "@/components/analytics/page-tracker"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Labour Department of Ghana - Official Website",
  description:
    "Creating and maintaining a favourable employment environment through comprehensive labour administration services in Ghana.",
  keywords: "Ghana Labour Department, employment, labour laws, job portal, worker rights, employer services",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PageTracker />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
