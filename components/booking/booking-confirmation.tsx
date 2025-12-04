'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Download, Home, Calendar, MapPin, Bus, User, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { Booking, Trip } from '@/lib/types'

interface BookingConfirmationProps {
    booking: Booking
    trip: Trip
}

export default function BookingConfirmation({ booking, trip }: BookingConfirmationProps) {
    return (
        <div className="max-w-2xl mx-auto text-center space-y-8">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center space-y-4"
            >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">Booking Confirmed!</h2>
                <p className="text-slate-600">
                    Your booking has been successfully created. A confirmation email has been sent to {booking.passenger?.email}.
                </p>
            </motion.div>

            {/* Ticket Card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden text-left"
            >
                {/* Header */}
                <div className="bg-primary/5 p-6 border-b border-primary/10 flex justify-between items-start">
                    <div>
                        <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">Booking Reference</p>
                        <p className="text-2xl font-bold text-primary mt-1">{booking.reference || 'PENDING'}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">Status</p>
                        <span className={`
              inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1
              ${booking.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}
            `}>
                            {booking.payment_status === 'paid' ? 'PAID' : 'PAYMENT PENDING'}
                        </span>
                    </div>
                </div>

                {/* Trip Details */}
                <div className="p-6 space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-slate-100 rounded-lg">
                            <Bus className="w-6 h-6 text-slate-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800">{trip.route?.origin} to {trip.route?.destination}</h3>
                            <p className="text-sm text-slate-500">{trip.bus?.type} Class • {trip.bus?.registrationNumber}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Calendar className="w-4 h-4" />
                                <span>Departure</span>
                            </div>
                            <p className="font-medium text-slate-800">
                                {new Date(trip.departureDate || trip.date).toLocaleDateString('en-GB', {
                                    weekday: 'short',
                                    day: 'numeric',
                                    month: 'short'
                                })}
                            </p>
                            <p className="text-sm text-slate-600">{trip.departureTime}</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <MapPin className="w-4 h-4" />
                                <span>Arrival (Est.)</span>
                            </div>
                            <p className="font-medium text-slate-800">
                                {trip.arrivalTime ? new Date(trip.departureDate || trip.date).toLocaleDateString('en-GB', {
                                    weekday: 'short',
                                    day: 'numeric',
                                    month: 'short'
                                }) : 'Same Day'}
                            </p>
                            <p className="text-sm text-slate-600">{trip.arrivalTime || '---'}</p>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <User className="w-4 h-4" />
                                <span>Passenger</span>
                            </div>
                            <p className="font-medium text-slate-800">{booking.passenger?.name}</p>
                            <p className="text-sm text-slate-600">{booking.passenger?.phone}</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <CreditCard className="w-4 h-4" />
                                <span>Payment</span>
                            </div>
                            <p className="font-medium text-slate-800">UGX {booking.grand_total.toLocaleString()}</p>
                            <p className="text-sm text-slate-600 capitalize">{booking.payment_method?.replace('_', ' ') || 'Pending'}</p>
                        </div>
                    </div>

                    {booking.ticket?.seat_number && (
                        <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center">
                            <span className="text-slate-600 font-medium">Seat Number</span>
                            <span className="text-xl font-bold text-primary">{booking.ticket.seat_number}</span>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="/"
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <Home className="w-5 h-5" />
                    Return Home
                </Link>
                <button
                    className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    onClick={() => window.print()}
                >
                    <Download className="w-5 h-5" />
                    Download Ticket
                </button>
            </div>
        </div>
    )
}
