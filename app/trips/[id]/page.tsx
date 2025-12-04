"use client"

import { use } from "react"

import { TripDetails } from "@/components/trip/trip-details"
import { SeatSelection } from "@/components/trip/seat-selection"
import { BookingSummary } from "@/components/trip/booking-summary"

export default function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="flex min-h-screen flex-col">
   
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-bold text-secondary">Select Your Seats</h1>
            <p className="text-secondary-light">Choose your preferred seats and complete your booking</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div className="space-y-6">
              <TripDetails tripId={id} />
              <SeatSelection tripId={id} />
            </div>

            <aside className="h-fit">
              <BookingSummary tripId={id} />
            </aside>
          </div>
        </div>
      </main>
   
    </div>
  )
}
