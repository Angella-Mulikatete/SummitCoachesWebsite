"use client"

import { useSearchParams } from "next/navigation"
import useSWR from "swr"
import { TripCard } from "./trip-card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Bus } from "lucide-react"
import type { Trip } from "@/lib/types"
import { API_ENDPOINTS } from "@/lib/api"

export function TripList() {
  const searchParams = useSearchParams()
  const origin = searchParams.get("origin")
  const destination = searchParams.get("destination")
  const date = searchParams.get("date")
  const passengers = searchParams.get("passengers") || "1"

  // Build query string for API
  const queryString = new URLSearchParams({
    origin: origin || "",
    destination: destination || "",
    date: date || "",
    passengers,
  }).toString()

  const { data, error, isLoading } = useSWR<{ trips: Trip[] }>(
    origin && destination && date ? `${API_ENDPOINTS.trips}?${queryString}` : null,
  )

  if (!origin || !destination || !date) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-white p-8 text-center">
        <div>
          <Bus className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <h3 className="mb-2 text-xl font-semibold text-secondary">Start Your Search</h3>
          <p className="text-secondary-light">Enter your travel details to find available trips</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-white p-6">
            <div className="mb-4 h-6 w-1/3 rounded bg-muted" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load trips. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  if (!data?.trips || data.trips.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center">
        <Bus className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
        <h3 className="mb-2 text-xl font-semibold text-secondary">No Trips Found</h3>
        <p className="text-secondary-light">
          No trips available for {origin} to {destination} on {date}. Try different dates or routes.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-secondary-light">
          {data.trips.length} trip{data.trips.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {data.trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} passengers={Number.parseInt(passengers)} />
      ))}
    </div>
  )
}
