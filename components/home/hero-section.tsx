"use client"

import { useState } from 'react'
import Link from 'next/link'
import { AnimatedBus } from './animated-bus'
import { motion, Variants } from 'framer-motion'
import {
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  BusFront,
  Wifi,
  Armchair,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { useRoutes, useRouteTrips } from '@/lib/hooks'
import { Route } from '@/lib/types'

export function HeroSection() {
  const [tripType, setTripType] = useState('one-way')
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState('1')
  const [searching, setSearching] = useState(false)
  const [searchTriggered, setSearchTriggered] = useState(false)

  // Fetch available routes (fetch all routes without filters)
  const { routes, isLoading: routesLoading, isError: routesError } = useRoutes()

  // Fetch trips for the selected route and date
  const { trips, isLoading: tripsLoading, route: routeDetails } = useRouteTrips(
    searchTriggered && selectedRoute ? selectedRoute.id : null as any,
    searchTriggered && departureDate ? { date: departureDate } : undefined
  )

  const handleSearch = () => {
    if (!selectedRoute || !departureDate) {
      return
    }
    setSearching(true)
    setSearchTriggered(true)
    // The useRouteTrips hook will automatically fetch when searchTriggered becomes true
    setTimeout(() => setSearching(false), 500)
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center pt-20 pb-16 overflow-hidden">
      {/* Animated 3D Bus Background */}
      <AnimatedBus />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left mb-12"
        >
          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Travel in Comfort. <br />
            Arrive in <span className="text-primary transparent-text-stroke">Style.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl lg:mx-0"
          >
            Experience the Summit standard. Premium coaches, spacious seating,
            and scenic routes across the country.
          </motion.p>

          {/* Feature Pills */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10 text-white/80">
            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Free Wi-Fi</span>
            </div>
            <div className="flex items-center gap-2">
              <Armchair className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Extra Legroom</span>
            </div>
            <div className="flex items-center gap-2">
              <BusFront className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Modern Fleet</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Search Widget Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
        >
          {/* Tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            <button
              onClick={() => setTripType('one-way')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${tripType === 'one-way'
                ? 'text-primary border-b-2 border-primary bg-white'
                : 'text-slate-500 hover:text-secondary'
                }`}
            >
              One Way
            </button>
            <button
              onClick={() => setTripType('round-trip')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${tripType === 'round-trip'
                ? 'text-primary border-b-2 border-primary bg-white'
                : 'text-slate-500 hover:text-secondary'
                }`}
            >
              Round Trip
            </button>
          </div>

          {/* Inputs Grid */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-center">

            {/* Route Selection */}
            <div className={`${tripType === 'round-trip' ? 'lg:col-span-4' : 'lg:col-span-6'} relative group transition-all duration-300`}>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1 ml-1">Route</label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 group-focus-within:border-primary group-focus-within:ring-2 group-focus-within:ring-primary/20 transition-all">
                <MapPin className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                {routesLoading ? (
                  <div className="flex items-center gap-2 text-slate-400">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Loading routes...</span>
                  </div>
                ) : routesError ? (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">Error loading routes</span>
                  </div>
                ) : (
                  <select
                    value={selectedRoute?.id || ''}
                    onChange={(e) => {
                      const route = routes.find(r => String(r.id) === e.target.value)
                      setSelectedRoute(route || null)
                      setSearchTriggered(false)
                    }}
                    className="bg-transparent border-none outline-none w-full text-slate-800 font-medium cursor-pointer"
                  >
                    <option value="">Select Route</option>
                    {routes.map((route) => (
                      <option key={route.id} value={route.id}>
                        {route.name} - UGX {Number(route.base_fare).toLocaleString()}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Departure Date */}
            <div className="lg:col-span-2 relative group">
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1 ml-1">
                {tripType === 'round-trip' ? 'Departure' : 'Date'}
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 group-focus-within:border-primary group-focus-within:ring-2 group-focus-within:ring-primary/20 transition-all">
                <Calendar className="h-5 w-5 text-slate-400 mr-3 flex-shrink-0" />
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => {
                    setDepartureDate(e.target.value)
                    setSearchTriggered(false)
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  className="bg-transparent border-none outline-none w-full text-slate-800 placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            {/* Return Date - Only for Round Trip */}
            {tripType === 'round-trip' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="lg:col-span-2 relative group"
              >
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1 ml-1">Return</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 group-focus-within:border-primary group-focus-within:ring-2 group-focus-within:ring-primary/20 transition-all">
                  <Calendar className="h-5 w-5 text-slate-400 mr-3 flex-shrink-0" />
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={departureDate || new Date().toISOString().split('T')[0]}
                    className="bg-transparent border-none outline-none w-full text-slate-800 placeholder:text-slate-400 font-medium"
                  />
                </div>
              </motion.div>
            )}

            {/* Passengers */}
            <div className="lg:col-span-2 relative group">
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1 ml-1">Passengers</label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 group-focus-within:border-primary group-focus-within:ring-2 group-focus-within:ring-primary/20 transition-all">
                <Users className="h-5 w-5 text-slate-400 mr-3 flex-shrink-0" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-slate-800 font-medium cursor-pointer"
                >
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3+ Passengers</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-2 h-full flex items-end">
              <button
                onClick={handleSearch}
                disabled={!selectedRoute || !departureDate || searching}
                className="w-full h-[52px] bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {searching || tripsLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    Search
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Search Results */}
        {searchTriggered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mt-6 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-6"
          >
            <h3 className="text-xl font-bold text-secondary mb-4">
              {routeDetails ? `Trips: ${routeDetails.name}` : 'Search Results'}
            </h3>

            {tripsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-slate-600">Finding available trips...</span>
              </div>
            ) : trips.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-slate-700 mb-2">No Trips Available</h4>
                <p className="text-slate-500">
                  There are no trips available for this route on {new Date(departureDate).toLocaleDateString()}.
                  Please try a different date.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {trips.map((trip) => (
                  <div
                    key={trip.id}
                    className="border border-slate-200 rounded-xl p-4 hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex-1 min-w-[200px]">
                        <h4 className="font-bold text-secondary mb-1">{trip.title}</h4>
                        <p className="text-sm text-slate-600">{trip.description}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-xs text-slate-500 uppercase mb-1">Departure</p>
                          <p className="font-semibold text-secondary">{trip.departureTime}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-500 uppercase mb-1">Arrival</p>
                          <p className="font-semibold text-secondary">{trip.arrivalTime}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-500 uppercase mb-1">Available Seats</p>
                          <p className="font-semibold text-green-600">{trip.availableSeats}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-500 uppercase mb-1">Fare</p>
                          <p className="font-bold text-lg text-primary">UGX {trip.price.toLocaleString()}</p>
                        </div>
                        <Link
                          href={`/booking/${trip.id}`}
                          className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-all inline-block"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}



