"use client"

import Link from "next/link"
import { ArrowRight, AlertCircle, Map, BusFront } from "lucide-react"
import { TripCard } from "./trip-card"
import { useTrips } from "@/lib/hooks"
import { motion } from "framer-motion"

export function TripGrid() {
  const { trips, isLoading, isError } = useTrips({ featured: true, limit: 6 })

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-2 block">
              Destinations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
              Popular Featured Trips
            </h2>
            <p className="text-slate-500 text-lg">
              Explore our travelers' favorite routes and book your next adventure.
            </p>
          </motion.div>

          <Link
            href="/trips"
            className="hidden md:flex group items-center text-primary font-semibold hover:text-primary-hover transition-colors bg-white px-6 py-3 rounded-full shadow-sm border border-slate-100 hover:shadow-md"
          >
            View all trips
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Content Area */}
        {isError ? (
          <div className="rounded-2xl bg-red-50 border border-red-100 p-12 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-secondary mb-2">Unable to load trips</h3>
            <p className="text-slate-500 mb-6">We encountered a temporary issue fetching the schedule.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 text-secondary"
            >
              Try Again
            </button>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <TripCardSkeleton key={n} />
            ))}
          </div>
        ) : trips.length === 0 ? (
          <div className="rounded-2xl bg-white border border-slate-100 p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <BusFront className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-2">No trips found</h3>
            <p className="text-slate-500">Check back later for upcoming schedules.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {trips.slice(0, 3).map((trip) => (
              <motion.div key={trip.id} variants={itemVariants}>
                <TripCard trip={trip} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Mobile View All Button (Bottom) */}
        <div className="mt-10 md:hidden">
          <Link
            href="/trips"
            className="flex items-center justify-center w-full bg-white border border-slate-200 text-secondary font-semibold py-4 rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
          >
            View all trips <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// Custom Skeleton Component for smoother loading visuals
function TripCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
      {/* Image Placeholder */}
      <div className="h-48 bg-slate-100 rounded-xl mb-4 animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 translate-x-[-100%] animate-shimmer" />
      </div>

      {/* Content Placeholders */}
      <div className="space-y-3 px-1">
        <div className="flex justify-between items-start">
          <div className="h-6 bg-slate-100 rounded w-2/3 animate-pulse" />
          <div className="h-6 bg-slate-100 rounded w-16 animate-pulse" />
        </div>
        <div className="h-4 bg-slate-100 rounded w-1/2 animate-pulse" />

        <div className="pt-4 mt-4 border-t border-slate-50 flex justify-between items-center">
          <div className="h-8 bg-slate-100 rounded w-24 animate-pulse" />
          <div className="h-10 bg-slate-100 rounded-lg w-28 animate-pulse" />
        </div>
      </div>
    </div>
  )
}