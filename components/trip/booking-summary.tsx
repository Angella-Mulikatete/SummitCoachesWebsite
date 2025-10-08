"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Tag, Trash2, Plus } from "lucide-react"
import { useSeatStore } from "@/lib/stores/seat-store"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface BookingSummaryProps {
  tripId: string
}

export function BookingSummary({ tripId }: BookingSummaryProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { selectedSeats, luggage, addLuggage, removeLuggage, discountCode, setDiscountCode } = useSeatStore()

  const [showLuggageForm, setShowLuggageForm] = useState(false)
  const [luggageForm, setLuggageForm] = useState({ description: "", weight: "" })

  const seatsTotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
  const luggageTotal = luggage.reduce((sum, item) => sum + item.price, 0)
  const subtotal = seatsTotal + luggageTotal
  const discount = 0 // Calculate based on discount code
  const tax = subtotal * 0.18 // 18% VAT
  const total = subtotal - discount + tax

  const handleAddLuggage = () => {
    if (!luggageForm.description || !luggageForm.weight) {
      toast({
        title: "Error",
        description: "Please fill in all luggage details",
        variant: "destructive",
      })
      return
    }

    const weight = Number.parseFloat(luggageForm.weight)
    const price = weight * 1000 // UGX 1000 per kg

    addLuggage({
      id: Date.now().toString(),
      description: luggageForm.description,
      weight,
      price,
    })

    setLuggageForm({ description: "", weight: "" })
    setShowLuggageForm(false)
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
                  Seat {seat.seatNo} ({seat.class})
                </span>
                <span className="font-medium text-secondary">UGX {seat.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator className="my-4" />

      {/* Luggage */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-secondary-light">Luggage ({luggage.length})</p>
          <Button variant="ghost" size="sm" onClick={() => setShowLuggageForm(!showLuggageForm)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <AnimatePresence>
          {showLuggageForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 space-y-2 rounded-lg bg-muted/50 p-3"
            >
              <div>
                <Label htmlFor="luggage-desc" className="text-xs">
                  Description
                </Label>
                <Input
                  id="luggage-desc"
                  placeholder="e.g., Large suitcase"
                  value={luggageForm.description}
                  onChange={(e) => setLuggageForm({ ...luggageForm, description: e.target.value })}
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="luggage-weight" className="text-xs">
                  Weight (kg)
                </Label>
                <Input
                  id="luggage-weight"
                  type="number"
                  placeholder="20"
                  value={luggageForm.weight}
                  onChange={(e) => setLuggageForm({ ...luggageForm, weight: e.target.value })}
                  className="h-8 text-sm"
                />
              </div>
              <Button size="sm" onClick={handleAddLuggage} className="w-full">
                Add Luggage
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {luggage.length > 0 && (
          <div className="space-y-2">
            {luggage.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <div className="flex-1">
                  <p className="text-secondary">{item.description}</p>
                  <p className="text-xs text-muted-foreground">{item.weight} kg</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-secondary">UGX {item.price.toLocaleString()}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeLuggage(item.id)}>
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
          />
          <Button variant="outline" size="sm">
            <Tag className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Price Breakdown */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-secondary-light">Seats</span>
          <span className="font-medium text-secondary">UGX {seatsTotal.toLocaleString()}</span>
        </div>
        {luggageTotal > 0 && (
          <div className="flex justify-between">
            <span className="text-secondary-light">Luggage</span>
            <span className="font-medium text-secondary">UGX {luggageTotal.toLocaleString()}</span>
          </div>
        )}
        {discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Discount</span>
            <span>-UGX {discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-secondary-light">Tax (18%)</span>
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
