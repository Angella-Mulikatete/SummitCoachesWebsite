'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Trip } from '@/lib/api';

interface TripCardProps {
  trip: Trip;
  index: number;
}

export default function TripCard({ trip, index }: TripCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={trip.imageUrl}
          alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
          <span className="text-[#0ea5e9] font-bold text-lg">${trip.price}</span>
        </div>

        {trip.availableSeats <= 5 && (
          <div className="absolute top-4 left-4 bg-[#ef4444] text-white px-3 py-1 rounded-full text-sm font-semibold">
            Only {trip.availableSeats} seats left!
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#1e293b] mb-3 group-hover:text-[#0ea5e9] transition-colors">
          {trip.title}
        </h3>

        <p className="text-[#475569] mb-4 line-clamp-2">
          {trip.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-[#475569]">
            <MapPin className="h-4 w-4 mr-2 text-[#0ea5e9]" />
            <span className="text-sm">{trip.destination}</span>
          </div>
          <div className="flex items-center text-[#475569]">
            <Clock className="h-4 w-4 mr-2 text-[#0ea5e9]" />
            <span className="text-sm">{trip.duration}</span>
          </div>
          <div className="flex items-center text-[#475569]">
            <Calendar className="h-4 w-4 mr-2 text-[#0ea5e9]" />
            <span className="text-sm">
              {new Date(trip.departureDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center text-[#475569]">
            <Users className="h-4 w-4 mr-2 text-[#0ea5e9]" />
            <span className="text-sm">{trip.availableSeats} seats available</span>
          </div>
        </div>

        <Link href={`/trips/${trip.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#0ea5e9] text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-[#0284c7] transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
