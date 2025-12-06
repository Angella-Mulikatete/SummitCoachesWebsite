"use client"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { UISeat, Trip, ApiResponse } from "@/lib/types"
import { api, API_ENDPOINTS } from "@/lib/api"
import { motion } from "framer-motion"
import { useSeatStore } from "@/lib/stores/seat-store"
import { useBusSeats, useTripBookedSeats } from "@/hooks/use-seat-layout"
import { Loader2 } from "lucide-react"

interface SeatSelectionProps {
  tripId: string
}

export function SeatSelection({ tripId }: SeatSelectionProps) {
  const { data: tripResponse, isLoading: isTripLoading } = useSWR<ApiResponse<Trip>>(
    API_ENDPOINTS.tripDetails(tripId),
    api.get
  )

  const trip = tripResponse?.data
  const busId = trip?.bus_id ? Number(trip.bus_id) : undefined

  const { seats: busSeats, isLoading: isSeatsLoading } = useBusSeats(busId)
  // const { bookedSeats, isLoading: isBookedLoading } = useTripBookedSeats(tripId)
  const bookedSeats: any[] = []
  const isBookedLoading = false
  const { selectedSeats, toggleSeat, clearSeats } = useSeatStore()

  console.log("Trip ID:", tripId);
  console.log("Trip Data:", trip);
  console.log("Bus ID:", busId);
  console.log("Bus Seats:", busSeats);
  console.log("Booked Seats:", bookedSeats);
  console.log("Is Loading:", { isTripLoading, isSeatsLoading, isBookedLoading });

  if (isTripLoading || isSeatsLoading || isBookedLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl bg-white p-6 shadow-sm">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!trip) return null

  // Group seats by row for rendering
  const seatRows = busSeats.reduce((acc: any[], seat: any) => {
    // Determine row index from multiple possible properties
    // 1. If row is string (A, B...), convert to index
    // 2. If row is number, use it
    // 3. Fallback to position_y (from new API response)
    // 4. Fallback to row_label parsing
    let rowIndex = 0;

    if (typeof seat.row === 'string') {
      rowIndex = seat.row.charCodeAt(0) - 65;
    } else if (typeof seat.row === 'number') {
      rowIndex = seat.row;
    } else if (typeof seat.position_y === 'number') {
      // position_y seems to be 1-based index (e.g. 2, 3)
      rowIndex = seat.position_y - 1;
    } else if (seat.row_label) {
      // Try to parse row label or convert char
      const parsed = parseInt(seat.row_label);
      rowIndex = isNaN(parsed) ? (seat.row_label.charCodeAt(0) - 65) : parsed - 1;
    }

    // Ensure valid index
    rowIndex = Math.max(0, rowIndex);

    if (!acc[rowIndex]) acc[rowIndex] = []
    acc[rowIndex].push(seat)
    return acc
  }, []).filter(Boolean)

  // Transform API seat to UI Seat for status checking
  const getSeatStatus = (seat: any) => {
    // Check if seat is in bookedSeats list
    const isBooked = bookedSeats.some((booked: any) =>
      booked.seat_number === seat.seat_number || booked.id === seat.id
    ) || seat.status === 'reserved' || seat.status === 'broken'

    if (isBooked) return "booked"
    if (selectedSeats.some((s) => s.seatNo === seat.seat_number)) return "selected"
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

  const handleSeatClick = (apiSeat: any) => {
    // Determine seat price based on class or position if needed
    // For now using trip fare
    const price = trip.fare || trip.price || 0

    const uiSeat: UISeat = {
      seatNo: apiSeat.seat_number,
      row: typeof apiSeat.row === 'string' ? apiSeat.row.charCodeAt(0) - 65 : apiSeat.row,
      column: apiSeat.column,
      price: price,
      class: "Standard"
    }
    toggleSeat(uiSeat)
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
          {/* Driver Section - Only show if we have seats */}
          {busSeats.length > 0 && (
            <div className="mb-8 flex justify-end px-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-white shadow-md">
                <span className="text-xs font-semibold">Driver</span>
              </div>
            </div>
          )}

          {/* Seats Grid */}
          <div className="space-y-3 px-4 pb-4">
            {seatRows.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No seats configuration found for this bus.
              </div>
            ) : (
              seatRows.map((row: any[], rowIndex: number) => (
                <div key={rowIndex} className="flex items-center justify-center gap-4">
                  {/* Render row seats */}
                  {row.sort((a, b) => {
                    const colA = a.position_x ?? a.column ?? 0;
                    const colB = b.position_x ?? b.column ?? 0;
                    return colA - colB;
                  }).map((seat: any) => {
                    const status = getSeatStatus(seat)

                    return (
                      <motion.button
                        key={seat.id}
                        whileHover={status === "available" ? { scale: 1.05 } : {}}
                        whileTap={status === "available" ? { scale: 0.95 } : {}}
                        onClick={() => status === "available" && handleSeatClick(seat)}
                        disabled={status === "booked"}
                        className={`relative flex h-12 w-12 items-center justify-center rounded-xl border-2 text-sm font-bold shadow-sm transition-all ${getSeatColor(status)}`}
                      >
                        {status === "selected" ? <Check className="h-5 w-5" /> : seat.seat_number}
                      </motion.button>
                    )
                  })}
                </div>
              ))
            )}
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
