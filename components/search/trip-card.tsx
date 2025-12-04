"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users, ArrowRight, Wifi, Coffee, Tv } from "lucide-react"
import type { Trip } from "@/lib/types"
import { motion } from "framer-motion"
import { format } from "date-fns"

interface TripCardProps {
  trip: Trip
  passengers: number
}

export function TripCard({ trip, passengers }: TripCardProps) {
  const departureTime = new Date(trip.departureTime)
  const arrivalTime = new Date(trip.arrivalTime)

  const amenityIcons = {
    WiFi: Wifi,
    Coffee: Coffee,
    Entertainment: Tv,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:border-primary hover:shadow-md"
    >
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center space-x-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {trip.bus.type}
              </Badge>
              <Badge variant="outline">{trip.bus.plateNo}</Badge>
            </div>
            <h3 className="text-xl font-semibold text-secondary">
              {trip.route.origin} → {trip.route.destination}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">UGX {trip.basePrice.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>
        </div>

        <div className="mb-4 grid gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-secondary">Departure</p>
              <p className="text-secondary-light">{format(departureTime, "h:mm a")}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-secondary">Arrival</p>
              <p className="text-secondary-light">{format(arrivalTime, "h:mm a")}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <Users className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-secondary">Available Seats</p>
              <p className="text-secondary-light">{trip.availableSeats} seats</p>
            </div>
          </div>
        </div>

        {trip.bus.amenities && trip.bus.amenities.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {trip.bus.amenities.map((amenity) => {
              const Icon = amenityIcons[amenity as keyof typeof amenityIcons]
              return (
                <div key={amenity} className="flex items-center space-x-1 rounded-full bg-muted px-3 py-1 text-xs">
                  {Icon && <Icon className="h-3 w-3" />}
                  <span>{amenity}</span>
                </div>
              )
            })}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center space-x-2 text-sm text-secondary-light">
            <MapPin className="h-4 w-4" />
            <span>{trip.route.distanceKm} km</span>
            <span>•</span>
            <span>{trip.route.estimatedDuration}</span>
          </div>

          <Link href={`/booking/${trip.id}?passengers=${passengers}`}>
            <Button>
              Select Seats
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
