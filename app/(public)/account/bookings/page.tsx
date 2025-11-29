'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, DollarSign, Loader2, AlertCircle } from 'lucide-react';
import { authStorage } from '@/lib/auth';
import { useBookings } from '@/hooks/use-api';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function MyBookingsPage() {
    const router = useRouter();
    const { data: bookingsData, isLoading, error } = useBookings();

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!authStorage.isAuthenticated()) {
            router.push('/auth/login?returnUrl=/account/bookings');
        }
    }, [router]);

    // Don't render anything if not authenticated
    if (!authStorage.isAuthenticated()) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] to-white pt-24 px-4">
                <div className="max-w-4xl mx-auto flex items-center justify-center py-20">
                    <Loader2 className="h-12 w-12 text-[#0ea5e9] animate-spin" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] to-white pt-24 px-4">
                <div className="max-w-4xl mx-auto">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Failed to load bookings. Please try again later.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        );
    }

    const bookings = bookingsData?.data || [];

    const getStatusBadgeVariant = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return 'default';
            case 'pending':
                return 'secondary';
            case 'cancelled':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] to-white pt-24 px-4 pb-12">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-[#1e293b] mb-2">My Bookings</h1>
                    <p className="text-[#475569]">View and manage your trip reservations</p>
                </motion.div>

                {bookings.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card>
                            <CardContent className="py-12 text-center">
                                <Calendar className="h-16 w-16 text-[#cbd5e1] mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-[#1e293b] mb-2">
                                    No bookings yet
                                </h3>
                                <p className="text-[#475569] mb-6">
                                    You haven't made any reservations. Start exploring trips!
                                </p>
                                <a
                                    href="/trips"
                                    className="inline-block bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Browse Trips
                                </a>
                            </CardContent>
                        </Card>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking: any, index: number) => (
                            <motion.div
                                key={booking.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="hover:shadow-lg transition-shadow">
                                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                        <div>
                                            <CardTitle className="text-xl text-[#1e293b]">
                                                {booking.trip?.route?.name || 'Bus Trip'}
                                            </CardTitle>
                                            <CardDescription>
                                                Booking #{booking.reference_number || booking.id}
                                            </CardDescription>
                                        </div>
                                        <Badge variant={getStatusBadgeVariant(booking.status)}>
                                            {booking.status}
                                        </Badge>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="h-5 w-5 text-[#0ea5e9] mt-0.5" />
                                                    <div>
                                                        <p className="text-sm font-medium text-[#1e293b]">Route</p>
                                                        <p className="text-sm text-[#475569]">
                                                            {booking.origin || booking.trip?.route?.origin} →{' '}
                                                            {booking.destination || booking.trip?.route?.destination}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-2">
                                                    <Calendar className="h-5 w-5 text-[#0ea5e9] mt-0.5" />
                                                    <div>
                                                        <p className="text-sm font-medium text-[#1e293b]">Travel Date</p>
                                                        <p className="text-sm text-[#475569]">
                                                            {booking.trip_date || booking.trip?.trip_date}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex items-start gap-2">
                                                    <Clock className="h-5 w-5 text-[#0ea5e9] mt-0.5" />
                                                    <div>
                                                        <p className="text-sm font-medium text-[#1e293b]">Departure Time</p>
                                                        <p className="text-sm text-[#475569]">
                                                            {booking.departure_time || booking.trip?.departure_time}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-2">
                                                    <DollarSign className="h-5 w-5 text-[#0ea5e9] mt-0.5" />
                                                    <div>
                                                        <p className="text-sm font-medium text-[#1e293b]">Total Amount</p>
                                                        <p className="text-sm text-[#475569]">
                                                            ${booking.total_amount || 0}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <p className="text-xs text-[#475569]">
                                                Booked on {new Date(booking.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
