'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { tripApi, bookingApi, type Trip, type CreateBookingData } from '@/lib/api';
import BookingForm from '@/components/booking/BookingForm';
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    Loader2,
    ArrowLeft,
    CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function BookingPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [trip, setTrip] = useState<Trip | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTrip();
    }, [params.id]);

    const loadTrip = async () => {
        try {
            const data = await tripApi.getTripById(params.id);
            setTrip(data);
        } catch (error) {
            console.error('Failed to load trip:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async (data: CreateBookingData) => {
        try {
            const booking = await bookingApi.createBooking(data);
            router.push(`/booking/${booking.id}/success`);
        } catch (error) {
            console.error('Booking failed:', error);
            throw error; // Re-throw to let BookingForm handle the error
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f2fe] via-white to-[#e0f2fe]">
                <Loader2 className="h-12 w-12 text-[#0ea5e9] animate-spin" />
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f2fe] via-white to-[#e0f2fe]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Trip not found</h2>
                    <Link href="/trips">
                        <button className="text-[#0ea5e9] hover:underline">Back to trips</button>
                    </Link>
                </div>
            </div>
        );
    }

    const isLowAvailability = trip.availableSeats <= 5;
    const isSoldOut = trip.availableSeats === 0;

    if (isSoldOut) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-white to-[#e0f2fe] py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="text-center py-12">
                        <CardContent>
                            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="h-12 w-12 text-red-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-[#1e293b] mb-4">Trip Sold Out</h1>
                            <p className="text-lg text-[#475569] mb-8">
                                Unfortunately, this trip is fully booked. Please check out our other available trips.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Link href={`/trips/${trip.id}`}>
                                    <button className="px-6 py-3 border-2 border-[#0ea5e9] text-[#0ea5e9] rounded-lg font-semibold hover:bg-[#e0f2fe] transition-colors">
                                        View Trip Details
                                    </button>
                                </Link>
                                <Link href="/trips">
                                    <button className="px-6 py-3 bg-[#0ea5e9] text-white rounded-lg font-semibold hover:bg-[#0284c7] transition-colors">
                                        Browse Other Trips
                                    </button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-white to-[#e0f2fe] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href={`/trips/${trip.id}`}>
                    <motion.button
                        whileHover={{ x: -5 }}
                        className="flex items-center space-x-2 text-[#0ea5e9] mb-6 hover:text-[#0284c7]"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span>Back to Trip Details</span>
                    </motion.button>
                </Link>

                <div className="mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-2"
                    >
                        Book Your Trip
                    </motion.h1>
                    <p className="text-lg text-[#475569]">
                        Complete the form below to reserve your spot
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Trip Summary Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:order-1"
                    >
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle className="text-2xl">Trip Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Trip Image */}
                                <div className="relative h-48 rounded-lg overflow-hidden">
                                    <img
                                        src={trip.imageUrl}
                                        alt={trip.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {isLowAvailability && (
                                        <div className="absolute top-3 left-3">
                                            <Badge variant="destructive" className="font-semibold">
                                                Only {trip.availableSeats} seats left!
                                            </Badge>
                                        </div>
                                    )}
                                </div>

                                {/* Trip Details */}
                                <div>
                                    <h2 className="text-2xl font-bold text-[#1e293b] mb-4">
                                        {trip.title}
                                    </h2>

                                    <div className="space-y-3">
                                        <div className="flex items-center text-[#475569]">
                                            <MapPin className="h-5 w-5 mr-3 text-[#0ea5e9] flex-shrink-0" />
                                            <div>
                                                <span className="text-sm text-[#64748b]">Destination</span>
                                                <p className="font-medium text-[#1e293b]">{trip.destination}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center text-[#475569]">
                                            <Clock className="h-5 w-5 mr-3 text-[#0ea5e9] flex-shrink-0" />
                                            <div>
                                                <span className="text-sm text-[#64748b]">Duration</span>
                                                <p className="font-medium text-[#1e293b]">{trip.duration}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center text-[#475569]">
                                            <Calendar className="h-5 w-5 mr-3 text-[#0ea5e9] flex-shrink-0" />
                                            <div>
                                                <span className="text-sm text-[#64748b]">Departure Date</span>
                                                <p className="font-medium text-[#1e293b]">
                                                    {new Date(trip.departureDate).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center text-[#475569]">
                                            <Users className="h-5 w-5 mr-3 text-[#0ea5e9] flex-shrink-0" />
                                            <div>
                                                <span className="text-sm text-[#64748b]">Available Seats</span>
                                                <p className="font-medium text-[#1e293b]">{trip.availableSeats} seats</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* What's Included */}
                                {trip.included && trip.included.length > 0 && (
                                    <div className="pt-4 border-t">
                                        <h3 className="font-semibold text-[#1e293b] mb-3">What's Included</h3>
                                        <ul className="space-y-2">
                                            {trip.included.slice(0, 5).map((item, index) => (
                                                <li key={index} className="flex items-start text-sm">
                                                    <CheckCircle className="h-4 w-4 text-[#10b981] mr-2 mt-0.5 flex-shrink-0" />
                                                    <span className="text-[#475569]">{item}</span>
                                                </li>
                                            ))}
                                            {trip.included.length > 5 && (
                                                <li className="text-sm text-[#0ea5e9] font-medium">
                                                    +{trip.included.length - 5} more
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                )}

                                {/* Price */}
                                <div className="pt-4 border-t">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#475569]">Price per person</span>
                                        <span className="text-3xl font-bold text-[#0ea5e9]">${trip.price}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Booking Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:order-2"
                    >
                        <BookingForm trip={trip} onSubmit={handleBooking} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
