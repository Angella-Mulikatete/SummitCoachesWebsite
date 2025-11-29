'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '@/hooks/use-api';
import { CheckCircle, Calendar, MapPin, Users, Mail, Phone, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function BookingSuccessPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const { data: bookingResponse, isLoading, error } = useBooking(id);

  const booking = useMemo(() => {
    if (!bookingResponse) return null;

    const data = bookingResponse;
    return {
      id: data.id,
      customerName: data.walkin_passenger_name || data.passenger?.user?.name || 'Customer',
      customerEmail: data.walkin_passenger_email || data.passenger?.user?.email || 'N/A',
      customerPhone: data.walkin_passenger_phone || data.passenger?.user?.phone || 'N/A',
      numberOfPassengers: data.tickets?.length || 1,
      bookingDate: data.created_at || new Date().toISOString(),
      totalPrice: data.total_amount || 0,
      // Add other fields if needed
    };
  }, [bookingResponse]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-[#0ea5e9] animate-spin" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Booking not found</h2>
          <Link href="/trips">
            <button className="text-[#0ea5e9] hover:underline">Browse trips</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-white to-[#e0f2fe] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-[#10b981] rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-16 w-16 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-[#1e293b] mb-4"
          >
            Booking Confirmed!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-[#475569] mb-8"
          >
            Your trip has been successfully booked. We&apos;ve sent a confirmation email to{' '}
            <span className="font-semibold text-[#0ea5e9]">{booking.customerEmail}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#e0f2fe] rounded-xl p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Booking Details</h2>

            <div className="space-y-4 text-left">
              <div className="flex items-start justify-between">
                <span className="text-[#475569]">Booking ID:</span>
                <span className="font-semibold text-[#1e293b]">{booking.id}</span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-[#475569]">Customer Name:</span>
                <span className="font-semibold text-[#1e293b]">{booking.customerName}</span>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-[#0ea5e9]" />
                  <span className="text-[#475569]">Email:</span>
                </div>
                <span className="font-semibold text-[#1e293b]">{booking.customerEmail}</span>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-[#0ea5e9]" />
                  <span className="text-[#475569]">Phone:</span>
                </div>
                <span className="font-semibold text-[#1e293b]">{booking.customerPhone}</span>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-[#0ea5e9]" />
                  <span className="text-[#475569]">Passengers:</span>
                </div>
                <span className="font-semibold text-[#1e293b]">{booking.numberOfPassengers}</span>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-[#0ea5e9]" />
                  <span className="text-[#475569]">Booking Date:</span>
                </div>
                <span className="font-semibold text-[#1e293b]">
                  {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className="border-t border-[#0ea5e9] pt-4 flex items-start justify-between">
                <span className="text-lg font-bold text-[#1e293b]">Total Amount:</span>
                <span className="text-2xl font-bold text-[#0ea5e9]">${booking.totalPrice}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <p className="text-[#475569]">
              A confirmation email with all the details has been sent to your email address.
              Please check your inbox and spam folder.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trips">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0ea5e9] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0284c7] transition-colors"
                >
                  Browse More Trips
                </motion.button>
              </Link>

              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#0ea5e9] px-8 py-3 rounded-lg font-semibold border-2 border-[#0ea5e9] hover:bg-[#e0f2fe] transition-colors"
                >
                  Back to Home
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
