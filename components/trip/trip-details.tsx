"use client"

import useSWR from "swr"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Calendar } from "lucide-react"
import type { Trip } from "@/lib/types"
import { API_ENDPOINTS } from "@/lib/api"
import { format } from "date-fns"

interface TripDetailsProps {
  tripId: string
}

export function TripDetails({ tripId }: TripDetailsProps) {
  const { data: trip, isLoading } = useSWR<Trip>(API_ENDPOINTS.tripDetails(tripId))

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-2xl bg-white p-6">
        <div className="mb-4 h-8 w-2/3 rounded bg-muted" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-3/4 rounded bg-muted" />
        </div>
      </div>
    )
  }

  if (!trip) return null

  const departureTime = new Date(trip.departureTime)
  const arrivalTime = new Date(trip.arrivalTime)

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-secondary">
            {trip.route.origin} → {trip.route.destination}
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {trip.bus.type}
            </Badge>
            <Badge variant="outline">{trip.bus.plateNo}</Badge>
            <Badge variant="outline" className="capitalize">
              {trip.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center space-x-3 rounded-lg bg-muted/50 p-4">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="font-semibold text-secondary">{format(departureTime, "MMM dd, yyyy")}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 rounded-lg bg-muted/50 p-4">
          <Clock className="h-8 w-8 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Departure</p>
            <p className="font-semibold text-secondary">{format(departureTime, "h:mm a")}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 rounded-lg bg-muted/50 p-4">
          <Clock className="h-8 w-8 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Arrival</p>
            <p className="font-semibold text-secondary">{format(arrivalTime, "h:mm a")}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 rounded-lg bg-muted/50 p-4">
          <MapPin className="h-8 w-8 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Distance</p>
            <p className="font-semibold text-secondary">{trip.route.distanceKm} km</p>
          </div>
        </div>
      </div>

      {trip.route.stops && trip.route.stops.length > 0 && (
        <div className="mt-6 border-t border-border pt-6">
          <h3 className="mb-3 font-semibold text-secondary">Route Stops</h3>
          <div className="flex flex-wrap gap-2">
            {trip.route.stops.map((stop) => (
              <div key={stop.id} className="flex items-center space-x-2 rounded-full bg-muted px-3 py-1 text-sm">
                <MapPin className="h-3 w-3 text-primary" />
                <span>{stop.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
