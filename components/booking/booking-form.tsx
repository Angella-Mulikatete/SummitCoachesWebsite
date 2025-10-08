"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Mail, Phone, AlertCircle } from "lucide-react"
import { useSeatStore } from "@/lib/stores/seat-store"
import { api, API_ENDPOINTS } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import type { Trip } from "@/lib/types"

interface BookingFormProps {
  tripId: string
}

export function BookingForm({ tripId }: BookingFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { selectedSeats, luggage, passengerNames, setPassengerName, discountCode } = useSeatStore()
  const { data: trip } = useSWR<Trip>(API_ENDPOINTS.tripDetails(tripId))

  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    notes: "",
  })

  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePassengerNameChange = (seatNo: string, name: string) => {
    setPassengerName(seatNo, name)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    // Validate all passenger names are filled
    const missingNames = selectedSeats.filter((seat) => !passengerNames[seat.seatNo])
    if (missingNames.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please enter names for all passengers",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare booking data
      const bookingData = {
        tripId,
        seats: selectedSeats.map((seat) => ({
          seatNo: seat.seatNo,
          passengerName: passengerNames[seat.seatNo],
        })),
        luggage: luggage.map((item) => ({
          description: item.description,
          weight: item.weight,
        })),
        contactEmail: contactInfo.email,
        contactPhone: contactInfo.phone,
        notes: contactInfo.notes,
        discountCode: discountCode || undefined,
      }

      // Submit booking to API
      const response = await api.post(API_ENDPOINTS.bookings, bookingData)

      toast({
        title: "Booking Successful!",
        description: "Your booking has been confirmed. Redirecting to confirmation...",
      })

      // Redirect to confirmation page
      setTimeout(() => {
        router.push(`/booking/confirmation/${response.id}`)
      }, 1500)
    } catch (error) {
      console.error("Booking error:", error)
      toast({
        title: "Booking Failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!trip) return null

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Passenger Details */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-semibold text-secondary">Passenger Details</h3>
        <div className="space-y-4">
          {selectedSeats.map((seat, index) => (
            <motion.div
              key={seat.seatNo}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border border-border p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {seat.seatNo}
                  </div>
                  <span className="font-medium text-secondary">Passenger {index + 1}</span>
                </div>
                <span className="text-sm text-muted-foreground capitalize">{seat.class} Class</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`passenger-${seat.seatNo}`}>Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id={`passenger-${seat.seatNo}`}
                    placeholder="Enter full name as on ID"
                    value={passengerNames[seat.seatNo] || ""}
                    onChange={(e) => handlePassengerNameChange(seat.seatNo, e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-semibold text-secondary">Contact Information</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                className="pl-10"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">Your booking confirmation will be sent here</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="+256 700 000 000"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Special Requests (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special requirements or notes..."
              value={contactInfo.notes}
              onChange={(e) => setContactInfo({ ...contactInfo, notes: e.target.value })}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="rounded-2xl border-2 border-accent/20 bg-accent/5 p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-secondary">Important Information</p>
            <ul className="list-inside list-disc space-y-1 text-secondary-light">
              <li>No payment is required online</li>
              <li>You will receive a booking receipt via email and SMS</li>
              <li>Present your receipt at our office before departure</li>
              <li>Payment must be made at the office to confirm your seat</li>
              <li>Arrive at least 30 minutes before departure time</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          />
          <div className="space-y-1">
            <Label htmlFor="terms" className="cursor-pointer font-normal leading-relaxed">
              I agree to the{" "}
              <a href="/terms" target="_blank" className="text-primary hover:underline" rel="noreferrer">
                Terms and Conditions
              </a>{" "}
              and understand that payment must be made at the office before departure
            </Label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !agreedToTerms}>
        {isSubmitting ? "Processing..." : "Confirm Booking"}
      </Button>
    </form>
  )
}
