// Analytics and tracking utilities

export const analytics = {
  // Track page views
  pageView: (url: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", process.env.NEXT_PUBLIC_GA_ID || "", {
        page_path: url,
      })
    }
  },

  // Track events
  event: (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      })
    }
  },

  // Track booking events
  trackBooking: (bookingId: string, amount: number) => {
    analytics.event("booking_completed", "Booking", bookingId, amount)
  },

  // Track search events
  trackSearch: (origin: string, destination: string) => {
    analytics.event("search", "Search", `${origin} to ${destination}`)
  },

  // Track seat selection
  trackSeatSelection: (seatNo: string) => {
    analytics.event("seat_selected", "Booking", seatNo)
  },
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
