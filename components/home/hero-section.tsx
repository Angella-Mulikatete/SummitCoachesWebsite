"use client"

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative bg-secondary py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?blur=4" 
          alt="Travel background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
        >
          Your Journey, <span className="text-primary">Elevated</span>.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto"
        >
          Discover premium coach travel to breathtaking destinations. 
          Comfort, safety, and scenic routes guaranteed.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-2 rounded-full max-w-lg mx-auto shadow-2xl flex items-center"
        >
          <div className="flex-1 px-4 py-2 border-r border-slate-100 flex items-center gap-2 text-slate-400">
            <Search className="h-5 w-5" />
            <input 
              type="text" 
              placeholder="Where do you want to go?" 
              className="w-full outline-none text-slate-800 placeholder:text-slate-400" 
            />
          </div>
          <button className="bg-primary hover:bg-primary-hover text-white rounded-full px-6 py-3 font-medium transition-colors">
            Search
          </button>
        </motion.div>
      </div>
    </section>
  )
}











// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Calendar, MapPin, Search, Users } from "lucide-react"
// import { motion } from "framer-motion"

// export function HeroSection() {
//   const router = useRouter()
//   const [searchData, setSearchData] = useState({
//     origin: "",
//     destination: "",
//     date: "",
//     passengers: "1",
//   })

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     const params = new URLSearchParams({
//       origin: searchData.origin,
//       destination: searchData.destination,
//       date: searchData.date,
//       passengers: searchData.passengers,
//     })
//     router.push(`/search?${params.toString()}`)
//   }

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-white to-primary-light/50 py-16 md:py-24">
//       {/* Decorative elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
//         <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
//       </div>

//       <div className="container relative mx-auto px-4">
//         <div className="mx-auto max-w-4xl text-center">
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//             <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-secondary md:text-5xl lg:text-6xl">
//               Travel Across Uganda with <span className="text-primary">Comfort & Reliability</span>
//             </h1>
//             <p className="mb-8 text-pretty text-lg text-secondary-light md:text-xl">
//               Book your bus tickets online and enjoy a seamless journey to your destination
//             </p>
//           </motion.div>

//           {/* Search Form */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="mx-auto max-w-3xl"
//           >
//             <form onSubmit={handleSearch} className="rounded-2xl bg-white p-6 shadow-xl md:p-8">
//               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="origin" className="text-sm font-medium">
//                     From
//                   </Label>
//                   <div className="relative">
//                     <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id="origin"
//                       placeholder="Kampala"
//                       value={searchData.origin}
//                       onChange={(e) => setSearchData({ ...searchData, origin: e.target.value })}
//                       className="pl-10"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="destination" className="text-sm font-medium">
//                     To
//                   </Label>
//                   <div className="relative">
//                     <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id="destination"
//                       placeholder="Mbarara"
//                       value={searchData.destination}
//                       onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
//                       className="pl-10"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="date" className="text-sm font-medium">
//                     Date
//                   </Label>
//                   <div className="relative">
//                     <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id="date"
//                       type="date"
//                       value={searchData.date}
//                       onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
//                       className="pl-10"
//                       min={new Date().toISOString().split("T")[0]}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="passengers" className="text-sm font-medium">
//                     Passengers
//                   </Label>
//                   <div className="relative">
//                     <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id="passengers"
//                       type="number"
//                       min="1"
//                       max="10"
//                       value={searchData.passengers}
//                       onChange={(e) => setSearchData({ ...searchData, passengers: e.target.value })}
//                       className="pl-10"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>

//               <Button type="submit" size="lg" className="mt-6 w-full md:w-auto">
//                 <Search className="mr-2 h-5 w-5" />
//                 Search Trips
//               </Button>
//             </form>
//           </motion.div>

//           {/* Trust Indicators */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-secondary-light"
//           >
//             <div className="flex items-center space-x-2">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
//                 <span className="text-lg font-bold text-primary">10+</span>
//               </div>
//               <span>Years of Service</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
//                 <span className="text-lg font-bold text-primary">50+</span>
//               </div>
//               <span>Daily Trips</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
//                 <span className="text-lg font-bold text-primary">99%</span>
//               </div>
//               <span>On-Time Arrival</span>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }
