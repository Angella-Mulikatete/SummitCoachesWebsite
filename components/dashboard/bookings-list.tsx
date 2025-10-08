"use client"

import useSWR from "swr"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Eye, Download } from "lucide-react"
import type { Booking } from "@/lib/types"
import { API_ENDPOINTS } from "@/lib/api"
import { format } from "date-fns"
import { motion } from "framer-motion"

export function BookingsList() {
  const { data, isLoading } = useSWR<{ bookings: Booking[] }>(API_ENDPOINTS.userBookings)

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

  if (!data?.bookings || data.bookings.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Calendar className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-secondary">No Bookings Yet</h3>
        <p className="mb-6 text-secondary-light">Start your journey by booking your first trip</p>
        <Link href="/search">
          <Button>Book a Trip</Button>
        </Link>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success/10 text-success"
      case "cancelled":
        return "bg-destructive/10 text-destructive"
      case "completed":
        return "bg-secondary/10 text-secondary"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4">
      {data.bookings.map((booking, index) => {
        const departureTime = new Date(booking.trip.departureTime)

        return (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:border-primary hover:shadow-md"
          >
            <div className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center space-x-2">
                    <Badge className={getStatusColor(booking.bookingStatus)} variant="secondary">
                      {booking.bookingStatus}
                    </Badge>
                    <span className="text-sm text-muted-foreground">Ref: {booking.bookingReference}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary">
                    {booking.trip.route.origin} → {booking.trip.route.destination}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">UGX {booking.netAmount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{booking.seats.length} seat(s)</p>
                </div>
              </div>

              <div className="mb-4 grid gap-4 md:grid-cols-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-secondary">Date</p>
                    <p className="text-secondary-light">{format(departureTime, "MMM dd, yyyy")}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-secondary">Departure</p>
                    <p className="text-secondary-light">{format(departureTime, "h:mm a")}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-secondary">Seats</p>
                    <p className="text-secondary-light">{booking.seats.map((s) => s.seatNo).join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                <Link href={`/booking/confirmation/${booking.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Receipt
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                {booking.bookingStatus === "confirmed" && (
                  <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                    Cancel Booking
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
