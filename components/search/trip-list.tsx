"use client"

import { useSearchParams } from "next/navigation"
import { TripCard } from "@/app/trips/(_components)/trip-card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Bus } from "lucide-react"
import { useTripSearch } from "@/lib/hooks"

export function TripList() {
  const searchParams = useSearchParams()
  const origin = searchParams.get("origin")
  const destination = searchParams.get("destination")
  const date = searchParams.get("date")

  // Use custom hook for searching
  const { trips, isLoading, isError } = useTripSearch(
    origin || undefined,
    destination || undefined,
    date || undefined
  )

  if (!origin && !destination && !date) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-white p-8 text-center border border-slate-100 shadow-sm">
        <div className="max-w-md">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
            <Bus className="h-8 w-8" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-slate-900">Start Your Search</h3>
          <p className="text-slate-500">Enter your origin, destination, and travel date above to find available trips.</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-white p-6 border border-slate-100 h-64">
            <div className="h-48 bg-slate-100 rounded-xl mb-4" />
            <div className="space-y-3">
              <div className="h-6 bg-slate-100 rounded w-2/3" />
              <div className="h-4 bg-slate-100 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Unable to load trips at this time. Please try again later or contact support.
        </AlertDescription>
      </Alert>
    )
  }

  if (!trips || trips.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center border border-slate-100 shadow-sm">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Bus className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-slate-900">No Trips Found</h3>
        <p className="text-slate-500 max-w-sm mx-auto">
          We couldn't find any trips for {origin} to {destination} on {date}. <br />
          Try changing your dates or search criteria.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <p className="text-sm font-medium text-slate-600">
          Found <span className="text-primary font-bold">{trips.length}</span> trip{trips.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {trips.map((trip) => (
          // Use the shared TripCard component
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  )
}
