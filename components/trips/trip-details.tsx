"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Calendar,
    Clock,
    MapPin,
    Users,
    Bus,
    ChevronRight,
    Tag,
    Info,
    ShieldCheck,
    Wifi
} from 'lucide-react'

import { useRouteFares, useTripSeats, useTrip } from '@/lib/hooks'
import { Seat } from '@/lib/types'
import SeatSelector from '@/components/booking/seat-selector'

interface TripDetailsProps {
    tripId: string | number
}

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function TripDetails({ tripId }: TripDetailsProps) {
    const { trip, isLoading: tripLoading } = useTrip(tripId)
    const { seats, isLoading: seatsLoading } = useTripSeats(tripId)
    const routeId = trip?.route?.id || trip?.route_id || ''
    const { fares, isLoading: faresLoading } = useRouteFares(routeId)

    // Helper to calculate seat stats
    const totalSeats = seats?.length || 0
    // Use trip.availableSeats as primary source, fallback to counting available seats in array
    const availableSeatsCount = trip?.availableSeats || (seats?.filter((s: Seat) => s.status === 'available').length || 0)

    // View-only selection state
    const [viewOnlySelected, setViewOnlySelected] = useState<number[]>([])

    // SMART FARE LOGIC (Ported from TripCard)
    let tripFare = null;

    if (fares.length > 0) {
        // Try to match by bus_type_name or bus_type.name
        tripFare = fares.find((f: any) => {
            const fareBusType = f.bus_type_name || f.bus_type?.name
            const tripBusType = trip?.bus?.type
            return fareBusType === tripBusType
        })

        // Fallback: use standard fare or first fare
        if (!tripFare) {
            tripFare = fares.find((f: any) => f.fare_type === 'standard') || fares[0]
        }
    }

    // Handle different price field names
    const displayPrice = tripFare?.base_amount
        || tripFare?.amount
        || tripFare?.fare_amount
        || trip?.price
        || trip?.fare
        || 0

    if (tripLoading) return <TripDetailsSkeleton />

    if (!trip) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-slate-50">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-slate-800">Trip Not Found</h2>
                    <p className="text-slate-500">The trip you are looking for is unavailable or has expired.</p>
                    <Link href="/trips" className="inline-flex items-center text-primary font-semibold hover:underline">
                        Return to Trips <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* --- HERO BANNER --- */}
            <div className="relative h-[400px] w-full overflow-hidden bg-slate-900">
                <Image
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop"
                    alt="Trip Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                                {trip.bus?.type || 'Standard Coach'}
                            </span>
                            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1">
                                <Wifi className="w-3 h-3" /> WiFi Enabled
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight drop-shadow-lg">
                            {trip.route?.origin || 'Kampala'} <span className="text-slate-400 mx-2 font-thin">/</span> {trip.route?.destination || 'Destination'}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-slate-200 text-lg font-medium">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                {new Date(trip.departureDate || trip.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary" />
                                {trip.departureTime}
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-primary" />
                                {availableSeatsCount} seats left
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* --- CONTENT GRID --- */}
            <div className="container mx-auto px-4 -mt-8 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid lg:grid-cols-3 gap-8"
                >

                    {/* LEFT: SEAT MAP */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">Select Your Seats</h2>
                                    <p className="text-slate-500 text-sm mt-1">Click seats to preview details</p>
                                </div>
                                <div className="hidden md:flex gap-4 text-xs font-medium">
                                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border-2 border-slate-300 rounded-sm"></div> Available</div>
                                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-200 border-2 border-slate-300 rounded-sm"></div> Taken</div>
                                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-sm"></div> Selected</div>
                                </div>
                            </div>

                            <div className="p-8 bg-slate-50/50 min-h-[500px] flex justify-center">
                                <div className="max-w-md w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    {/* Driver Area Indicator */}
                                    <div className="flex justify-end mb-8 border-b border-dashed border-slate-200 pb-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Driver</span>
                                        </div>
                                    </div>

                                    <SeatSelector
                                        tripId={tripId}
                                        selectedSeats={viewOnlySelected}
                                        onSeatSelect={(id) => {
                                            if (viewOnlySelected.includes(id)) {
                                                setViewOnlySelected(prev => prev.filter(s => s !== id))
                                            } else {
                                                setViewOnlySelected(prev => [...prev, id])
                                            }
                                        }}
                                        maxSeats={10}
                                        totalCapacity={trip.bus?.capacity}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Trip Info Additional */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-green-500" />
                                Trip Policies
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-600">
                                <ul className="space-y-3 list-disc pl-4">
                                    <li>Refundable up to 24 hours before departure</li>
                                    <li>2 checked bags included per passenger</li>
                                    <li>Carry-on bag must fit in overhead bin</li>
                                </ul>
                                <ul className="space-y-3 list-disc pl-4">
                                    <li>Children under 2 travel free on lap</li>
                                    <li>Pets allowed in carriers only</li>
                                    <li>Please arrive 30 mins before departure</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: STICKY SIDEBAR */}
                    <motion.div variants={itemVariants} className="space-y-6">

                        {/* Summary / Price Card */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-slate-800">Trip Summary</h3>
                                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                    Confirmed
                                </div>
                            </div>

                            {/* Price Display */}
                            <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-slate-500 text-sm font-medium">Starting from</span>
                                    <span className="text-3xl font-black text-primary">
                                        {displayPrice && Number(displayPrice) > 0
                                            ? `UGX ${Number(displayPrice).toLocaleString()}`
                                            : <span className="text-lg text-slate-400">Select seats</span>
                                        }
                                    </span>
                                </div>
                                <div className="text-right text-xs text-slate-400">per person</div>
                            </div>

                            {/* Fares Breakdown */}
                            <div className="space-y-3 mb-6">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Available Fare Classes</p>
                                {faresLoading ? (
                                    <div className="space-y-2">
                                        {[1, 2].map(i => <div key={i} className="h-10 bg-slate-100 rounded-lg animate-pulse" />)}
                                    </div>
                                ) : (
                                    fares.map((fare: any, idx: number) => (
                                        <div key={idx} className="flex justify-between items-center text-sm p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-default">
                                            <span className="font-medium text-slate-700 capitalize flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-slate-300" />
                                                {fare.bus_type_name || fare.fare_type || 'Standard'}
                                            </span>
                                            <span className="font-bold text-slate-900">
                                                {Number(fare.base_amount || fare.amount).toLocaleString()}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* CTA Button */}
                            <Link href={`/booking/${trip.id}`} className="block w-full">
                                <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group">
                                    Book Now
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>

                            <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 leading-tight">
                                <Info className="w-4 h-4 flex-shrink-0 text-slate-400" />
                                Prices may vary based on seat selection and additional luggage options.
                            </div>
                        </div>

                        {/* Help Widget */}
                        <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
                            <h4 className="font-bold text-primary mb-2">Need Help?</h4>
                            <p className="text-sm text-slate-600 mb-4">Contact our support team for assistance with booking.</p>
                            <button className="text-sm font-bold text-primary hover:underline">Contact Support</button>
                        </div>

                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

function TripDetailsSkeleton() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="h-[400px] bg-slate-200 animate-pulse relative">
                <div className="absolute bottom-12 left-0 container mx-auto px-4">
                    <div className="h-8 w-32 bg-slate-300 rounded-full mb-4" />
                    <div className="h-16 w-3/4 bg-slate-300 rounded-xl mb-4" />
                    <div className="flex gap-4">
                        <div className="h-8 w-40 bg-slate-300 rounded-lg" />
                        <div className="h-8 w-40 bg-slate-300 rounded-lg" />
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 -mt-8 relative z-10 grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 h-[600px] bg-white rounded-3xl shadow-sm border border-slate-100" />
                <div className="h-[400px] bg-white rounded-3xl shadow-sm border border-slate-100" />
            </div>
        </div>
    )
}
