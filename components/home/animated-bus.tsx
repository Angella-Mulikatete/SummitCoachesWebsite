
"use client"

import { motion } from 'framer-motion'

export function AnimatedBus() {
  // Define paths as strings to ensure the Road SVG and the Motion Path match exactly
  const paths = {
    west: "M 500 750 C 500 650, 400 550, 50 500",    // Curves Left
    north: "M 500 750 L 500 50",                    // Straight Up
    east: "M 500 750 C 500 650, 600 550, 950 500",   // Curves Right
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-50/50">
      {/* 1. Realistic Terrain Texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-white/50 to-slate-200/50" />

      {/* 2. The Road Network */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1000 800">
        <defs>
          {/* Asphalt Shadow Filter */}
          <filter id="roadShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- ROADS (Asphalt) --- */}
        {/* West Road */}
        <path d={paths.west} fill="none" stroke="#334155" strokeWidth="50" filter="url(#roadShadow)" strokeLinecap="round" />
        <path d={paths.west} fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="15 20" className="opacity-60" />

        {/* North Road */}
        <path d={paths.north} fill="none" stroke="#334155" strokeWidth="50" filter="url(#roadShadow)" strokeLinecap="round" />
        <path d={paths.north} fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="15 20" className="opacity-60" />

        {/* East Road */}
        <path d={paths.east} fill="none" stroke="#334155" strokeWidth="50" filter="url(#roadShadow)" strokeLinecap="round" />
        <path d={paths.east} fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="15 20" className="opacity-60" />

        {/* --- HUB TERMINAL (Bottom Center) --- */}
        {/* Terminal Concrete Area */}
        <circle cx="500" cy="820" r="140" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
        {/* Parking Bays */}
        <path d="M 450 820 L 450 750" stroke="#94a3b8" strokeWidth="4" strokeDasharray="5 5" />
        <path d="M 500 820 L 500 750" stroke="#94a3b8" strokeWidth="4" strokeDasharray="5 5" />
        <path d="M 550 820 L 550 750" stroke="#94a3b8" strokeWidth="4" strokeDasharray="5 5" />
        
        {/* Terminal Roof (Simple graphic) */}
        <rect x="420" y="810" width="160" height="100" rx="10" fill="#1e293b" opacity="0.1" />
      </svg>

      {/* 3. The Coaches */}
      {/* Note: offset-path rotation works best when the object points 'East' (Right) by default. 
          Our CoachSVG is designed pointing Right. */}
      
      {/* Coach 1: Westbound (Primary Blue) */}
      <CoachOnPath 
        path={paths.west} 
        delay={0.5} 
        color="#0ea5e9" 
        duration={12}
      />

      {/* Coach 2: Northbound (White/Navy) */}
      <CoachOnPath 
        path={paths.north} 
        delay={2} 
        color="#ffffff" 
        duration={10}
      />

      {/* Coach 3: Eastbound (Amber Accent) */}
      <CoachOnPath 
        path={paths.east} 
        delay={4.5} 
        color="#f59e0b" 
        duration={13}
      />
    </div>
  )
}

function CoachOnPath({ path, delay, color, duration }: { path: string, delay: number, color: string, duration: number }) {
  // Determine text color based on bus color
  const textColor = color === "#ffffff" ? "#1e293b" : "#ffffff";
  const roofDark = color === "#ffffff" ? "#f1f5f9" : "rgba(0,0,0,0.1)";

  return (
    <motion.div
      className="absolute top-0 left-0 w-24 h-8 z-20 origin-center"
      style={{ 
        offsetPath: `path('${path}')`,
        offsetRotate: "auto", // This ensures the bus rotates with the curve
      }}
      initial={{ offsetDistance: "0%" }}
      animate={{ offsetDistance: "100%" }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut" // Accelerate out of station, slow down at destination
      }}
    >
        {/* Top-Down Coach Graphic (Designed horizontally pointing Right) */}
        <div className="relative w-full h-full drop-shadow-xl" style={{ transform: 'rotate(0deg)' }}>
            
            {/* Bus Body */}
            <div className="absolute inset-0 rounded-lg overflow-hidden border border-slate-400/50" style={{ backgroundColor: color }}>
                
                {/* Roof Gradient / Shine */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

                {/* Windshield (Front - Right side) */}
                <div className="absolute top-[10%] bottom-[10%] right-1 w-5 bg-sky-800 rounded-r-md opacity-80"></div>
                
                {/* Rear Window (Back - Left side) */}
                <div className="absolute top-[15%] bottom-[15%] left-0 w-2 bg-sky-900 rounded-l-md opacity-90"></div>

                {/* Roof AC Units & Hatches (Technical Details) */}
                <div className="absolute top-1/2 left-4 -translate-y-1/2 w-6 h-4 bg-slate-300 rounded-sm border border-slate-400 opacity-80">
                   {/* Fan grilles */}
                   <div className="w-2 h-2 rounded-full bg-slate-400/50 mx-auto mt-1"></div>
                </div>
                <div className="absolute top-1/2 right-8 -translate-y-1/2 w-5 h-3 bg-slate-300 rounded-sm border border-slate-400 opacity-80"></div>

                {/* Roof Branding Strip (Middle) */}
                <div className="absolute top-1/2 left-2 right-8 h-px bg-slate-900/10 -translate-y-1/2"></div>
            </div>

            {/* Side Mirrors (Bunny ears) */}
            <div className="absolute top-0 right-3 w-1 h-2 -mt-1 bg-slate-800 rounded-full origin-bottom -rotate-12"></div>
            <div className="absolute bottom-0 right-3 w-1 h-2 -mb-1 bg-slate-800 rounded-full origin-top rotate-12"></div>
        </div>
    </motion.div>
  )
}















// "use client"

// import { motion } from 'framer-motion'

// export function Animated() {
//   return (
//     <div className="absolute inset-0 overflow-hidden bg-slate-50">
//       {/* 1. Map/Terrain Background */}
//       <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]" />
//       <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/50" />

//       {/* 2. The Road Network (SVG) */}
//       <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1000 800">
//         <defs>
//           <filter id="roadShadow" x="-20%" y="-20%" width="140%" height="140%">
//             <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
//             <feOffset dx="0" dy="4" result="offsetblur" />
//             <feComponentTransfer>
//               <feFuncA type="linear" slope="0.5" />
//             </feComponentTransfer>
//             <feMerge>
//               <feMergeNode />
//               <feMergeNode in="SourceGraphic" />
//             </feMerge>
//           </filter>
//         </defs>

//         {/* Central Hub Area (Bottom Center) */}
//         <circle cx="500" cy="750" r="80" fill="#e2e8f0" />
//         <circle cx="500" cy="750" r="60" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="10 10" />

//         {/* --- ROADS --- */}
//         {/* Route 1: West (Left Curve) */}
//         <path
//           d="M 500 750 C 500 600, 400 500, 100 450"
//           fill="none"
//           stroke="#475569"
//           strokeWidth="40"
//           filter="url(#roadShadow)"
//         />
//         <path
//           d="M 500 750 C 500 600, 400 500, 100 450"
//           fill="none"
//           stroke="#fbbf24"
//           strokeWidth="2"
//           strokeDasharray="10 20"
//           className="opacity-50"
//         />

//         {/* Route 2: North (Straight Up) */}
//         <path
//           d="M 500 750 L 500 100"
//           fill="none"
//           stroke="#475569"
//           strokeWidth="40"
//           filter="url(#roadShadow)"
//         />
//         <path
//           d="M 500 750 L 500 100"
//           fill="none"
//           stroke="#fbbf24"
//           strokeWidth="2"
//           strokeDasharray="10 20"
//           className="opacity-50"
//         />

//         {/* Route 3: East (Right Curve) */}
//         <path
//           d="M 500 750 C 500 600, 600 500, 900 450"
//           fill="none"
//           stroke="#475569"
//           strokeWidth="40"
//           filter="url(#roadShadow)"
//         />
//         <path
//           d="M 500 750 C 500 600, 600 500, 900 450"
//           fill="none"
//           stroke="#fbbf24"
//           strokeWidth="2"
//           strokeDasharray="10 20"
//           className="opacity-50"
//         />
//       </svg>

//       {/* 3. The Buses */}
      
//       {/* Bus 1: Westbound */}
//       <BusOnPath 
//         path="M 500 800 C 500 600, 400 500, 100 450" 
//         delay={0} 
//         color="#0ea5e9" // Primary Blue
//       />

//       {/* Bus 2: Northbound */}
//       <BusOnPath 
//         path="M 500 800 L 500 100" 
//         delay={1.5} 
//         color="#f59e0b" // Accent Amber
//       />

//       {/* Bus 3: Eastbound */}
//       <BusOnPath 
//         path="M 500 800 C 500 600, 600 500, 900 450" 
//         delay={3} 
//         color="#0ea5e9" // Primary Blue
//       />
//     </div>
//   )
// }

// function BusOnPath({ path, delay, color }: { path: string, delay: number, color: string }) {
//   return (
//     <motion.div
//       className="absolute top-0 left-0 w-10 h-20 z-10"
//       style={{ offsetPath: `path('${path}')` }}
//       initial={{ offsetDistance: "0%" }}
//       animate={{ offsetDistance: "100%" }}
//       transition={{
//         duration: 8,
//         delay: delay,
//         repeat: Infinity,
//         ease: "linear" // Linear movement for steady driving
//       }}
//     >
//         {/* Top-Down Bus Graphic */}
//         <div className="relative w-full h-full drop-shadow-xl" style={{ transform: 'rotate(90deg)' }}>
//             {/* Body */}
//             <div className="absolute inset-0 bg-white rounded-md overflow-hidden border border-slate-300">
//                 {/* Roof Colors */}
//                 <div className="absolute top-0 left-0 right-0 h-full w-full bg-slate-50"></div>
//                 {/* Branding Strip */}
//                 <div className="absolute top-0 left-1/4 right-0 bottom-0 w-1/2 bg-slate-800 mx-auto"></div>
//                 {/* Color Highlight */}
//                 <div className="absolute top-0 w-full h-2" style={{ backgroundColor: color }}></div>
//                 <div className="absolute bottom-0 w-full h-2" style={{ backgroundColor: color }}></div>
                
//                 {/* Windshields */}
//                 <div className="absolute top-1 left-1 right-1 h-3 bg-sky-200 rounded-sm"></div>
//                 <div className="absolute bottom-1 left-1 right-1 h-2 bg-sky-900/20 rounded-sm"></div>
//             </div>
//             {/* Mirrors */}
//             <div className="absolute top-2 -left-1 w-1 h-2 bg-slate-800 rounded-l-full"></div>
//             <div className="absolute top-2 -right-1 w-1 h-2 bg-slate-800 rounded-r-full"></div>
//         </div>
//     </motion.div>
//   )
// }