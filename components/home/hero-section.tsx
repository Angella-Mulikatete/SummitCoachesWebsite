"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Calendar,
  Loader2,
  AlertCircle,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useRoutes, useRouteTrips } from '@/lib/hooks'
import { Route } from '@/lib/types'

// Video scenes for the hero background
const VIDEO_SCENES = [
  { id: 1, image: '/hero-scene-1-goodbye.png', caption: 'Saying Goodbye' },
  { id: 2, image: '/hero-scene-2-boarding.png', caption: 'Final Boarding' },
  { id: 3, image: '/hero-scene-3-departure.png', caption: 'Journey Begins' },
]

export function HeroSection() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [departureDate, setDepartureDate] = useState('')
  const [currentScene, setCurrentScene] = useState(0)
  const [searching, setSearching] = useState(false)
  const [searchTriggered, setSearchTriggered] = useState(false)

  // Data fetching
  const { routes } = useRoutes()
  const { trips, isLoading: tripsLoading } = useRouteTrips(
    searchTriggered && selectedRoute ? selectedRoute.id : null as any,
    searchTriggered && departureDate ? { date: departureDate } : undefined
  )

  // Auto-cycle through video scenes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % VIDEO_SCENES.length)
    }, 6000) // Change scene every 6 seconds

    return () => clearInterval(interval)
  }, [])

  const handleSearch = () => {
    if (!selectedRoute || !departureDate) return
    setSearching(true)
    setSearchTriggered(true)
    setTimeout(() => setSearching(false), 800)
  }

  // --- Typography Animation Logic ---
  const sentence = "Your Journey Elevated"

  const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5 // Wait for page load
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    },
  }

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-slate-50">

      {/* ------------------------------------------------------- */}
      {/* 1. BACKGROUND LAYER (Z-0)                             */}
      {/* ------------------------------------------------------- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Video Sequence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${VIDEO_SCENES[currentScene].image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Lighter Gradient Overlay - only for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50/40 via-transparent to-transparent" />

        {/* Scene Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {VIDEO_SCENES.map((scene, index) => (
            <button
              key={scene.id}
              onClick={() => setCurrentScene(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === currentScene
                ? 'w-8 bg-white'
                : 'w-1.5 bg-white/40 hover:bg-white/60'
                }`}
              aria-label={`Go to ${scene.caption}`}
            />
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------- */}
      {/* 2. FOREGROUND CONTENT (Z-10)                          */}
      {/* ------------------------------------------------------- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center pt-20">

        {/* A. ANIMATED TYPOGRAPHY */}
        <div className="mb-12 text-center relative">
          <motion.h1
            variants={textContainer}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 drop-shadow-sm flex flex-wrap justify-center gap-x-4 md:gap-x-6"
          >
            {sentence.split(" ").map((word, wordIndex) => {
              const isElevated = word === "Elevated"
              return (
                <span key={wordIndex} className="flex overflow-hidden pb-4"> {/* Added overflow hidden for cleaner entry */}
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={`${word}-${charIndex}`}
                      variants={letterVariants}
                      className={`${isElevated
                        ? "text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary-hover"
                        : "text-slate-900"
                        }`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              )
            })}
          </motion.h1>

          {/* Subtle decoration */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 120, opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="h-1.5 bg-accent mx-auto rounded-full"
          />
        </div>

        {/* B. SEARCH WIDGET */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
          className="w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-slate-200/50 border border-white/50 p-3"
        >
          <div className="flex flex-col md:flex-row gap-2">

            {/* Input: Route */}
            <div className="flex-1 relative bg-white rounded-2xl p-3 pl-5 border border-slate-100 hover:border-primary/30 transition-colors group focus-within:ring-2 focus-within:ring-primary/10">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Destination</label>
              <div className="flex items-center">
                <MapPin className="text-primary w-5 h-5 mr-3 flex-shrink-0" />
                <Select
                  value={selectedRoute?.id?.toString() || ''}
                  onValueChange={(value) => {
                    const r = routes.find(r => String(r.id) === value)
                    setSelectedRoute(r || null)
                  }}
                >
                  <SelectTrigger className="bg-transparent border-none shadow-none font-bold text-slate-800 text-lg h-auto p-0 focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Choose Route" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes?.map(r => (
                      <SelectItem key={r.id} value={String(r.id)}>
                        {r.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Input: Date */}
            <div className="flex-1 relative bg-white rounded-2xl p-3 pl-5 border border-slate-100 hover:border-primary/30 transition-colors focus-within:ring-2 focus-within:ring-primary/10">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Travel Date</label>
              <div className="flex items-center">
                <Calendar className="text-slate-400 w-5 h-5 mr-3 flex-shrink-0" />
                <Input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="bg-transparent border-none shadow-none font-bold text-slate-800 text-lg h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0 uppercase placeholder-slate-300"
                />
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleSearch}
              disabled={searching || !selectedRoute || !departureDate}
              size="lg"
              className="md:w-48 bg-secondary hover:bg-secondary/90 text-white rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 h-auto p-4 md:p-6"
            >
              {searching ? (
                <Loader2 className="animate-spin w-6 h-6" />
              ) : (
                <>
                  Search <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* C. SEARCH RESULTS (Animated Dropdown) */}
        <AnimatePresence>
          {searchTriggered && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="w-full max-w-4xl overflow-hidden z-20"
            >
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 p-1">
                <div className="flex justify-between items-center p-4 pb-2">
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Available Schedule</h3>
                  <button
                    onClick={() => setSearchTriggered(false)}
                    className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase transition-colors"
                  >
                    Close
                  </button>
                </div>

                <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200">
                  {tripsLoading ? (
                    <div className="py-12 flex flex-col items-center text-slate-400">
                      <Loader2 className="animate-spin mb-3 text-primary w-8 h-8" />
                      <p className="text-sm font-medium">Looking for buses...</p>
                    </div>
                  ) : trips?.length > 0 ? (
                    <div className="space-y-2">
                      {trips.map((trip: any) => (
                        <div key={trip.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-primary/30 hover:bg-sky-50/50 transition-all group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary transition-colors">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-lg">{trip.departureTime}</p>
                              <p className="text-xs text-slate-500 font-medium">{trip.title}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary text-lg">UGX {Number(trip.price).toLocaleString()}</p>
                            <Link href={`/booking/${trip.id}`} className="text-xs font-bold text-slate-400 group-hover:text-primary uppercase tracking-wide flex items-center justify-end gap-1 mt-1">
                              Book Seat <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 flex flex-col items-center text-slate-400">
                      <AlertCircle className="w-10 h-10 mb-3 text-slate-200" />
                      <p className="font-medium">No trips available for this date.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}


// "use client"

// import { useState } from 'react'
// import Link from 'next/link'
// import { AnimatedBus } from './animated-bus'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   MapPin,
//   Calendar,
//   Loader2,
//   AlertCircle,
//   ArrowRight
// } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { Input } from '@/components/ui/input'
// import { useRoutes, useRouteTrips } from '@/lib/hooks'
// import { Route } from '@/lib/types'

// export function HeroSection() {
//   const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
//   const [departureDate, setDepartureDate] = useState('')
//   const [searching, setSearching] = useState(false)
//   const [searchTriggered, setSearchTriggered] = useState(false)

//   // Data fetching
//   const { routes } = useRoutes()
//   const { trips, isLoading: tripsLoading } = useRouteTrips(
//     searchTriggered && selectedRoute ? selectedRoute.id : null as any,
//     searchTriggered && departureDate ? { date: departureDate } : undefined
//   )

//   const handleSearch = () => {
//     if (!selectedRoute || !departureDate) return
//     setSearching(true)
//     setSearchTriggered(true)
//     setTimeout(() => setSearching(false), 800)
//   }

//   // --- Typography Animation Logic ---
//   const sentence = "Your Journey Elevated"

//   const textContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.08,
//         delayChildren: 0.5 // Wait for page load
//       }
//     }
//   }

//   const letterVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: [0.2, 0.65, 0.3, 0.9] as const,
//       },
//     },
//   }

//   return (
//     <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-slate-50">

//       {/* ------------------------------------------------------- */}
//       {/* 1. BACKGROUND LAYER (Z-0)                             */}
//       {/* ------------------------------------------------------- */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         {/* The Hub Animation */}
//         <AnimatedBus />

//         {/* Gradient Overlay: crucial for making text readable over the busy map */}
//         <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-white/60 to-white/20 backdrop-blur-[2px]" />
//       </div>

//       {/* ------------------------------------------------------- */}
//       {/* 2. FOREGROUND CONTENT (Z-10)                          */}
//       {/* ------------------------------------------------------- */}
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center pt-20">

//         {/* A. ANIMATED TYPOGRAPHY */}
//         <div className="mb-12 text-center relative">
//           <motion.h1
//             variants={textContainer}
//             initial="hidden"
//             animate="visible"
//             className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 drop-shadow-sm flex flex-wrap justify-center gap-x-4 md:gap-x-6"
//           >
//             {sentence.split(" ").map((word, wordIndex) => {
//               const isElevated = word === "Elevated"
//               return (
//                 <span key={wordIndex} className="flex overflow-hidden pb-4"> {/* Added overflow hidden for cleaner entry */}
//                   {word.split("").map((char, charIndex) => (
//                     <motion.span
//                       key={`${word}-${charIndex}`}
//                       variants={letterVariants}
//                       className={`${isElevated
//                         ? "text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary-hover"
//                         : "text-slate-900"
//                         }`}
//                     >
//                       {char}
//                     </motion.span>
//                   ))}
//                 </span>
//               )
//             })}
//           </motion.h1>

//           {/* Subtle decoration */}
//           <motion.div
//             initial={{ width: 0, opacity: 0 }}
//             animate={{ width: 120, opacity: 1 }}
//             transition={{ delay: 2, duration: 1 }}
//             className="h-1.5 bg-accent mx-auto rounded-full"
//           />
//         </div>

//         {/* B. SEARCH WIDGET */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
//           className="w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-slate-200/50 border border-white/50 p-3"
//         >
//           <div className="flex flex-col md:flex-row gap-2">

//             {/* Input: Route */}
//             <div className="flex-1 relative bg-white rounded-2xl p-3 pl-5 border border-slate-100 hover:border-primary/30 transition-colors group focus-within:ring-2 focus-within:ring-primary/10">
//               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Destination</label>
//               <div className="flex items-center">
//                 <MapPin className="text-primary w-5 h-5 mr-3 flex-shrink-0" />
//                 <Select
//                   value={selectedRoute?.id?.toString() || ''}
//                   onValueChange={(value) => {
//                     const r = routes.find(r => String(r.id) === value)
//                     setSelectedRoute(r || null)
//                   }}
//                 >
//                   <SelectTrigger className="bg-transparent border-none shadow-none font-bold text-slate-800 text-lg h-auto p-0 focus:ring-0 focus:ring-offset-0">
//                     <SelectValue placeholder="Choose Route" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {routes?.map(r => (
//                       <SelectItem key={r.id} value={String(r.id)}>
//                         {r.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Input: Date */}
//             <div className="flex-1 relative bg-white rounded-2xl p-3 pl-5 border border-slate-100 hover:border-primary/30 transition-colors focus-within:ring-2 focus-within:ring-primary/10">
//               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Travel Date</label>
//               <div className="flex items-center">
//                 <Calendar className="text-slate-400 w-5 h-5 mr-3 flex-shrink-0" />
//                 <Input
//                   type="date"
//                   value={departureDate}
//                   onChange={(e) => setDepartureDate(e.target.value)}
//                   className="bg-transparent border-none shadow-none font-bold text-slate-800 text-lg h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0 uppercase placeholder-slate-300"
//                 />
//               </div>
//             </div>

//             {/* Action Button */}
//             <Button
//               onClick={handleSearch}
//               disabled={searching || !selectedRoute || !departureDate}
//               size="lg"
//               className="md:w-48 bg-secondary hover:bg-secondary/90 text-white rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 h-auto p-4 md:p-6"
//             >
//               {searching ? (
//                 <Loader2 className="animate-spin w-6 h-6" />
//               ) : (
//                 <>
//                   Search <ArrowRight className="w-5 h-5" />
//                 </>
//               )}
//             </Button>
//           </div>
//         </motion.div>

//         {/* C. SEARCH RESULTS (Animated Dropdown) */}
//         <AnimatePresence>
//           {searchTriggered && (
//             <motion.div
//               initial={{ opacity: 0, height: 0, marginTop: 0 }}
//               animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
//               exit={{ opacity: 0, height: 0, marginTop: 0 }}
//               className="w-full max-w-4xl overflow-hidden z-20"
//             >
//               <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 p-1">
//                 <div className="flex justify-between items-center p-4 pb-2">
//                   <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Available Schedule</h3>
//                   <button
//                     onClick={() => setSearchTriggered(false)}
//                     className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase transition-colors"
//                   >
//                     Close
//                   </button>
//                 </div>

//                 <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200">
//                   {tripsLoading ? (
//                     <div className="py-12 flex flex-col items-center text-slate-400">
//                       <Loader2 className="animate-spin mb-3 text-primary w-8 h-8" />
//                       <p className="text-sm font-medium">Looking for buses...</p>
//                     </div>
//                   ) : trips?.length > 0 ? (
//                     <div className="space-y-2">
//                       {trips.map((trip: any) => (
//                         <div key={trip.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-primary/30 hover:bg-sky-50/50 transition-all group">
//                           <div className="flex items-center gap-4">
//                             <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary transition-colors">
//                               <MapPin className="w-5 h-5" />
//                             </div>
//                             <div>
//                               <p className="font-bold text-slate-800 text-lg">{trip.departureTime}</p>
//                               <p className="text-xs text-slate-500 font-medium">{trip.title}</p>
//                             </div>
//                           </div>
//                           <div className="text-right">
//                             <p className="font-bold text-primary text-lg">UGX {Number(trip.price).toLocaleString()}</p>
//                             <Link href={`/booking/${trip.id}`} className="text-xs font-bold text-slate-400 group-hover:text-primary uppercase tracking-wide flex items-center justify-end gap-1 mt-1">
//                               Book Seat <ArrowRight className="w-3 h-3" />
//                             </Link>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="py-12 flex flex-col items-center text-slate-400">
//                       <AlertCircle className="w-10 h-10 mb-3 text-slate-200" />
//                       <p className="font-medium">No trips available for this date.</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//       </div>
//     </section>
//   )
// }






