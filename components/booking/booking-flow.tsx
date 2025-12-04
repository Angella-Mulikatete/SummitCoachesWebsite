'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'
import { useTripSeats, useCreateBooking, useTrip } from '@/lib/hooks'
import { Trip, CreateBookingPayload, Booking } from '@/lib/types'
import SeatSelector from './seat-selector'
import PassengerForm, { PassengerFormData } from './passenger-form'
import PaymentForm, { PaymentFormData } from './payment-form'
import BookingConfirmation from './booking-confirmation'

interface BookingFlowProps {
    tripId: string | number
}

type Step = 'seats' | 'passenger' | 'payment' | 'confirmation'

export default function BookingFlow({ tripId }: BookingFlowProps) {
    const [currentStep, setCurrentStep] = useState<Step>('seats')
    const [selectedSeats, setSelectedSeats] = useState<number[]>([])
    const [passengerData, setPassengerData] = useState<PassengerFormData | null>(null)
    const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null)
    const [createdBooking, setCreatedBooking] = useState<Booking | null>(null)
    const [error, setError] = useState<string>('')

    // Fetch data
    const { trip, isLoading: tripLoading } = useTrip(tripId)
    const { seats, isLoading: seatsLoading } = useTripSeats(tripId)
    const { createBooking, isLoading: bookingLoading } = useCreateBooking()

    // Calculate totals
    const seatPrice = trip?.price || 0
    const totalAmount = selectedSeats.length * seatPrice

    const handleSeatSelect = (seatId: number) => {
        setSelectedSeats(prev => {
            if (prev.includes(seatId)) {
                return prev.filter(id => id !== seatId)
            }
            if (prev.length >= 4) return prev
            return [...prev, seatId]
        })
    }

    const handleNext = async () => {
        setError('')

        if (currentStep === 'seats') {
            if (selectedSeats.length === 0) {
                setError('Please select at least one seat')
                return
            }
            setCurrentStep('passenger')
        } else if (currentStep === 'passenger') {
            if (!passengerData?.passenger_name || !passengerData?.passenger_phone) {
                setError('Please fill in all required fields')
                return
            }
            setCurrentStep('payment')
        } else if (currentStep === 'payment') {
            await handleSubmitBooking()
        }
    }

    const handleBack = () => {
        setError('')
        if (currentStep === 'passenger') setCurrentStep('seats')
        if (currentStep === 'payment') setCurrentStep('passenger')
    }

    const handleSubmitBooking = async () => {
        if (!passengerData || !paymentData || selectedSeats.length === 0) return

        try {
            // Create payload
            const payload: CreateBookingPayload = {
                trip_id: Number(tripId),
                booking_type: 'passenger',
                payment_status: paymentData.payment_status,
                payment_method: paymentData.payment_method,
                seat_id: selectedSeats[0], // Currently handling single seat for main booking
                // For multiple seats, backend would need array support or multiple bookings
                // Assuming backend handles single seat per booking for now based on API

                passenger_name: passengerData.passenger_name,
                passenger_phone: passengerData.passenger_phone,
                passenger_email: passengerData.passenger_email,
                passenger_type: passengerData.passenger_type,

                promo_code: paymentData.promo_code,
            }

            const response = await createBooking(payload)
            setCreatedBooking(response.data)
            setCurrentStep('confirmation')
        } catch (err: any) {
            setError(err.message || 'Failed to create booking. Please try again.')
        }
    }

    if (tripLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!trip) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-slate-800">Trip not found</h2>
                <p className="text-slate-600 mt-2">The trip you are looking for does not exist or has expired.</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            {currentStep !== 'confirmation' && (
                <div className="mb-8">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10" />

                        {['seats', 'passenger', 'payment'].map((step, index) => {
                            const isActive = step === currentStep
                            const isCompleted =
                                (step === 'seats' && currentStep !== 'seats') ||
                                (step === 'passenger' && currentStep === 'payment')

                            return (
                                <div key={step} className="flex flex-col items-center bg-white px-2">
                                    <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                    ${isActive || isCompleted ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}
                  `}>
                                        {index + 1}
                                    </div>
                                    <span className={`text-xs mt-2 font-medium ${isActive ? 'text-primary' : 'text-slate-500'}`}>
                                        {step.charAt(0).toUpperCase() + step.slice(1)}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Trip Summary Header */}
                {currentStep !== 'confirmation' && (
                    <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-slate-800">
                                {trip.route?.origin} to {trip.route?.destination}
                            </h2>
                            <p className="text-sm text-slate-500">
                                {new Date(trip.departureDate || trip.date).toLocaleDateString()} • {trip.departureTime || trip.departure_time}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-500">Price per seat</p>
                            <p className="font-bold text-primary">UGX {seatPrice.toLocaleString()}</p>
                        </div>
                    </div>
                )}

                <div className="p-6">
                    <AnimatePresence mode="wait">
                        {currentStep === 'seats' && (
                            <motion.div
                                key="seats"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <SeatSelector
                                    seats={seats}
                                    selectedSeats={selectedSeats}
                                    onSeatSelect={handleSeatSelect}
                                    isLoading={seatsLoading}
                                />
                            </motion.div>
                        )}

                        {currentStep === 'passenger' && (
                            <motion.div
                                key="passenger"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <PassengerForm
                                    onPassengerData={setPassengerData}
                                    initialData={passengerData || undefined}
                                />
                            </motion.div>
                        )}

                        {currentStep === 'payment' && (
                            <motion.div
                                key="payment"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <PaymentForm
                                    totalAmount={totalAmount}
                                    onPaymentData={setPaymentData}
                                    tripId={Number(tripId)}
                                />
                            </motion.div>
                        )}

                        {currentStep === 'confirmation' && createdBooking && (
                            <motion.div
                                key="confirmation"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <BookingConfirmation booking={createdBooking} trip={trip} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {currentStep !== 'confirmation' && (
                    <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 'seats' || bookingLoading}
                            className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                ${currentStep === 'seats'
                                    ? 'text-slate-300 cursor-not-allowed'
                                    : 'text-slate-600 hover:bg-slate-200 hover:text-slate-800'}
              `}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Back
                        </button>

                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-slate-500">Total Amount</p>
                                <p className="font-bold text-slate-800">
                                    UGX {(paymentData?.final_amount ?? totalAmount).toLocaleString()}
                                </p>
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={bookingLoading}
                                className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {bookingLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        {currentStep === 'payment' ? 'Confirm Booking' : 'Next Step'}
                                        <ChevronRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
