"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view with comprehensive error handling
    const trackPageView = async () => {
      try {
        // Only track if we're in the browser
        if (typeof window === "undefined") return

        // Use fetch to call our API route (which handles server-side operations)
        const response = await fetch("/api/analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event: "page_view",
            data: {
              path: pathname,
              referrer: document.referrer || "",
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent,
            },
          }),
        })

        // Don't throw errors for failed analytics - just log for debugging
        if (!response.ok) {
          console.debug("Analytics tracking failed:", response.status)
        } else {
          const result = await response.json()
          console.debug("Analytics tracked:", result.message || "success")
        }
      } catch (error) {
        // Silently fail - analytics should never break the app
        console.debug("Analytics tracking failed:", error)
      }
    }

    // Don't block the main thread with analytics
    const timeoutId = setTimeout(trackPageView, 100)

    // Cleanup
    return () => clearTimeout(timeoutId)
  }, [pathname])

  return null
}
