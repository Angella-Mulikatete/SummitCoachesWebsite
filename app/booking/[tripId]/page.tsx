"use client"

import { use } from "react"
import { BookingForm } from "@/components/booking/booking-form"
import { BookingReview } from "@/components/booking/booking-review"

export default function BookingPage({ params }: { params: Promise<{ tripId: string }> }) {
  const { tripId } = use(params)

  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-bold text-secondary">Complete Your Booking</h1>
            <p className="text-secondary-light">Enter passenger details and confirm your booking</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div>
              <BookingForm tripId={tripId} />
            </div>

            <aside className="h-fit">
              <BookingReview tripId={tripId} />
            </aside>
          </div>
        </div>
      </main>
      
    </div>
  )
}
