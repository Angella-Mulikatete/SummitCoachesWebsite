"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { TripCard } from "./trip-card"
import { useTrips } from "@/lib/hooks"

export function TripGrid() {
  // Use the hook to fetch trips
  const { trips, isLoading, isError } = useTrips({ featured: true, limit: 3 })

  if (isError) {
    return (
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">Failed to load trips. Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Trips</h2>
            <p className="text-slate-500 mt-2">Explore our most popular destinations</p>
          </div>
          <Link
            href="/trips"
            className="hidden md:flex items-center text-primary font-medium hover:text-primary-hover transition-colors"
          >
            View all trips <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-96 bg-slate-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : trips.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">No trips available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}