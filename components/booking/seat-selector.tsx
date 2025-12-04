'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

import { Seat } from '@/lib/types'

interface SeatSelectorProps {
    seats: Seat[]
    selectedSeats: number[]
    onSeatSelect: (seatId: number) => void
    maxSeats?: number
    isLoading?: boolean
}

export default function SeatSelector({
    seats,
    selectedSeats,
    onSeatSelect,
    maxSeats = 4,
    isLoading = false
}: SeatSelectorProps) {
    // Group seats by row
    const seatsByRow = seats.reduce((acc, seat) => {
        // Use row number as label or convert to letter if needed
        const rowLabel = `Row ${seat.row}`
        if (!acc[rowLabel]) {
            acc[rowLabel] = []
        }
        acc[rowLabel].push(seat)
        return acc
    }, {} as Record<string, Seat[]>)

    // Sort rows by number
    const sortedRows = Object.keys(seatsByRow).sort((a, b) => {
        const rowA = parseInt(a.replace('Row ', ''))
        const rowB = parseInt(b.replace('Row ', ''))
        return rowA - rowB
    })

    const getSeatStatus = (seat: Seat) => {
        if (selectedSeats.includes(seat.id)) return 'selected'
        if (!seat.is_available) return 'reserved'
        return 'available'
    }

    const getSeatColor = (status: string) => {
        switch (status) {
            case 'selected':
                return 'bg-primary text-white border-primary'
            case 'reserved':
                return 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
            case 'unavailable':
                return 'bg-red-100 text-red-400 border-red-200 cursor-not-allowed'
            default:
                return 'bg-white text-slate-700 border-slate-300 hover:border-primary hover:bg-primary/10'
        }
    }

    const handleSeatClick = (seat: Seat) => {
        const status = getSeatStatus(seat)

        if (status === 'reserved') {
            return
        }

        if (status === 'selected') {
            onSeatSelect(seat.id)
            return
        }

        // Check if we can select more seats
        if (selectedSeats.length >= maxSeats) {
            return
        }

        onSeatSelect(seat.id)
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (seats.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>No seats available for this trip</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Legend */}
            <div className="flex flex-wrap gap-4 justify-center pb-4 border-b">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white border-2 border-slate-300 rounded"></div>
                    <span className="text-sm text-slate-600">Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary border-2 border-primary rounded"></div>
                    <span className="text-sm text-slate-600">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 border-2 border-gray-300 rounded"></div>
                    <span className="text-sm text-slate-600">Reserved</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 border-2 border-red-200 rounded"></div>
                    <span className="text-sm text-slate-600">Unavailable</span>
                </div>
            </div>

            {/* Selection Info */}
            <div className="text-center">
                <p className="text-sm text-slate-600">
                    Selected: <span className="font-semibold text-primary">{selectedSeats.length}</span> / {maxSeats} seats
                </p>
            </div>

            {/* Seat Map */}
            <div className="bg-slate-50 rounded-lg p-6">
                {/* Driver indicator */}
                <div className="flex justify-end mb-4">
                    <div className="bg-slate-200 px-4 py-2 rounded-t-lg text-sm font-medium text-slate-600">
                        🚗 Driver
                    </div>
                </div>

                {/* Seats by row */}
                <div className="space-y-3">
                    {sortedRows.map((rowLabel) => {
                        const rowSeats = seatsByRow[rowLabel].sort((a, b) =>
                            (a.column || 0) - (b.column || 0)
                        )

                        return (
                            <div key={rowLabel} className="flex items-center gap-3">
                                {/* Row label */}
                                <div className="w-8 text-center font-semibold text-slate-600">
                                    {rowLabel}
                                </div>

                                {/* Seats */}
                                <div className="flex gap-2 flex-1 justify-center">
                                    {rowSeats.map((seat, index) => {
                                        const status = getSeatStatus(seat)
                                        const isClickable = status === 'available' || status === 'selected'

                                        // Add aisle gap (usually after 2nd seat in a row)
                                        const showAisle = index === Math.floor(rowSeats.length / 2)

                                        return (
                                            <div key={seat.id} className="flex gap-2">
                                                {showAisle && <div className="w-4"></div>}

                                                <motion.button
                                                    whileHover={isClickable ? { scale: 1.05 } : {}}
                                                    whileTap={isClickable ? { scale: 0.95 } : {}}
                                                    onClick={() => handleSeatClick(seat)}
                                                    className={`
                            w-12 h-12 rounded border-2 font-medium text-sm
                            transition-all duration-200 relative
                            ${getSeatColor(status)}
                            ${!isClickable ? 'cursor-not-allowed' : 'cursor-pointer'}
                          `}
                                                    disabled={!isClickable}
                                                    title={`Seat ${seat.seat_number} - ${status}`}
                                                >
                                                    {status === 'selected' && (
                                                        <Check className="absolute inset-0 m-auto h-5 w-5" />
                                                    )}
                                                    {status !== 'selected' && (
                                                        <span>{seat.seat_number.split(/[^\d]/)[1] || seat.seat_number}</span>
                                                    )}

                                                    {/* Window indicator */}
                                                    {seat.is_window && (
                                                        <div className="absolute -right-1 -top-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                                                    )}
                                                </motion.button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Max seats warning */}
            {selectedSeats.length >= maxSeats && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center"
                >
                    <p className="text-sm text-amber-800">
                        You've reached the maximum of {maxSeats} seats
                    </p>
                </motion.div>
            )}
        </div>
    )
}
