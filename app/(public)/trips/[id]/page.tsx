'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTrip, useTripAvailability } from '@/hooks/use-api';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  CheckCircle,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Bus,
  Armchair,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function TripDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const { data: tripResponse, isLoading: isTripLoading, error: tripError } = useTrip(id);
  const { data: availabilityResponse, isLoading: isAvailabilityLoading } = useTripAvailability(id);

  const trip = useMemo(() => {
    if (!tripResponse?.data) return null;
    const data = tripResponse.data;
    return {
      id: data.id,
      title: data.title || data.route?.name || `Trip to ${data.destination || data.route?.destination}`,
      description: data.description || `Journey from ${data.origin || data.route?.origin} to ${data.destination || data.route?.destination}`,
      price: parseFloat(data.fare || data.price || '0'),
      imageUrl: data.image_url || 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800',
      destination: data.destination || data.route?.destination || 'Unknown',
      duration: data.duration || data.route?.duration_minutes ? `${Math.floor(data.route.duration_minutes / 60)}h ${data.route.duration_minutes % 60}m` : 'N/A',
      departureDate: data.trip_date,
      availableSeats: data.available_seats || 0,
      highlights: data.highlights || ['Comfortable Seating', 'Free WiFi', 'USB Charging Ports'],
      included: data.included || ['Luggage Allowance', 'Travel Insurance', 'Refreshments'],
      bus: data.bus ? {
        name: data.bus.name || 'Standard Bus',
        plateNumber: data.bus.plate_number || 'N/A',
        capacity: data.bus.capacity || 0,
        type: data.bus.bus_type?.name || 'Standard',
      } : null,
    };
  }, [tripResponse]);

  const availability = useMemo(() => {
    if (!availabilityResponse?.data) return null;
    const data = availabilityResponse.data;
    // Assuming the structure based on typical availability endpoints
    return {
      totalSeats: data.total_seats || 0,
      takenSeats: data.taken_seats || [], // Array of seat numbers
      takenCount: data.taken_count || data.taken_seats?.length || 0,
      remainingCount: data.available_count || data.available_seats || 0,
    };
  }, [availabilityResponse]);

  const isLoading = isTripLoading || isAvailabilityLoading;
  const error = tripError;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-[#0ea5e9] animate-spin" />
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-white to-[#e0f2fe] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/trips">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center space-x-2 text-[#0ea5e9] mb-6 hover:text-[#0284c7]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Trips</span>
          </motion.button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl mb-6">
              <img
                src={trip.imageUrl}
                alt={trip.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
                <span className="text-[#0ea5e9] font-bold text-xl">${trip.price}</span>
              </div>
              {isLowAvailability && !isSoldOut && (
                <div className="absolute top-4 left-4">
                  <Badge variant="destructive" className="font-semibold">
                    Only {trip.availableSeats} seats left!
                  </Badge>
                </div>
              )}
              {isSoldOut && (
                <div className="absolute top-4 left-4">
                  <Badge variant="destructive" className="font-semibold">
                    Sold Out
                  </Badge>
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-4">
              {trip.title}
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-[#475569]">
                <MapPin className="h-5 w-5 mr-2 text-[#0ea5e9]" />
                <span>{trip.destination}</span>
              </div>
              <div className="flex items-center text-[#475569]">
                <Clock className="h-5 w-5 mr-2 text-[#0ea5e9]" />
                <span>{trip.duration}</span>
              </div>
              <div className="flex items-center text-[#475569]">
                <Calendar className="h-5 w-5 mr-2 text-[#0ea5e9]" />
                <span>
                  {new Date(trip.departureDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center text-[#475569]">
                <Users className="h-5 w-5 mr-2 text-[#0ea5e9]" />
                <span>{trip.availableSeats} seats available</span>
              </div>
            </div>

            {/* Bus Details Section */}
            {trip.bus && (
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <h2 className="text-2xl font-bold text-[#1e293b] mb-4 flex items-center">
                  <Bus className="h-6 w-6 mr-2 text-[#0ea5e9]" />
                  Bus Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-[#475569] block">Bus Name</span>
                    <span className="font-semibold text-[#1e293b]">{trip.bus.name}</span>
                  </div>
                  <div>
                    <span className="text-sm text-[#475569] block">Plate Number</span>
                    <span className="font-semibold text-[#1e293b]">{trip.bus.plateNumber}</span>
                  </div>
                  <div>
                    <span className="text-sm text-[#475569] block">Type</span>
                    <span className="font-semibold text-[#1e293b]">{trip.bus.type}</span>
                  </div>
                  <div>
                    <span className="text-sm text-[#475569] block">Capacity</span>
                    <span className="font-semibold text-[#1e293b]">{trip.bus.capacity} seats</span>
                  </div>
                </div>
              </div>
            )}

            {/* Seat Availability Section */}
            {availability && (
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <h2 className="text-2xl font-bold text-[#1e293b] mb-4 flex items-center">
                  <Armchair className="h-6 w-6 mr-2 text-[#0ea5e9]" />
                  Seat Availability
                </h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-[#475569] block">Total</span>
                    <span className="text-xl font-bold text-[#1e293b]">{availability.totalSeats}</span>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm text-[#475569] block">Taken</span>
                    <span className="text-xl font-bold text-red-600">{availability.takenCount}</span>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-[#475569] block">Remaining</span>
                    <span className="text-xl font-bold text-green-600">{availability.remainingCount}</span>
                  </div>
                </div>
                {availability.takenSeats.length > 0 && (
                  <div>
                    <span className="text-sm text-[#475569] block mb-2">Taken Seat Numbers:</span>
                    <div className="flex flex-wrap gap-2">
                      {availability.takenSeats.map((seat: string | number, idx: number) => (
                        <Badge key={idx} variant="secondary" className="bg-gray-200 text-gray-700">
                          {seat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Description</h2>
              <p className="text-[#475569] leading-relaxed">{trip.description}</p>
            </div>

            {trip.highlights && trip.highlights.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Highlights</h2>
                <ul className="space-y-2">
                  {trip.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#10b981] mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-[#475569]">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {trip.included && trip.included.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-[#1e293b] mb-4">
                  What&apos;s Included
                </h2>
                <ul className="space-y-2">
                  {trip.included.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#0ea5e9] mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-[#475569]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-[#1e293b] mb-6">Ready to Book?</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-[#475569]">Price per person</span>
                  <span className="text-2xl font-bold text-[#0ea5e9]">${trip.price}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-[#475569]">Available seats</span>
                  <span className="font-semibold text-[#1e293b]">{trip.availableSeats}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-[#475569]">Departure date</span>
                  <span className="font-semibold text-[#1e293b]">
                    {new Date(trip.departureDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <Link href={`/booking/${trip.id}`} className="block">
                <Button
                  className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white py-6 text-lg"
                  disabled={isSoldOut}
                >
                  {isSoldOut ? (
                    'Sold Out'
                  ) : (
                    <>
                      <span>Book This Trip</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </Link>

              {isLowAvailability && !isSoldOut && (
                <p className="text-sm text-red-600 text-center mt-4 font-medium">
                  ⚠️ Only {trip.availableSeats} seats remaining!
                </p>
              )}

              <p className="text-xs text-[#475569] text-center mt-4">
                Secure your spot today. Free cancellation up to 48 hours before departure.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
