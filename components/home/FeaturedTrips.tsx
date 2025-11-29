'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useTrips } from '@/hooks/use-api';

export default function FeaturedTrips() {
  const { data: tripsData, isLoading, error } = useTrips();

  // Handle the paginated response structure
  const trips = (tripsData?.data?.data || []).slice(0, 3);
  console.log("trips", trips);

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader2 className="h-12 w-12 text-[#0ea5e9] animate-spin mx-auto" />
          <p className="mt-4 text-slate-500">Loading featured trips...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return null; // Hide section on error
  }

  if (trips.length === 0) {
    return null; // Hide section if no trips
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-4">
            Featured Trips
          </h2>
          <p className="text-xl text-[#475569] max-w-2xl mx-auto">
            Discover our handpicked selection of unforgettable journeys
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip: any, index: number) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                {trip.image_url ? (
                  <img
                    src={trip.image_url}
                    alt={trip.title || trip.route?.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-200">
                    <span className="text-slate-400 text-4xl">🚌</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                  <span className="text-[#0ea5e9] font-bold">
                    ${trip.fare || trip.price || 0}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#1e293b] mb-2 group-hover:text-[#0ea5e9] transition-colors line-clamp-1">
                  {trip.title || trip.route?.name || 'Bus Trip'}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-[#475569]">
                    <MapPin className="h-4 w-4 mr-2 text-[#0ea5e9]" />
                    <span className="text-sm line-clamp-1">
                      {trip.origin || trip.route?.origin} → {trip.destination || trip.route?.destination}
                    </span>
                  </div>
                  <div className="flex items-center text-[#475569]">
                    <Calendar className="h-4 w-4 mr-2 text-[#0ea5e9]" />
                    <span className="text-sm">
                      {trip.trip_date} • {trip.departure_time}
                    </span>
                  </div>
                  <div className="flex items-center text-[#475569]">
                    <Users className="h-4 w-4 mr-2 text-[#0ea5e9]" />
                    <span className="text-sm">{trip.available_seats} seats available</span>
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
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/trips">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#0ea5e9] px-8 py-4 rounded-lg font-semibold border-2 border-[#0ea5e9] hover:bg-[#e0f2fe] transition-colors"
            >
              View All Trips
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
