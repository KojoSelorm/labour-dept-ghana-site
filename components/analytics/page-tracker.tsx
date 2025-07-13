"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "page_view",
        data: {
          path: pathname,
          referrer: document.referrer,
        },
      }),
    }).catch(console.error)
  }, [pathname])

  return null
}
