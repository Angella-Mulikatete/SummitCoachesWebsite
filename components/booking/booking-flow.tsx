"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Loader2, Check, User as UserIcon, MapPin, Calendar, Clock, CreditCard, Package } from "lucide-react"

import { useTripSeats, useCreateBooking, useTrip, useUserProfile, useRouteFares, useRoute } from "@/lib/hooks"
import { Trip, CreateBookingPayload, Booking, BookingType, User } from "@/lib/types"
import SeatSelector from "./seat-selector"
import PassengerForm, { PassengerFormData } from "./passenger-form"
import PaymentForm, { PaymentFormData } from "./payment-form"
import BookingConfirmation from "./booking-confirmation"
import { BookingTypeSelector } from "./booking-type-selector"
import { AuthForm } from "@/components/auth/auth-form"
import { LuggageParcelForm } from "./luggage-parcel-form"
import { cn } from "@/lib/utils"

interface BookingFlowProps {
    tripId: string | number
}

// Define specific flows for each booking type to make progress bar dynamic
const FLOW_STEPS: Record<string, string[]> = {
    passenger: ['type', 'auth', 'seats', 'passenger', 'payment'],
    parcel: ['type', 'auth', 'luggage', 'passenger', 'payment'],
    mixed: ['type', 'auth', 'seats', 'luggage', 'passenger', 'payment']
}

// Map step keys to readable labels
const STEP_LABELS: Record<string, string> = {
    type: "Type",
    auth: "Login",
    seats: "Seats",
    luggage: "Luggage",
    passenger: "Details",
    payment: "Pay",
    confirmation: "Done"
}

