"use client"

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import {
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  BusFront,
  Wifi,
  Armchair
} from 'lucide-react'

export function HeroSection() {
  const [tripType, setTripType] = useState('one-way')

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
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop"
          alt="Scenic Bus Route"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay using your theme colors - fades from Navy to transparent */}
        <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left mb-12"
        >
          {/* Badge */}
          {/* <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-medium text-white/90 tracking-wide uppercase">New Routes Available</span>
          </motion.div> */}

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

            {/* From */}
            <div className={`${tripType === 'round-trip' ? 'lg:col-span-2' : 'lg:col-span-3'} relative group transition-all duration-300`}>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1 ml-1">From</label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 group-focus-within:border-primary group-focus-within:ring-2 group-focus-within:ring-primary/20 transition-all">
                <MapPin className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Departure City"
                  className="bg-transparent border-none outline-none w-full text-slate-800 placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            {/* To */}
            <div className={`${tripType === 'round-trip' ? 'lg:col-span-2' : 'lg:col-span-3'} relative group transition-all duration-300`}>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1 ml-1">To</label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 group-focus-within:border-primary group-focus-within:ring-2 group-focus-within:ring-primary/20 transition-all">
                <MapPin className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Destination City"
                  className="bg-transparent border-none outline-none w-full text-slate-800 placeholder:text-slate-400 font-medium"
                />
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
                <select className="bg-transparent border-none outline-none w-full text-slate-800 font-medium cursor-pointer">
                  <option>1 Passenger</option>
                  <option>2 Passengers</option>
                  <option>3+ Passengers</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-2 h-full flex items-end">
              <button className="w-full h-[52px] bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group">
                Search
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


