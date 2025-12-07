"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Calendar,
  Loader2,
  AlertCircle,
  ArrowRight,
  Filter,
  X,
  Users,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useRoutes, useRouteTrips } from "@/lib/hooks"
import { Route } from "@/lib/types"

const VIDEO_SCENES = [
  { id: 1, image: "/hero-scene-1-goodbye.png", caption: "Saying Goodbye" },
  { id: 2, image: "/hero-scene-2-boarding.png", caption: "Final Boarding" },
  { id: 3, image: "/hero-scene-3-departure.png", caption: "Journey Begins" },
]

const DATE_FILTERS = [
  { key: 'today', label: 'Today' },
  { key: 'tomorrow', label: 'Tomorrow' },
  { key: 'this_week', label: 'This Week' },
  { key: 'next_week', label: 'Next Week' },
  { key: 'weekend', label: 'This Weekend' },
  { key: 'next_7_days', label: 'Next 7 Days' },
  { key: 'next_30_days', label: 'Next 30 Days' },
]

export function HeroSection() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [departureDate, setDepartureDate] = useState("")
  const [currentScene, setCurrentScene] = useState(0)
  const [searching, setSearching] = useState(false)
  const [searchTriggered, setSearchTriggered] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Advanced filter states
  const [dateFilter, setDateFilter] = useState<string>("next_30_days")
  const [minSeats, setMinSeats] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("name")

  // Data fetching with filters
  const { routes, isLoading: routesLoading } = useRoutes({
    active: true,
    date_filter: dateFilter,
    // has_trips: true, // REMOVED: Fetch all routes to allow user selection
    min_seats: minSeats ? parseInt(minSeats) : undefined,
    search: searchQuery || undefined
  })

  const { trips, isLoading: tripsLoading } = useRouteTrips(
    searchTriggered && selectedRoute ? selectedRoute.id : null as any,
    searchTriggered && departureDate ? { date: departureDate } : undefined
  )

  // Debug logging
  useEffect(() => {
    if (selectedRoute) {
      console.log('Selected Route:', selectedRoute)
    }
    if (trips && trips.length > 0) {
      console.log('Fetched Trips:', trips)
    }
  }, [selectedRoute, trips])

  // Auto-cycle background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % VIDEO_SCENES.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Sort routes based on selected criteria
  const sortedRoutes = [...(routes || [])].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'price_low':
        return (a.base_fare || 0) - (b.base_fare || 0)
      case 'price_high':
        return (b.base_fare || 0) - (a.base_fare || 0)
      case 'popular':
        return (b.available_trips_count || 0) - (a.available_trips_count || 0)
      case 'distance':
        return (a.distance_km || 0) - (b.distance_km || 0)
      default:
        return 0
    }
  })

  const handleSearch = () => {
    if (!selectedRoute || !departureDate) return
    setSearching(true)
    setSearchTriggered(true)
    setTimeout(() => setSearching(false), 800)
  }

  const handleClearFilters = () => {
    setDateFilter("next_30_days")
    setMinSeats("")
    setSearchQuery("")
    setSortBy("name")
  }

  const hasActiveFilters = dateFilter !== "next_30_days" || minSeats !== "" || searchQuery !== ""

  // Animation Variants
  const textContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section className="relative min-h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden bg-slate-900">

      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full"
          >
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${VIDEO_SCENES[currentScene].image})` }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

        {/* Scene Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {VIDEO_SCENES.map((scene, index) => (
            <button
              key={scene.id}
              onClick={() => setCurrentScene(index)}
              className={`h-1 rounded-full transition-all duration-300 ${index === currentScene ? "w-6 bg-primary" : "w-1.5 bg-white/40"}`}
            />
          ))}
        </div>
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center pt-10">

        {/* Headline */}
        <div className="mb-10 text-center relative">
          <motion.h1
            variants={textContainer}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-xl flex flex-wrap justify-center gap-x-3"
          >
            {"Your Journey Elevated".split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="flex overflow-hidden pb-2">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${word}-${charIndex}`}
                    variants={letterVariants}
                    className={word === "Elevated" ? "text-transparent bg-clip-text bg-gradient-to-b from-sky-300 to-primary" : "text-white"}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="h-1 w-24 bg-accent mx-auto mt-2 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
          />
        </div>

        {/* SEARCH WIDGET */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-full max-w-3xl bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-black/40 border border-white/10 p-2"
        >
          {/* Main Search Row */}
          <div className="flex flex-col md:flex-row gap-2 mb-2">
            {/* Route Selection */}
            <div className="flex-1 relative bg-white rounded-xl px-3 py-2 border border-slate-200 hover:border-primary/50 transition-colors group">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Where to?</label>
              <div className="flex items-center h-8">
                <MapPin className="text-primary w-4 h-4 mr-2 flex-shrink-0" />
                <Select
                  value={selectedRoute?.id?.toString() || ""}
                  onValueChange={(value) => {
                    const r = sortedRoutes.find(r => String(r.id) === value)
                    setSelectedRoute(r || null)
                    // Auto-select date if available
                    if (r?.next_trip_date) {
                      setDepartureDate(r.next_trip_date)
                    }
                  }}
                >
                  <SelectTrigger className="bg-transparent border-none shadow-none font-bold text-slate-800 text-sm h-auto p-0 focus:ring-0">
                    <SelectValue placeholder="Select Destination" />
                  </SelectTrigger>
                  <SelectContent className="max-h-80">
                    {routesLoading ? (
                      <div className="p-4 text-center text-sm text-slate-500">
                        <Loader2 className="w-4 h-4 animate-spin mx-auto mb-2" />
                        Loading routes...
                      </div>
                    ) : sortedRoutes.length > 0 ? (
                      sortedRoutes.map(r => (
                        <SelectItem key={r.id} value={String(r.id)} className="text-sm">
                          <div className="flex flex-col">
                            <span className="font-semibold">{r.name}</span>
                            <span className="text-xs text-slate-500">
                              {r.available_trips_count || 0} trips • UGX {Number(r.min_fare || r.base_fare || 0).toLocaleString()}
                            </span>
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-slate-500">
                        No routes available
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date Selection */}
            <div className="w-full md:w-1/3 relative bg-white rounded-xl px-3 py-2 border border-slate-200 hover:border-primary/50 transition-colors">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">When?</label>
              <div className="flex items-center h-8">
                <Calendar className="text-slate-400 w-4 h-4 mr-2 flex-shrink-0" />
                <Input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="bg-transparent border-none shadow-none font-bold text-slate-800 text-sm h-auto p-0 focus-visible:ring-0 uppercase placeholder-slate-400 block"
                />
              </div>
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              disabled={searching || !selectedRoute || !departureDate}
              className="w-full md:w-32 h-auto bg-secondary hover:bg-secondary/90 text-white rounded-xl font-bold text-sm shadow-md py-0 transition-transform active:scale-95"
            >
              {searching ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <>
                  Search <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition-colors"
            >
              <Filter className="w-3.5 h-3.5" />
              Advanced Filters
              {hasActiveFilters && (
                <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-100 mt-2">
                  {/* Date Range Filter */}
                  <div className="bg-slate-50 rounded-lg px-3 py-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Date Range
                    </label>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger className="bg-white border-slate-200 text-xs h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DATE_FILTERS.map(filter => (
                          <SelectItem key={filter.key} value={filter.key} className="text-xs">
                            {filter.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Minimum Seats Filter */}
                  <div className="bg-slate-50 rounded-lg px-3 py-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Min. Available Seats
                    </label>
                    <div className="flex items-center bg-white rounded-lg border border-slate-200 px-2 h-8">
                      <Users className="w-3.5 h-3.5 text-slate-400 mr-2" />
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        placeholder="Any"
                        value={minSeats}
                        onChange={(e) => setMinSeats(e.target.value)}
                        className="bg-transparent border-none shadow-none text-xs h-auto p-0 focus-visible:ring-0"
                      />
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="bg-slate-50 rounded-lg px-3 py-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Sort By
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="bg-white border-slate-200 text-xs h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name" className="text-xs">Name (A-Z)</SelectItem>
                        <SelectItem value="price_low" className="text-xs">Price (Low to High)</SelectItem>
                        <SelectItem value="price_high" className="text-xs">Price (High to Low)</SelectItem>
                        <SelectItem value="popular" className="text-xs">Most Popular</SelectItem>
                        <SelectItem value="distance" className="text-xs">Distance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Search Query */}
                <div className="mt-3 bg-slate-50 rounded-lg px-3 py-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Search Routes
                  </label>
                  <Input
                    type="text"
                    placeholder="Search by name, origin, destination..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white border-slate-200 text-xs h-8"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* RESULTS DROPDOWN */}
        <AnimatePresence>
          {searchTriggered && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="w-full max-w-3xl overflow-hidden z-20"
            >
              <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 p-1">
                <div className="flex justify-between items-center px-4 py-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Available Schedule</h3>
                  <button onClick={() => setSearchTriggered(false)} className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase">Close</button>
                </div>

                <div className="max-h-[250px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200">
                  {tripsLoading ? (
                    <div className="py-8 flex flex-col items-center text-slate-400">
                      <Loader2 className="animate-spin mb-2 text-primary w-6 h-6" />
                      <p className="text-xs">Loading...</p>
                    </div>
                  ) : trips?.length > 0 ? (
                    <div className="space-y-2">
                      {trips.map((trip: any) => (
                        <div key={trip.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-primary/50 hover:bg-sky-50 transition-all cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                              <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm">{trip.departureTime}</p>
                              <p className="text-[10px] text-slate-500 font-medium uppercase">
                                {trip.availableSeats} seats • Summit Coaches
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary text-sm">UGX {Number(trip.price).toLocaleString()}</p>
                            <button className="text-[10px] font-bold text-slate-400 group-hover:text-primary uppercase flex items-center justify-end gap-1">
                              Book <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 flex flex-col items-center text-slate-400">
                      <AlertCircle className="w-8 h-8 mb-2 text-slate-300" />
                      <p className="text-xs">No trips found for this date.</p>
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

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   MapPin,
//   Calendar,
//   Loader2,
//   AlertCircle,
//   ArrowRight
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Input } from "@/components/ui/input"
// import { useRoutes, useRouteTrips } from "@/lib/hooks"
// import { Route } from "@/lib/types"

// // Video scenes for the hero background
// const VIDEO_SCENES = [
//   { id: 1, image: "/hero-scene-1-goodbye.png", caption: "Saying Goodbye" },
//   { id: 2, image: "/hero-scene-2-boarding.png", caption: "Final Boarding" },
//   { id: 3, image: "/hero-scene-3-departure.png", caption: "Journey Begins" },
// ]

// export function HeroSection() {
//   const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
//   const [departureDate, setDepartureDate] = useState("")
//   const [currentScene, setCurrentScene] = useState(0)
//   const [searching, setSearching] = useState(false)
//   const [searchTriggered, setSearchTriggered] = useState(false)

//   // Data fetching
//   const { routes } = useRoutes({ active: true })
//   const { trips, isLoading: tripsLoading } = useRouteTrips(
//     searchTriggered && selectedRoute ? selectedRoute.id : null as any,
//     searchTriggered && departureDate ? { date: departureDate } : undefined
//   )

//   // Auto-cycle through video scenes
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentScene((prev) => (prev + 1) % VIDEO_SCENES.length)
//     }, 6000)

//     return () => clearInterval(interval)
//   }, [])

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
//         delayChildren: 0.5
//       }
//     }
//   }

//   const letterVariants = {
//     hidden: { opacity: 0, y: 30 },
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
//     <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-slate-900">

//       {/* ------------------------------------------------------- */}
//       {/* 1. BACKGROUND LAYER (Z-0)                             */}
//       {/* ------------------------------------------------------- */}
//       <div className="absolute inset-0 z-0 pointer-events-none">

//         {/* Animated Video Sequence */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentScene}
//             initial={{ opacity: 0, scale: 1.1 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1.5, ease: "easeInOut" }}
//             className="absolute inset-0 w-full h-full"
//           >
//             <div
//               className="absolute inset-0 w-full h-full bg-cover bg-center"
//               style={{
//                 backgroundImage: `url(${VIDEO_SCENES[currentScene].image})`,
//               }}
//             />
//           </motion.div>
//         </AnimatePresence>

//         {/* --- DARK OVERLAYS FOR READABILITY --- */}

//         {/* A. Overall Dimmer (Makes images darker so text pops) */}
//         <div className="absolute inset-0 bg-black/40" />

//         {/* B. Bottom-Up Heavy Gradient (Provides solid base for text) */}
//         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

//         {/* Scene Indicators */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
//           {VIDEO_SCENES.map((scene, index) => (
//             <button
//               key={scene.id}
//               onClick={() => setCurrentScene(index)}
//               className={`h-1 rounded-full transition-all duration-300 shadow-lg ${index === currentScene
//                 ? "w-8 bg-primary shadow-primary/50"
//                 : "w-2 bg-white/30 hover:bg-white/60"
//                 }`}
//               aria-label={`Go to ${scene.caption}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* ------------------------------------------------------- */}
//       {/* 2. FOREGROUND CONTENT (Z-10)                          */}
//       {/* ------------------------------------------------------- */}
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center pt-20">

//         {/* A. ANIMATED TYPOGRAPHY */}
//         <div className="mb-16 text-center relative">
//           <motion.h1
//             variants={textContainer}
//             initial="hidden"
//             animate="visible"
//             className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white drop-shadow-2xl flex flex-wrap justify-center gap-x-4 md:gap-x-6"
//           >
//             {sentence.split(" ").map((word, wordIndex) => {
//               const isElevated = word === "Elevated"
//               return (
//                 <span key={wordIndex} className="flex overflow-hidden pb-4">
//                   {word.split("").map((char, charIndex) => (
//                     <motion.span
//                       key={`${word}-${charIndex}`}
//                       variants={letterVariants}
//                       className={`${isElevated
//                         ? "text-transparent bg-clip-text bg-gradient-to-b from-primary-light to-primary"
//                         : "text-white"
//                         }`}
//                       style={{ textShadow: isElevated ? "0 4px 12px rgba(14, 165, 233, 0.5)" : "0 2px 10px rgba(0,0,0,0.5)" }}
//                     >
//                       {char}
//                     </motion.span>
//                   ))}
//                 </span>
//               )
//             })}
//           </motion.h1>

//           {/* Decoration Line */}
//           <motion.div
//             initial={{ width: 0, opacity: 0 }}
//             animate={{ width: 140, opacity: 1 }}
//             transition={{ delay: 2, duration: 1 }}
//             className="h-1.5 bg-accent mx-auto rounded-full shadow-[0_0_15px_rgba(245,158,11,0.6)]"
//           />
//         </div>

//         {/* B. SEARCH WIDGET */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
//           className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl shadow-black/30 border border-white/20 p-3"
//         >
//           <div className="flex flex-col md:flex-row gap-2">

//             {/* Input: Route */}
//             <div className="flex-1 relative bg-white rounded-2xl p-3 pl-5 border border-slate-200 hover:border-primary/50 transition-colors group focus-within:ring-2 focus-within:ring-primary/10">
//               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Destination</label>
//               <div className="flex items-center">
//                 <MapPin className="text-primary w-5 h-5 mr-3 flex-shrink-0" />
//                 <Select
//                   value={selectedRoute?.id?.toString() || ""}
//                   onValueChange={(value) => {
//                     const r = routes.find(r => String(r.id) === value)
//                     setSelectedRoute(r || null)
//                   }}
//                 >
//                   <SelectTrigger className="bg-transparent border-none shadow-none font-bold text-slate-800 text-lg h-auto p-0 focus:ring-0 focus:ring-offset-0">
//                     <SelectValue placeholder="Where to?" />
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
//             <div className="flex-1 relative bg-white rounded-2xl p-3 pl-5 border border-slate-200 hover:border-primary/50 transition-colors focus-within:ring-2 focus-within:ring-primary/10">
//               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Travel Date</label>
//               <div className="flex items-center">
//                 <Calendar className="text-slate-400 w-5 h-5 mr-3 flex-shrink-0" />
//                 <Input
//                   type="date"
//                   min={new Date().toISOString().split("T")[0]}
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
//               className="md:w-48 bg-secondary hover:bg-secondary/90 text-white rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 h-auto p-4 md:p-6 transition-transform active:scale-95"
//             >
//               {searching ? (
//                 <Loader2 className="animate-spin w-6 h-6" />
//               ) : (
//                 <>
//                   Search <ArrowRight className="w-5 h-5 ml-1" />
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
//               animate={{ opacity: 1, height: "auto", marginTop: 16 }}
//               exit={{ opacity: 0, height: 0, marginTop: 0 }}
//               className="w-full max-w-4xl overflow-hidden z-20"
//             >
//               <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-1">
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
//                       <p className="text-sm font-medium">Checking availability...</p>
//                     </div>
//                   ) : trips?.length > 0 ? (
//                     <div className="space-y-2">
//                       {trips.map((trip: any) => (
//                         <div key={trip.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary/50 hover:bg-sky-50 transition-all group cursor-pointer shadow-sm hover:shadow-md">
//                           <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary transition-colors">
//                               <MapPin className="w-5 h-5" />
//                             </div>
//                             <div>
//                               <p className="font-bold text-slate-800 text-lg">{trip.departureTime}</p>
//                               <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{trip.title}</p>
//                             </div>
//                           </div>
//                           <div className="text-right">
//                             <p className="font-bold text-primary text-xl">UGX {Number(trip.price).toLocaleString()}</p>
//                             <Link href={`/booking/${trip.id}`} className="text-xs font-bold text-slate-400 group-hover:text-primary uppercase tracking-wide flex items-center justify-end gap-1 mt-1">
//                               Book Seat <ArrowRight className="w-3 h-3" />
//                             </Link>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="py-12 flex flex-col items-center text-slate-400">
//                       <AlertCircle className="w-12 h-12 mb-3 text-slate-300" />
//                       <p className="font-medium text-slate-500">No trips found for this date.</p>
//                       <p className="text-xs text-slate-400 mt-1">Try selecting a different date.</p>
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












