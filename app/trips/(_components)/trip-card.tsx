"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, ChevronRight, Clock, Calendar } from 'lucide-react'
import { Trip } from '@/lib/types'
import { useRouteFares } from '@/lib/hooks'

interface TripCardProps {
  trip: Trip
}

export function TripCard({ trip }: TripCardProps) {
  // ✅ Get route ID with fallback
  const routeId = trip.route?.id || trip.route_id || ''
  
  // Fetch fares for this trip's route
  const { fares, isLoading: faresLoading } = useRouteFares(routeId)

  console.log('🚌 Trip details:', {
    tripId: trip.id,
    routeId,
    busType: trip.bus?.type,
  });

  console.log('🎫 Available fares:', fares);

  // ✅ Find the fare that matches this trip
  // Since your API response shows fares might not have bus_type info,
  // we'll use the first available fare or check for matching fare_type
  let tripFare = null;
  
  if (fares.length > 0) {
    // Try to match by bus_type_name or bus_type.name
    tripFare = fares.find((f: any) => {
      const fareBusType = f.bus_type_name || f.bus_type?.name
      const tripBusType = trip.bus?.type
      return fareBusType === tripBusType
    })
    
    // Fallback: use standard fare or first fare
    if (!tripFare) {
      tripFare = fares.find((f: any) => f.fare_type === 'standard') || fares[0]
    }
  }
  
  // ✅ Handle different price field names
  const displayPrice = tripFare?.base_amount 
    || tripFare?.amount 
    || tripFare?.fare_amount
    || trip.price 
    || trip.fare 
    || 0

  console.log('💰 Price calculation:', {
    tripFare,
    displayPrice,
    rawPrice: displayPrice
  });

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
        
        {/* Bus Type Badge */}
        {trip.bus?.type && (
          <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wide">
            {trip.bus.type}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
          <MapPin className="h-4 w-4" /> 
          {trip.route?.origin || 'Origin'} → {trip.route?.destination || trip.destination}
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2">{trip.title}</h3>
        
        {/* Trip Time Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            {new Date(trip.departureDate || trip.date).toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            Departs: {trip.departureTime}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs text-slate-400 block">Starting from</span>
              <span className="text-2xl font-bold text-slate-900">
                {faresLoading ? (
                  <span className="text-sm text-slate-400">Loading...</span>
                ) : displayPrice && Number(displayPrice) > 0 ? (
                  `UGX ${Number(displayPrice).toLocaleString()}`
                ) : (
                  <span className="text-sm text-slate-600">Price on request</span>
                )}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link
              href={`/trips/${trip.id}`}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              View Details <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/booking/${trip.id}`}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}








// "use client"

// import Link from 'next/link'
// import Image from 'next/image'
// import { motion } from 'framer-motion'
// import { MapPin, ChevronRight } from 'lucide-react'
// import { Trip } from '@/lib/types'

// interface TripCardProps {
//   trip: Trip
// }

// export function TripCard({ trip }: TripCardProps) {
//   return (
//     <motion.div
//       whileHover={{ y: -5 }}
//       className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
//     >
//       <div className="relative h-56 overflow-hidden">
//         <Image
//           src={trip.image}
//           alt={trip.title}
//           fill
//           className="object-cover transform group-hover:scale-110 transition-transform duration-700"
//         />
//         <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 uppercase tracking-wide">
//           {trip.availableSeats} seats left
//         </div>
//       </div>

//       <div className="p-6 flex flex-col flex-1">
//         <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
//           <MapPin className="h-4 w-4" /> {trip.destination}
//         </div>
//         <h3 className="text-xl font-bold text-slate-900 mb-2">{trip.title}</h3>
//         <p className="text-slate-500 text-sm mb-4 line-clamp-2">{trip.description}</p>

//         <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
//           <div>
//             <span className="text-xs text-slate-400 block">Per person</span>
//             <span className="text-lg font-bold text-slate-900">${trip.price}</span>
//           </div>
//           <Link
//             href={`/trips/${trip.id}`}
//             className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium group-hover:bg-primary transition-colors"
//           >
//             Details <ChevronRight className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   )
// }