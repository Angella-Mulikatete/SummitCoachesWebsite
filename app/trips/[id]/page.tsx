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
  CheckCircle,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

export default function TripDetailPage({ params }: { params: { id: string } }) {
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
      alert('Booking failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-[#0ea5e9] animate-spin" />
      </div>
    );
  }

  if (!trip) {
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

            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Description</h2>
              <p className="text-[#475569] leading-relaxed">{trip.description}</p>
            </div>

            {trip.highlights && trip.highlights.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Highlights</h2>
                <ul className="space-y-2">
                  {trip.highlights.map((highlight, index) => (
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
                  {trip.included.map((item, index) => (
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
            <BookingForm trip={trip} onSubmit={handleBooking} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
