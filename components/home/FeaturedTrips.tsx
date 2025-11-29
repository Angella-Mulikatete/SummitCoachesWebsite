'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const sampleTrips = [
  {
    id: '1',
    title: 'Coastal Paradise Escape',
    destination: 'California Coast',
    duration: '5 Days',
    price: 899,
    imageUrl: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800',
    availableSeats: 12,
    departureDate: '2024-06-15',
  },
  {
    id: '2',
    title: 'Mountain Adventure',
    destination: 'Rocky Mountains',
    duration: '7 Days',
    price: 1299,
    imageUrl: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=800',
    availableSeats: 8,
    departureDate: '2024-07-01',
  },
  {
    id: '3',
    title: 'Historic Cities Tour',
    destination: 'East Coast',
    duration: '6 Days',
    price: 1099,
    imageUrl: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800',
    availableSeats: 15,
    departureDate: '2024-06-22',
  },
];

export default function FeaturedTrips() {
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
          {sampleTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                  <span className="text-[#0ea5e9] font-bold">${trip.price}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#1e293b] mb-2 group-hover:text-[#0ea5e9] transition-colors">
                  {trip.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-[#475569]">
                    <MapPin className="h-4 w-4 mr-2 text-[#0ea5e9]" />
                    <span className="text-sm">{trip.destination}</span>
                  </div>
                  <div className="flex items-center text-[#475569]">
                    <Calendar className="h-4 w-4 mr-2 text-[#0ea5e9]" />
                    <span className="text-sm">{trip.duration}</span>
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
