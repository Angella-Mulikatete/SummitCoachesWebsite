"use client"

import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Calendar, Bus } from "lucide-react"
import { useTrip } from "@/lib/hooks"
import { format } from "date-fns"

interface TripDetailsProps {
  tripId: string
}

export function TripDetails({ tripId }: TripDetailsProps) {
  const { trip, isLoading } = useTrip(tripId)

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

  // Helper to format date safely
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A"
    try {
      const date = new Date(dateStr)
      if (!isNaN(date.getTime())) return format(date, "MMM dd, yyyy")
      return dateStr
    } catch (e) {
      return dateStr
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-secondary">
            {trip.route?.origin || trip.origin} → {trip.route?.destination || trip.destination}
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {trip.bus?.type || trip.bus_type || "Standard"}
            </Badge>
            {trip.bus?.registrationNumber && (
              <Badge variant="outline">{trip.bus.registrationNumber}</Badge>
            )}
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
            <p className="font-semibold text-secondary">{formatDate(trip.departureDate)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 rounded-lg bg-muted/50 p-4">
          <Clock className="h-8 w-8 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Departure</p>
            <p className="font-semibold text-secondary">{trip.departureTime || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 rounded-lg bg-muted/50 p-4">
          <Clock className="h-8 w-8 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Arrival</p>
            <p className="font-semibold text-secondary">{trip.arrivalTime || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 rounded-lg bg-muted/50 p-4">
          <Bus className="h-8 w-8 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Bus</p>
            <p className="font-semibold text-secondary">{trip.bus?.registrationNumber || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
