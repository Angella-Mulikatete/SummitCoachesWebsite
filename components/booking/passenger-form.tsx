'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, User, Mail, Phone, Loader2, CheckCircle } from 'lucide-react'
import { useLookupPassenger } from '@/lib/hooks'
import { PassengerInfo } from '@/lib/types'

interface PassengerFormProps {
    onPassengerData: (data: PassengerFormData) => void
    initialData?: PassengerFormData
}

export interface PassengerFormData {
    passenger_id?: number
    passenger_name: string
    passenger_phone: string
    passenger_email: string
    passenger_type: 'adult' | 'child' | 'student' | 'senior'
}

export default function PassengerForm({ onPassengerData, initialData }: PassengerFormProps) {
    const [phone, setPhone] = useState(initialData?.passenger_phone || '')
    const [formData, setFormData] = useState<PassengerFormData>(initialData || {
        passenger_name: '',
        passenger_phone: '',
        passenger_email: '',
        passenger_type: 'adult',
    })

    const [lookupPhone, setLookupPhone] = useState<string | null>(null)
    const { passenger, exists, isLoading: lookupLoading } = useLookupPassenger(lookupPhone)

    // Handle phone lookup
    const handlePhoneLookup = () => {
        if (phone.length >= 10) {
            setLookupPhone(phone)
        }
    }

    // Auto-fill when passenger found
    useEffect(() => {
        if (passenger) {
            setFormData({
                passenger_id: passenger.id,
                passenger_name: passenger.name || '',
                passenger_phone: passenger.phone || phone,
                passenger_email: passenger.email || '',
                passenger_type: passenger.passenger_type || 'adult',
            })
        }
    }, [passenger, phone])

    // Notify parent of changes
    useEffect(() => {
        onPassengerData(formData)
    }, [formData, onPassengerData])

    const handleInputChange = (field: keyof PassengerFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Passenger Information</h3>
                <p className="text-sm text-slate-600">Enter passenger details or lookup existing passenger</p>
            </div>

            {/* Phone Lookup */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                    Phone Number
                </label>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value)
                                handleInputChange('passenger_phone', e.target.value)
                            }}
                            onKeyPress={(e) => e.key === 'Enter' && handlePhoneLookup()}
                            placeholder="+256700000000"
                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={handlePhoneLookup}
                        disabled={lookupLoading || phone.length < 10}
                        className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {lookupLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <Search className="h-5 w-5" />
                        )}
                        Lookup
                    </button>
                </div>

                {/* Lookup Result */}
                {lookupPhone && !lookupLoading && exists && passenger && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 border border-green-200 rounded-lg p-4"
                    >
                        <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="font-medium text-green-800">Passenger Found!</p>
                                <p className="text-sm text-green-700 mt-1">
                                    {passenger.name} • {passenger.total_bookings || 0} previous bookings
                                </p>
                                {passenger.loyalty_points && passenger.loyalty_points > 0 && (
                                    <p className="text-xs text-green-600 mt-1">
                                        🎁 {passenger.loyalty_points} loyalty points
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {lookupPhone && !lookupLoading && !exists && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-blue-50 border border-blue-200 rounded-lg p-3"
                    >
                        <p className="text-sm text-blue-700">
                            No existing passenger found. Creating new passenger profile.
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Name */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                    Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        value={formData.passenger_name}
                        onChange={(e) => handleInputChange('passenger_name', e.target.value)}
                        placeholder="Enter full name"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="email"
                        value={formData.passenger_email}
                        onChange={(e) => handleInputChange('passenger_email', e.target.value)}
                        placeholder="email@example.com"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
            </div>

            {/* Passenger Type */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                    Passenger Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { value: 'adult', label: 'Adult', icon: '👤' },
                        { value: 'child', label: 'Child', icon: '👶' },
                        { value: 'student', label: 'Student', icon: '🎓' },
                        { value: 'senior', label: 'Senior', icon: '👴' },
                    ].map((type) => (
                        <button
                            key={type.value}
                            type="button"
                            onClick={() => handleInputChange('passenger_type', type.value)}
                            className={`
                px-4 py-3 rounded-lg border-2 font-medium transition-all
                ${formData.passenger_type === type.value
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                                }
              `}
                        >
                            <span className="mr-2">{type.icon}</span>
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Form Summary */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-sm font-medium text-slate-700 mb-2">Booking for:</p>
                <div className="space-y-1 text-sm text-slate-600">
                    <p><span className="font-medium">Name:</span> {formData.passenger_name || '—'}</p>
                    <p><span className="font-medium">Phone:</span> {formData.passenger_phone || '—'}</p>
                    <p><span className="font-medium">Email:</span> {formData.passenger_email || '—'}</p>
                    <p><span className="font-medium">Type:</span> {formData.passenger_type}</p>
                </div>
            </div>
        </div>
    )
}
