"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function AnimatedBus() {
    const [mountainOffset, setMountainOffset] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setMountainOffset((prev) => (prev + 1) % 100)
        }, 50)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100">
            {/* Animated Road */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-slate-600 to-slate-700">
                {/* Road Lines */}
                <div className="absolute top-1/2 left-0 right-0 h-2 overflow-hidden">
                    <motion.div
                        className="flex h-full gap-8"
                        animate={{ x: [0, -100] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                        {[...Array(50)].map((_, i) => (
                            <div key={i} className="w-16 h-full bg-yellow-400 rounded-full" />
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Animated Mountains/Hills in background */}
            <svg className="absolute bottom-0 left-0 right-0 h-2/3" viewBox="0 0 1200 400" preserveAspectRatio="none">
                <motion.g
                    animate={{ x: [-50, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <path d="M0,400 L0,200 Q300,100 600,200 T1200,200 L1200,400 Z" fill="#10b981" opacity="0.3" />
                </motion.g>
                <motion.g
                    animate={{ x: [-30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                    <path d="M0,400 L0,250 Q400,150 800,250 T1600,250 L1600,400 Z" fill="#059669" opacity="0.5" />
                </motion.g>
            </svg>

            {/* Clouds */}
            <motion.div
                className="absolute top-20 left-10 w-32 h-16 bg-white rounded-full opacity-60"
                animate={{ x: [0, 1200, 0] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute top-32 right-20 w-24 h-12 bg-white rounded-full opacity-50"
                animate={{ x: [0, -1200, 0] }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            />

            {/* 3D Animated Bus */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 perspective-1000">
                <motion.div
                    className="relative preserve-3d"
                    animate={{
                        rotateY: [0, 2, 0, -2, 0],
                        y: [0, -8, 0, -8, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        {/* Shadow */}
                        <ellipse cx="200" cy="180" rx="180" ry="15" fill="rgba(0,0,0,0.2)" />

                        {/* Main bus body */}
                        <rect x="40" y="60" width="320" height="100" rx="15" fill="url(#busGradient)" />

                        {/* Roof */}
                        <path d="M 60 60 L 80 30 L 320 30 L 340 60 Z" fill="#dc2626" />

                        {/* Windows */}
                        <rect x="60" y="70" width="50" height="40" rx="5" fill="url(#windowGradient)" opacity="0.8" />
                        <rect x="120" y="70" width="50" height="40" rx="5" fill="url(#windowGradient)" opacity="0.8" />
                        <rect x="180" y="70" width="50" height="40" rx="5" fill="url(#windowGradient)" opacity="0.8" />
                        <rect x="240" y="70" width="50" height="40" rx="5" fill="url(#windowGradient)" opacity="0.8" />
                        <rect x="300" y="70" width="50" height="40" rx="5" fill="url(#windowGradient)" opacity="0.8" />

                        {/* Front windshield */}
                        <path d="M 340 60 L 360 75 L 360 120 L 340 120 Z" fill="url(#windowGradient)" opacity="0.9" />

                        {/* Headlights */}
                        <circle cx="355" cy="135" r="8" fill="#fef08a" />
                        <circle cx="355" cy="150" r="6" fill="#fca5a5" />

                        {/* Wheels */}
                        <g>
                            <circle cx="100" cy="160" r="25" fill="#1f2937" />
                            <circle cx="100" cy="160" r="15" fill="#6b7280" />
                            <motion.g
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                style={{ transformOrigin: "100px 160px" }}
                            >
                                <line x1="100" y1="145" x2="100" y2="175" stroke="#1f2937" strokeWidth="3" />
                                <line x1="85" y1="160" x2="115" y2="160" stroke="#1f2937" strokeWidth="3" />
                            </motion.g>
                        </g>

                        <g>
                            <circle cx="300" cy="160" r="25" fill="#1f2937" />
                            <circle cx="300" cy="160" r="15" fill="#6b7280" />
                            <motion.g
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                style={{ transformOrigin: "300px 160px" }}
                            >
                                <line x1="300" y1="145" x2="300" y2="175" stroke="#1f2937" strokeWidth="3" />
                                <line x1="285" y1="160" x2="315" y2="160" stroke="#1f2937" strokeWidth="3" />
                            </motion.g>
                        </g>

                        {/* Door */}
                        <rect x="50" y="120" width="35" height="40" rx="3" fill="#7c2d12" />
                        <line x1="67" y1="120" x2="67" y2="160" stroke="#451a03" strokeWidth="2" />

                        {/* Side details */}
                        <line x1="40" y1="120" x2="360" y2="120" stroke="#c2410c" strokeWidth="3" />
                        <rect x="80" y="125" width="260" height="8" rx="2" fill="#fbbf24" />

                        {/* Logo */}
                        <text x="200" y="150" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">
                            SUMMIT
                        </text>
                    </svg>
                </motion.div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/70 to-transparent" />
            <div className="absolute inset-0 bg-secondary/60 mix-blend-multiply" />
        </div>
    )
}
