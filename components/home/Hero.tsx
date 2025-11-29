'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Users } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#e0f2fe] via-white to-[#e0f2fe]">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0ea5e9] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0284c7] rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1e293b] leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Journey Beyond
              <span className="block text-[#0ea5e9]">Boundaries</span>
            </motion.h1>

            <motion.p
              className="text-xl text-[#475569] mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Experience the world in comfort with Summit Coaches. Premium travel experiences,
              unforgettable destinations, and memories that last a lifetime.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/trips">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0ea5e9] text-white px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 hover:bg-[#0284c7] transition-colors shadow-lg shadow-[#0ea5e9]/30"
                >
                  <span>Explore Trips</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>

              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#0ea5e9] px-8 py-4 rounded-lg font-semibold border-2 border-[#0ea5e9] hover:bg-[#e0f2fe] transition-colors"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-6 mt-12"
            >
              <div className="text-center">
                <MapPin className="h-8 w-8 text-[#0ea5e9] mx-auto mb-2" />
                <p className="text-2xl font-bold text-[#1e293b]">50+</p>
                <p className="text-sm text-[#475569]">Destinations</p>
              </div>
              <div className="text-center">
                <Calendar className="h-8 w-8 text-[#0ea5e9] mx-auto mb-2" />
                <p className="text-2xl font-bold text-[#1e293b]">200+</p>
                <p className="text-sm text-[#475569]">Trips/Year</p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-[#0ea5e9] mx-auto mb-2" />
                <p className="text-2xl font-bold text-[#1e293b]">10K+</p>
                <p className="text-sm text-[#475569]">Happy Travelers</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[600px]">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-0 w-80 h-80 bg-[#0ea5e9] rounded-3xl shadow-2xl overflow-hidden"
              >
                <img
                  src="https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Travel destination"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-3xl shadow-2xl overflow-hidden"
              >
                <img
                  src="https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Coach travel"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-dashed border-[#0ea5e9]/30 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-[#0ea5e9] rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{
              y: [0, 16, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 bg-[#0ea5e9] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
