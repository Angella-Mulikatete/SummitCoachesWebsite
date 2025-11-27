"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, ChevronRight } from 'lucide-react'
import { Trip } from '../../types'

interface TripCardProps {
  trip: Trip
}

export function TripCard({ trip }: TripCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
    >
      <div className="relative h-56 overflow-hidden">
        <Image 
          src={trip.image} 
          alt={trip.title} 
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 uppercase tracking-wide">
          {trip.availableSeats} seats left
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
          <MapPin className="h-4 w-4" /> {trip.destination}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{trip.title}</h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{trip.description}</p>
        
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Per person</span>
            <span className="text-lg font-bold text-slate-900">${trip.price}</span>
          </div>
          <Link 
            href={`/trips/${trip.id}`} 
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium group-hover:bg-primary transition-colors"
          >
            Details <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}