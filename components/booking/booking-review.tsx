"use client"

import useSWR from "swr"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Package } from "lucide-react"
import { useSeatStore } from "@/lib/stores/seat-store"
import type { Trip } from "@/lib/types"
import { API_ENDPOINTS } from "@/lib/api"
import { format } from "date-fns"

interface BookingReviewProps {
  tripId: string
}

export function BookingReview({ tripId }: BookingReviewProps) {
  const { data: trip } = useSWR<Trip>(API_ENDPOINTS.tripDetails(tripId))
  const { selectedSeats, luggage } = useSeatStore()

  if (!trip) return null

  const departureTime = new Date(trip.departureTime)
  const seatsTotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
  const luggageTotal = luggage.reduce((sum, item) => sum + item.price, 0)
  const subtotal = seatsTotal + luggageTotal
  const tax = subtotal * 0.18
  const total = subtotal + tax

  return (
    <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-semibold text-secondary">Booking Review</h3>

      {/* Trip Details */}
      <div className="mb-4 space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Route</p>
          <p className="font-semibold text-secondary">
            {trip.route.origin} → {trip.route.destination}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-secondary">{format(departureTime, "EEEE, MMMM dd, yyyy")}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-secondary">Departure: {format(departureTime, "h:mm a")}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {trip.bus.type}
          </Badge>
          <Badge variant="outline">{trip.bus.plateNo}</Badge>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Selected Seats */}
      <div className="mb-4">
        <div className="mb-2 flex items-center space-x-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium text-secondary">Seats ({selectedSeats.length})</p>
        </div>
        <div className="space-y-2">
          {selectedSeats.map((seat) => (
            <div key={seat.seatNo} className="flex items-center justify-between text-sm">
              <span className="text-secondary">
                Seat {seat.seatNo} ({seat.class})
              </span>
              <span className="font-medium text-secondary">UGX {seat.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Luggage */}
      {luggage.length > 0 && (
        <>
          <Separator className="my-4" />
          <div className="mb-4">
            <div className="mb-2 flex items-center space-x-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-secondary">Luggage ({luggage.length})</p>
            </div>
            <div className="space-y-2">
              {luggage.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-secondary">{item.description}</p>
                    <p className="text-xs text-muted-foreground">{item.weight} kg</p>
                  </div>
                  <span className="font-medium text-secondary">UGX {item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <Separator className="my-4" />

      {/* Price Summary */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-secondary-light">Subtotal</span>
          <span className="font-medium text-secondary">UGX {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-secondary-light">Tax (18%)</span>
          <span className="font-medium text-secondary">UGX {tax.toLocaleString()}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-secondary">Total Amount</span>
        <span className="text-2xl font-bold text-primary">UGX {total.toLocaleString()}</span>
      </div>

      <div className="mt-4 rounded-lg bg-primary/5 p-3 text-center">
        <p className="text-xs font-medium text-primary">Pay at Office</p>
        <p className="text-xs text-secondary-light">No online payment required</p>
      </div>
    </div>
  )
}
