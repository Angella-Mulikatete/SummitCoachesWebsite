"use client"

import useSWR from "swr"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Package } from "lucide-react"
import type { Booking } from "@/lib/types"
import { API_ENDPOINTS } from "@/lib/api"
import { format } from "date-fns"
import QRCode from "qrcode"
import { useEffect, useState } from "react"

interface BookingReceiptProps {
  bookingId: string
}

export function BookingReceipt({ bookingId }: BookingReceiptProps) {
  const { data: booking } = useSWR<Booking>(API_ENDPOINTS.bookingDetails(bookingId))
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")

  useEffect(() => {
    if (booking?.qrCode) {
      QRCode.toDataURL(booking.qrCode, {
        width: 200,
        margin: 2,
        color: {
          dark: "#0ea5e9",
          light: "#ffffff",
        },
      }).then(setQrCodeUrl)
    }
  }, [booking])

  if (!booking) {
    return (
      <div className="animate-pulse rounded-2xl bg-white p-8">
        <div className="mb-4 h-8 w-2/3 rounded bg-muted" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-3/4 rounded bg-muted" />
        </div>
      </div>
    )
  }

  const departureTime = new Date(booking.trip.departureTime)

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mb-4 flex items-center justify-center space-x-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
            <span className="text-2xl font-bold text-white">SC</span>
          </div>
          <span className="text-2xl font-bold text-secondary">Summit Coaches</span>
        </div>
        <h2 className="mb-2 text-2xl font-bold text-secondary">Booking Receipt</h2>
        <p className="text-sm text-muted-foreground">Please present this receipt at our office</p>
      </div>

      <Separator className="my-6" />

      {/* Booking Reference */}
      <div className="mb-6 rounded-lg bg-primary/5 p-4 text-center">
        <p className="mb-1 text-sm text-muted-foreground">Booking Reference</p>
        <p className="text-2xl font-bold text-primary">{booking.bookingReference}</p>
      </div>

      {/* QR Code */}
      {qrCodeUrl && (
        <div className="mb-6 flex justify-center">
          <div className="rounded-lg border-2 border-primary/20 p-4">
            <img src={qrCodeUrl || "/placeholder.svg"} alt="Booking QR Code" className="h-48 w-48" />
            <p className="mt-2 text-center text-xs text-muted-foreground">Scan at office</p>
          </div>
        </div>
      )}

      <Separator className="my-6" />

      {/* Trip Details */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-secondary">Trip Details</h3>
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Route</p>
                <p className="font-semibold text-secondary">
                  {booking.trip.route.origin} → {booking.trip.route.destination}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium text-secondary">{format(departureTime, "MMM dd, yyyy")}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Departure</p>
                <p className="font-medium text-secondary">{format(departureTime, "h:mm a")}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {booking.trip.bus.type}
            </Badge>
            <Badge variant="outline">{booking.trip.bus.plateNo}</Badge>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Passenger Details */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-secondary">Passenger Details</h3>
        <div className="space-y-3">
          {booking.seats.map((seat, index) => (
            <div key={seat.seatNo} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {seat.seatNo}
                </div>
                <div>
                  <p className="font-medium text-secondary">{seat.passengerName}</p>
                  <p className="text-xs text-muted-foreground">Passenger {index + 1}</p>
                </div>
              </div>
              <p className="font-semibold text-secondary">UGX {seat.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Luggage */}
      {booking.luggage && booking.luggage.length > 0 && (
        <>
          <Separator className="my-6" />
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold text-secondary">Luggage</h3>
            <div className="space-y-2">
              {booking.luggage.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-secondary">{item.description}</p>
                      <p className="text-xs text-muted-foreground">{item.weight} kg</p>
                    </div>
                  </div>
                  <p className="font-medium text-secondary">UGX {item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <Separator className="my-6" />

      {/* Payment Summary */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-secondary">Payment Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-secondary-light">Gross Amount</span>
            <span className="font-medium text-secondary">UGX {booking.grossAmount.toLocaleString()}</span>
          </div>
          {booking.discountAmount > 0 && (
            <div className="flex justify-between text-sm text-success">
              <span>Discount</span>
              <span>-UGX {booking.discountAmount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-secondary-light">Tax (18%)</span>
            <span className="font-medium text-secondary">UGX {booking.taxAmount.toLocaleString()}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-secondary">Total Amount</span>
            <span className="text-2xl font-bold text-primary">UGX {booking.netAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-accent/10 p-4 text-center">
        <p className="font-semibold text-accent">Payment Required at Office</p>
        <p className="text-sm text-secondary-light">Present this receipt to complete payment</p>
      </div>

      <Separator className="my-6" />

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground">
        <p className="mb-2">Summit Coaches - Kampala, Uganda</p>
        <p className="mb-1">Phone: +256 700 000 000 | Email: info@summitcoaches.com</p>
        <p>Booked on {format(new Date(booking.createdAt), "MMM dd, yyyy 'at' h:mm a")}</p>
      </div>
    </div>
  )
}