export default function BookingFlow({ tripId }: BookingFlowProps) {
    const [currentStep, setCurrentStep] = useState<string>("type")
    const [bookingType, setBookingType] = useState<BookingType>("passenger")
    const [user, setUser] = useState<User | null>(null)

    const [selectedSeats, setSelectedSeats] = useState<number[]>([])
    const [luggageItems, setLuggageItems] = useState<any[]>([])
    const [luggageCost, setLuggageCost] = useState(0)

    const [passengerData, setPassengerData] = useState<PassengerFormData | null>(null)
    const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null)
    const [createdBooking, setCreatedBooking] = useState<Booking | null>(null)
    const [error, setError] = useState<string>("")

    // Fetch data
    const { trip, isLoading: tripLoading } = useTrip(tripId)
    const { seats, isLoading: seatsLoading } = useTripSeats(tripId)
    const { createBooking, isLoading: bookingLoading } = useCreateBooking()

    // Determine current flow based on booking type
    const activeFlow = FLOW_STEPS[bookingType] || FLOW_STEPS.passenger

    const { user: profileUser, isLoading: userLoading } = useUserProfile()

    // Auto-detect logged in user
    useEffect(() => {
        if (profileUser) {
            setUser(profileUser)
            console.log('✅ User detected from profile:', profileUser)
        }
    }, [profileUser])

    // ✅ Auto-skip auth step if user is already logged in
    useEffect(() => {
        if (user && currentStep === 'auth') {
            console.log('✅ User already logged in, skipping auth step')
            const nextStepIndex = activeFlow.indexOf('auth') + 1
            const nextStep = activeFlow[nextStepIndex]
            if (nextStep) {
                setCurrentStep(nextStep)
            }
        }
    }, [user, currentStep, activeFlow])

    // Fetch fares for the route
    const { fares, isLoading: faresLoading } = useRouteFares(trip?.route?.id || '')
    const { route, isLoading: routeLoading } = useRoute(trip?.route_id || trip?.route?.id || '')

    // Select fare based on trip bus type if available, otherwise just use trip price
    const routeFare = fares.find((f: any) => f.bus_type_name === trip?.bus?.type)

    // Calculations
    const seatPrice = Number(trip?.price) || Number(route?.base_fare) || 0
    const seatTotal = selectedSeats.length * seatPrice
    const totalAmount = seatTotal + luggageCost

    const handleSeatSelect = (seatId: number) => {
        setSelectedSeats((prev) => {
            if (prev.includes(seatId)) return prev.filter((id) => id !== seatId)
            if (prev.length >= 4) return prev
            return [...prev, seatId]
        })
    }

    // ✅ Enhanced handleAuthSuccess
    const handleAuthSuccess = (authenticatedUser: User) => {
        console.log('🎉 Auth success, user:', authenticatedUser)
        setUser(authenticatedUser)
        setError("")

        // Automatically proceed to next step
        const currentIndex = activeFlow.indexOf(currentStep)
        const nextStep = activeFlow[currentIndex + 1]

        if (nextStep) {
            console.log('➡️ Moving to next step:', nextStep)
            setCurrentStep(nextStep)
        }
    }

    // ✅ Enhanced handleGuestContinue
    const handleGuestContinue = () => {
        console.log('👤 Continuing as guest')
        setError("")

        const currentIndex = activeFlow.indexOf(currentStep)
        const nextStep = activeFlow[currentIndex + 1]

        if (nextStep) {
            console.log('➡️ Moving to next step:', nextStep)
            setCurrentStep(nextStep)
        }
    }

    // Navigation Logic
    const handleNext = async () => {
        setError("")

        // Validation logic per step
        if (currentStep === "type") {
            // Check if user is already logged in, skip auth
            if (user) {
                const authIndex = activeFlow.indexOf('auth')
                const nextStepIndex = authIndex + 1
                const nextStep = activeFlow[nextStepIndex]
                if (nextStep) {
                    setCurrentStep(nextStep)
                }
                return
            }
        } else if (currentStep === "auth") {
            // This should not happen if auth success auto-proceeds
            if (!user) {
                setError("Please login or continue as guest to proceed")
                return
            }
        } else if (currentStep === "seats" && selectedSeats.length === 0 && bookingType !== 'parcel') {
            setError("Please select at least one seat")
            return
        } else if (currentStep === "luggage" && bookingType === 'parcel' && luggageItems.length === 0) {
            setError("Please add at least one item")
            return
        } else if (currentStep === "passenger") {
            if (!passengerData?.passenger_name || !passengerData?.passenger_phone) {
                setError("Please fill in all required fields")
                return
            }
        } else if (currentStep === "payment") {
            await handleSubmitBooking()
            return
        }

        // Calculate next step
        const currentIndex = activeFlow.indexOf(currentStep)
        let nextStep = activeFlow[currentIndex + 1]

        // Skip Auth if User exists
        if (nextStep === 'auth' && user) {
            nextStep = activeFlow[currentIndex + 2]
        }

        setCurrentStep(nextStep)
    }

    const handleBack = () => {
        setError("")
        const currentIndex = activeFlow.indexOf(currentStep)
        let prevStep = activeFlow[currentIndex - 1]

        // Skip Auth if User exists when going back
        if (prevStep === 'auth' && user) {
            prevStep = activeFlow[currentIndex - 2]
        }

        if (prevStep) setCurrentStep(prevStep)
    }

    const handleSubmitBooking = async () => {
        if (!paymentData) {
            setError("Payment information is required")
            return
        }

        try {
            // Build the booking payload based on booking type
            const payload: any = {
                trip_id: Number(tripId),
                booking_type: bookingType,
                payment_status: paymentData.payment_status,
                payment_method: paymentData.payment_method,
            }

            // Add promo code if provided
            if (paymentData.promo_code?.trim()) {
                payload.promo_code = paymentData.promo_code.trim()
            }

            // PASSENGER BOOKING
            if (bookingType === 'passenger' || bookingType === 'mixed') {
                if (selectedSeats.length === 0) {
                    setError("Please select at least one seat")
                    return
                }

                payload.seat_id = selectedSeats[0]

                // ✅ Always send passenger details, NOT passenger_id
                if (passengerData?.passenger_name) {
                    payload.passenger_name = passengerData.passenger_name
                } else if (user?.name) {
                    payload.passenger_name = user.name
                } else {
                    setError("Passenger name is required")
                    return
                }

                if (passengerData?.passenger_phone) {
                    payload.passenger_phone = passengerData.passenger_phone
                } else if (user?.phone) {
                    payload.passenger_phone = user.phone
                } else {
                    setError("Passenger phone is required")
                    return
                }

                // Optional fields
                if (passengerData?.passenger_email || user?.email) {
                    payload.passenger_email = passengerData?.passenger_email || user?.email
                }

                if (passengerData?.passenger_type) {
                    payload.passenger_type = passengerData.passenger_type
                } else {
                    payload.passenger_type = 'adult'
                }
            }

            // LUGGAGE (for passenger or mixed bookings)
            if ((bookingType === 'mixed' || bookingType === 'luggage') && luggageItems.length > 0) {
                const firstLuggage = luggageItems[0]

                if (firstLuggage.type_id) payload.luggage_type_id = firstLuggage.type_id

                const totalCount = luggageItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
                if (totalCount > 0) payload.luggage_count = totalCount

                const totalWeight = luggageItems.reduce((sum, item) => sum + (item.weight || 0), 0)
                if (totalWeight > 0) payload.luggage_weight = totalWeight

                const descriptions = luggageItems.map(item => item.description).filter(Boolean).join(', ')
                if (descriptions) payload.luggage_description = descriptions
            }

            // PARCEL BOOKING
            if (bookingType === 'parcel' && luggageItems.length > 0) {
                const firstParcel = luggageItems[0]

                if (firstParcel.type_id) payload.parcel_type_id = firstParcel.type_id

                const totalCount = luggageItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
                if (totalCount > 0) payload.parcel_count = totalCount

                const totalWeight = luggageItems.reduce((sum, item) => sum + (item.weight || 0), 0)
                if (totalWeight > 0) payload.parcel_weight = totalWeight

                const descriptions = luggageItems.map(item => item.description).filter(Boolean).join(', ')
                if (descriptions) payload.parcel_description = descriptions

                // Sender details (required)
                if (passengerData?.passenger_name || user?.name) {
                    payload.sender_name = passengerData?.passenger_name || user?.name
                } else {
                    setError("Sender name is required")
                    return
                }

                if (passengerData?.passenger_phone || user?.phone) {
                    payload.sender_contact = passengerData?.passenger_phone || user?.phone
                } else {
                    setError("Sender phone is required")
                    return
                }

                if (passengerData?.passenger_email || user?.email) {
                    payload.sender_email = passengerData?.passenger_email || user?.email
                }

                // Receiver details (required)
                if (firstParcel.receiver_name) {
                    payload.receiver_name = firstParcel.receiver_name
                } else {
                    setError("Receiver name is required")
                    return
                }

                if (firstParcel.receiver_phone) {
                    payload.receiver_contact = firstParcel.receiver_phone
                } else {
                    setError("Receiver phone is required")
                    return
                }

                if (firstParcel.receiver_email) {
                    payload.receiver_email = firstParcel.receiver_email
                }

                // Pickup/Dropoff locations
                if (trip?.route?.origin) payload.pickup_location = trip.route.origin
                if (trip?.route?.destination) payload.dropoff_location = trip.route.destination
            }

            // ✅ REMOVE undefined/null values
            Object.keys(payload).forEach(key => {
                if (payload[key] === undefined || payload[key] === null || payload[key] === '') {
                    delete payload[key]
                }
            })

            console.log('📦 Final cleaned booking payload:', payload)

            const response = await createBooking(payload as CreateBookingPayload)

            if (response.success) {
                setCreatedBooking(response.data as any)
                setCurrentStep("confirmation")
            } else {
                setError(response.message || 'Booking failed')
            }
        } catch (err: any) {
            console.error('❌ Booking submission error:', err)
            setError(err.message || "Failed to create booking. Please try again.")
        }
    }

    if (tripLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[500px] bg-slate-50 rounded-xl">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                <p className="text-slate-500 font-medium">Loading trip details...</p>
            </div>
        )
    }

    if (!trip) return <div className="text-center p-10">Trip not found</div>

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">

            {/* Header / Stepper */}
            {currentStep !== "confirmation" && (
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 mb-6">Complete your booking</h1>

                    {/* Responsive Stepper */}
                    <div className="relative">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full" />
                        <div
                            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 rounded-full transition-all duration-500"
                            style={{ width: `${(activeFlow.indexOf(currentStep) / (activeFlow.length - 1)) * 100}%` }}
                        />

                        <div className="relative z-10 flex justify-between">
                            {activeFlow.map((step, index) => {
                                const currentIndex = activeFlow.indexOf(currentStep)
                                const isCompleted = index < currentIndex
                                const isActive = index === currentIndex

                                return (
                                    <div key={step} className="flex flex-col items-center group cursor-default">
                                        <div
                                            className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2",
                                                isActive ? "bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/30" :
                                                    isCompleted ? "bg-green-500 border-green-500 text-white" :
                                                        "bg-white border-slate-200 text-slate-400"
                                            )}
                                        >
                                            {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                                        </div>
                                        <span className={cn(
                                            "text-xs font-medium mt-2 transition-colors duration-300 hidden md:block",
                                            isActive ? "text-primary" :
                                                isCompleted ? "text-green-600" :
                                                    "text-slate-400"
                                        )}>
                                            {STEP_LABELS[step]}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8">

                {/* LEFT COLUMN: Main Form Area */}
                <div className={cn(
                    "flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-500",
                    currentStep === 'confirmation' ? "w-full lg:col-span-2" : ""
                )}>
                    {/* Step Title Header */}
                    {currentStep !== 'confirmation' && (
                        <div className="p-6 border-b border-slate-50 bg-slate-50/30">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                {currentStep === 'type' && <Package className="w-5 h-5 text-primary" />}
                                {currentStep === 'auth' && <UserIcon className="w-5 h-5 text-primary" />}
                                {currentStep === 'seats' && <UserIcon className="w-5 h-5 text-primary" />}
                                {currentStep === 'payment' && <CreditCard className="w-5 h-5 text-primary" />}

                                {currentStep === 'type' && "Select Booking Type"}
                                {currentStep === 'auth' && "Account Access"}
                                {currentStep === 'seats' && "Select your seats"}
                                {currentStep === 'passenger' && "Passenger Details"}
                                {currentStep === 'luggage' && "Add Luggage"}
                                {currentStep === 'payment' && "Payment Method"}
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                {currentStep === 'seats' && "Click on available seats to select them."}
                                {currentStep === 'payment' && "Secure and encrypted payment processing."}
                                {currentStep === 'auth' && "Login to access saved details or continue as guest."}
                            </p>
                        </div>
                    )}

                    <div className="p-6 md:p-8 min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {currentStep === "type" && (
                                <motion.div key="type" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                    <BookingTypeSelector selectedType={bookingType} onSelect={setBookingType} />
                                </motion.div>
                            )}

                            {currentStep === "auth" && (
                                <motion.div key="auth" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <AuthForm onSuccess={handleAuthSuccess} />
                                    {/* Guest Button */}
                                    <div className="mt-6 pt-6 border-t text-center">
                                        <button
                                            onClick={handleGuestContinue}
                                            className="text-sm text-slate-600 hover:text-primary underline font-medium transition-colors"
                                        >
                                            Continue as Guest →
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === "seats" && (
                                <motion.div key="seats" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <SeatSelector
                                        tripId={tripId}
                                        selectedSeats={selectedSeats}
                                        onSeatSelect={handleSeatSelect}
                                        totalCapacity={trip?.bus?.capacity}
                                    />
                                </motion.div>
                            )}

                            {currentStep === 'luggage' && (
                                <motion.div key="luggage" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <LuggageParcelForm
                                        type={bookingType === 'parcel' ? 'parcel' : 'luggage'}
                                        onUpdate={(items, cost) => { setLuggageItems(items); setLuggageCost(cost); }}
                                    />
                                </motion.div>
                            )}

                            {currentStep === "passenger" && (
                                <motion.div key="passenger" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <PassengerForm
                                        onPassengerData={setPassengerData}
                                        initialData={passengerData || (user ? {
                                            passenger_name: user.name,
                                            passenger_phone: user.phone || '',
                                            passenger_email: user.email,
                                            passenger_type: 'adult'
                                        } : undefined)}
                                    />
                                </motion.div>
                            )}

                            {currentStep === "payment" && (
                                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <PaymentForm totalAmount={totalAmount} onPaymentData={setPaymentData} tripId={Number(tripId)} />
                                </motion.div>
                            )}

                            {currentStep === "confirmation" && createdBooking && (
                                <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
                                    <BookingConfirmation booking={createdBooking} trip={trip} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {error && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 block" />
                                {error}
                            </motion.div>
                        )}
                    </div>

                    {/* Action Bar */}
                    {currentStep !== "confirmation" && currentStep !== "auth" && (
                        <div className="p-6 border-t bg-slate-50/50 flex justify-between items-center">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 'type'}
                                className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={bookingLoading}
                                className="group flex items-center gap-2 px-8 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-primary-hover hover:shadow-primary/40 disabled:opacity-70 disabled:shadow-none transition-all active:scale-95"
                            >
                                {bookingLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                    <>
                                        {currentStep === 'payment' ? 'Confirm & Pay' : 'Continue'}
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN: Sticky Order Summary (Hidden on confirmation) */}
                {currentStep !== "confirmation" && (
                    <div className="lg:w-80 xl:w-96 flex-shrink-0">
                        <div className="sticky top-6 space-y-4">
                            {/* Trip Info Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="bg-slate-900 p-4 text-white">
                                    <h3 className="font-bold text-lg">Order Summary</h3>
                                </div>
                                <div className="p-4 space-y-4">
                                    {/* Route */}
                                    <div className="flex gap-3 items-start">
                                        <div className="mt-1 flex flex-col items-center">
                                            <div className="w-2 h-2 rounded-full bg-slate-300" />
                                            <div className="w-0.5 h-8 bg-slate-200 my-1" />
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                        </div>
                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-xs text-slate-400 uppercase font-bold">Origin</p>
                                                <p className="font-semibold text-slate-800">{trip.route?.origin || "Kampala"}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 uppercase font-bold">Destination</p>
                                                <p className="font-semibold text-slate-800">{trip.route?.destination || "Gulu"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-100 pt-4 space-y-3">
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            {new Date(trip.departureDate || trip.date).toDateString()}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <Clock className="w-4 h-4 text-slate-400" />
                                            {trip.departureTime || trip.departure_time}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <UserIcon className="w-4 h-4 text-slate-400" />
                                            {bookingType === 'parcel' ? 'Parcel Delivery' : `${selectedSeats.length} Passenger(s)`}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                                <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase">Payment Details</h4>
                                <div className="space-y-2 text-sm mb-4">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Seat Fare (x{selectedSeats.length})</span>
                                        <span>UGX {seatTotal.toLocaleString()}</span>
                                    </div>
                                    {luggageCost > 0 && (
                                        <div className="flex justify-between text-slate-600">
                                            <span>Luggage / Parcel</span>
                                            <span>UGX {luggageCost.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-slate-600">
                                        <span>Tax & Fees</span>
                                        <span>UGX 0</span>
                                    </div>
                                </div>
                                <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                                    <span className="font-bold text-slate-800">Total</span>
                                    <span className="font-bold text-xl text-primary">UGX {totalAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="bg-blue-50 rounded-xl p-4 flex gap-3 items-start">
                                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5">
                                    <Check className="w-3 h-3" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-blue-800 mb-1">Free Cancellation</p>
                                    <p className="text-xs text-blue-600 leading-relaxed">Cancel up to 24 hours before departure for a full refund.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}










