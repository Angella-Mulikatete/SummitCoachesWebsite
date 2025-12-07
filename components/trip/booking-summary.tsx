"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Tag, Loader2, BookOpen } from "lucide-react"
import { useSeatStore } from "@/lib/stores/seat-store"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { LuggageSelector } from "@/components/booking/luggage-selector"
import { useDiscountValidation } from "@/hooks/use-discount-validation"

interface BookingSummaryProps {
  tripId: string
}

export function BookingSummary({ tripId }: BookingSummaryProps) {
  const router = useRouter()
  const { toast } = useToast()
  const {
    selectedSeats,
    luggage,
    setLuggage,
    removeLuggage,
    discountCode,
    setDiscountCode,
    discountAmount,
    setDiscountAmount
  } = useSeatStore()

  const { validateDiscount, isValidating, error: discountError, discount: validDiscount } = useDiscountValidation()

  const seatsTotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
  const luggageTotal = luggage.reduce((sum, item) => sum + item.total_charge, 0)
  const subtotal = seatsTotal + luggageTotal
  const tax = subtotal * 0.18 // 18% VAT (or adjust as per requirements)

  // Calculate total: (Subtotal - Discount) + Tax? Or (Subtotal + Tax) - Discount?
  // Assuming discount applies to fare before tax for now
  const taxableAmount = Math.max(0, subtotal - discountAmount)
  // const total = taxableAmount + (taxableAmount * 0.18) 
  // Simplified for now: Subtotal + Tax - Discount
  const total = Math.max(0, subtotal + tax - discountAmount)

  const handleApplyDiscount = async () => {
    if (!discountCode) return

    const result = await validateDiscount(discountCode, subtotal)
    if (result.success && result.data) {
      setDiscountAmount(result.data.discount_amount)
      toast({
        title: "Discount Applied",
        description: `You saved UGX ${result.data.discount_amount.toLocaleString()}`,
        variant: "default",
      })
    } else {
      setDiscountAmount(0)
      toast({
        title: "Invalid Code",
        description: result.message || "This discount code is not valid",
        variant: "destructive",
      })
    }
  }

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      toast({
        title: "No seats selected",
        description: "Please select at least one seat to continue",
        variant: "destructive",
      })
      return
    }

    router.push(`/booking/${tripId}`)
  }

  return (
    <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-semibold text-secondary">Booking Summary</h3>

      {/* Selected Seats */}
      <div className="mb-4">
        <p className="mb-2 text-sm font-medium text-secondary-light">Selected Seats ({selectedSeats.length})</p>
        {selectedSeats.length === 0 ? (
          <p className="text-sm text-muted-foreground">No seats selected</p>
        ) : (
          <div className="space-y-2">
            {selectedSeats.map((seat) => (
              <div key={seat.seatNo} className="flex items-center justify-between text-sm">
                <span className="text-secondary">
                  Seat {seat.seatNo}
                </span>
                <span className="font-medium text-secondary">UGX {seat.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator className="my-4" />

      {/* Luggage Section */}
      <LuggageSelector luggage={luggage} onLuggageChange={setLuggage} />

      <Separator className="my-4" />

      {/* Discount Code */}
      <div className="mb-4">
        <Label htmlFor="discount-code" className="text-sm font-medium text-secondary-light">
          Discount Code
        </Label>
        <div className="mt-2 flex space-x-2">
          <Input
            id="discount-code"
            placeholder="Enter code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="h-9"
            disabled={isValidating}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleApplyDiscount}
            disabled={!discountCode || isValidating}
          >
            {isValidating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Tag className="h-4 w-4" />}
          </Button>
        </div>
        {discountAmount > 0 && (
          <p className="mt-2 text-xs text-green-600 font-medium">
            Discount applied!
          </p>
        )}
      </div>

      <Separator className="my-4" />

      {/* Price Breakdown */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-secondary-light">Seats Subtotal</span>
          <span className="font-medium text-secondary">UGX {seatsTotal.toLocaleString()}</span>
        </div>
        {luggageTotal > 0 && (
          <div className="flex justify-between">
            <span className="text-secondary-light">Luggage Subtotal</span>
            <span className="font-medium text-secondary">UGX {luggageTotal.toLocaleString()}</span>
          </div>
        )}

        {discountAmount > 0 && (
          <div className="flex justify-between text-success font-medium">
            <span>Discount</span>
            <span>-UGX {discountAmount.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-secondary-light">VAT (18%)</span>
          <span className="font-medium text-secondary">UGX {tax.toLocaleString()}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="mb-6 flex items-center justify-between">
        <span className="text-lg font-semibold text-secondary">Total</span>
        <span className="text-2xl font-bold text-primary">UGX {total.toLocaleString()}</span>
      </div>

      <Button onClick={handleProceed} disabled={selectedSeats.length === 0} className="w-full" size="lg">
        Proceed to Booking
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        No payment required online. Pay at our office with your booking receipt.
      </p>
    </div>
  )
}

