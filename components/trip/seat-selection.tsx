"use client"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import type { Trip, Seat } from "@/lib/types"
import { API_ENDPOINTS } from "@/lib/api"
import { motion } from "framer-motion"
import { useSeatStore } from "@/lib/stores/seat-store"

interface SeatSelectionProps {
  tripId: string
}

export function SeatSelection({ tripId }: SeatSelectionProps) {
  const { data: trip, isLoading } = useSWR<Trip>(API_ENDPOINTS.tripDetails(tripId))
  const { selectedSeats, toggleSeat, clearSeats } = useSeatStore()

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-2xl bg-white p-6">
        <div className="mb-4 h-6 w-1/3 rounded bg-muted" />
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="h-12 rounded bg-muted" />
          ))}
        </div>
      </div>
    )
  }

  if (!trip) return null

  const seatMap = trip.seatMap || { rows: 10, columns: 4, seats: [] }

  const getSeatStatus = (seat: Seat) => {
    if (seat.isBooked) return "booked"
    if (selectedSeats.some((s) => s.seatNo === seat.seatNo)) return "selected"
    return "available"
  }

  const getSeatColor = (status: string) => {
    switch (status) {
      case "booked":
        return "bg-muted text-muted-foreground cursor-not-allowed"
      case "selected":
        return "bg-primary text-white border-primary"
      default:
        return "bg-white border-border hover:border-primary hover:bg-primary/5 cursor-pointer"
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-secondary">Select Your Seats</h3>
        {selectedSeats.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearSeats}>
            Clear Selection
          </Button>
        )}
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded border-2 border-border bg-white" />
          <span className="text-secondary-light">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded border-2 border-primary bg-primary" />
          <span className="text-secondary-light">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-muted" />
          <span className="text-secondary-light">Booked</span>
        </div>
      </div>

      {/* Bus Layout */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Driver Section */}
          <div className="mb-4 flex justify-end">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-white">
              <span className="text-xs font-semibold">Driver</span>
            </div>
          </div>

          {/* Seats Grid */}
          <div className="space-y-2">
            {Array.from({ length: seatMap.rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex items-center justify-center gap-2">
                {/* Left side seats */}
                <div className="flex gap-2">
                  {seatMap.seats
                    .filter((seat) => seat.row === rowIndex && seat.column < 2)
                    .sort((a, b) => a.column - b.column)
                    .map((seat) => {
                      const status = getSeatStatus(seat)
                      return (
                        <motion.button
                          key={seat.seatNo}
                          whileHover={status === "available" ? { scale: 1.05 } : {}}
                          whileTap={status === "available" ? { scale: 0.95 } : {}}
                          onClick={() => status === "available" && toggleSeat(seat)}
                          disabled={status === "booked"}
                          className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 text-xs font-semibold transition-all ${getSeatColor(status)}`}
                        >
                          {status === "selected" ? <Check className="h-4 w-4" /> : seat.seatNo}
                        </motion.button>
                      )
                    })}
                </div>

                {/* Aisle */}
                <div className="w-8" />

                {/* Right side seats */}
                <div className="flex gap-2">
                  {seatMap.seats
                    .filter((seat) => seat.row === rowIndex && seat.column >= 2)
                    .sort((a, b) => a.column - b.column)
                    .map((seat) => {
                      const status = getSeatStatus(seat)
                      return (
                        <motion.button
                          key={seat.seatNo}
                          whileHover={status === "available" ? { scale: 1.05 } : {}}
                          whileTap={status === "available" ? { scale: 0.95 } : {}}
                          onClick={() => status === "available" && toggleSeat(seat)}
                          disabled={status === "booked"}
                          className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 text-xs font-semibold transition-all ${getSeatColor(status)}`}
                        >
                          {status === "selected" ? <Check className="h-4 w-4" /> : seat.seatNo}
                        </motion.button>
                      )
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="mt-6 rounded-lg bg-primary/5 p-4">
          <p className="mb-2 text-sm font-medium text-secondary">Selected Seats:</p>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <Badge key={seat.seatNo} variant="secondary" className="bg-primary text-white">
                {seat.seatNo} - UGX {seat.price.toLocaleString()}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
