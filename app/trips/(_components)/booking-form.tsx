"use client"

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { useCreateBooking } from '@/lib/hooks'
import { Trip } from '@/app/types'

interface BookingFormProps {
  trip: Trip
  onCancel: () => void
}

export function BookingForm({ trip, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { createBooking } = useCreateBooking()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Create array of seat numbers (you may need to adjust this logic based on your needs)
      const seatNumbers = Array.from({ length: formData.guests }, (_, i) => `SEAT-${i + 1}`)
      
      const response = await createBooking({
        trip_id: trip.id,
        passenger_name: formData.name,
        passenger_email: formData.email,
        passenger_phone: formData.phone,
        seat_numbers: seatNumbers,
      })

      setLoading(false)
      if (response.success) {
        setSuccess(true)
      }
    } catch (err: any) {
      console.error('Booking failed:', err)
      setError(err.message || 'Failed to create booking. Please try again.')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h4 className="text-lg font-bold text-slate-900 mb-2">Booking Confirmed!</h4>
        <p className="text-slate-500 text-sm mb-6">
          We've sent a confirmation email to {formData.email}.
        </p>
        <button
          onClick={onCancel}
          className="text-primary font-medium hover:underline"
        >
          Book another trip
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Full Name
        </label>
        <input
          required
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Email Address
        </label>
        <input
          required
          type="email"
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Phone
          </label>
          <input
            required
            type="tel"
            placeholder="+256700000000"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="w-24">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Guests
          </label>
          <input
            type="number"
            min="1"
            max={trip.availableSeats}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-between items-center font-bold text-slate-900">
        <span>Total</span>
        <span>UGX {(trip.price * formData.guests).toLocaleString()}</span>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-colors shadow-md disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  )
}




