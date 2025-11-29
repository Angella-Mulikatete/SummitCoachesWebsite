'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Users, Loader2 } from 'lucide-react';
import type { Trip, CreateBookingData } from '@/lib/api';

interface BookingFormProps {
  trip: Trip;
  onSubmit: (data: CreateBookingData) => Promise<void>;
}

export default function BookingForm({ trip, onSubmit }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    numberOfPassengers: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({
        tripId: trip.id,
        ...formData,
      });
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numberOfPassengers' ? parseInt(value) : value,
    }));
  };

  const totalPrice = trip.price * formData.numberOfPassengers;

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <h3 className="text-2xl font-bold text-[#1e293b] mb-6">Complete Your Booking</h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#1e293b] mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#475569]" />
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1e293b] mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#475569]" />
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1e293b] mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#475569]" />
            <input
              type="tel"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1e293b] mb-2">
            Number of Passengers
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#475569]" />
            <select
              name="numberOfPassengers"
              value={formData.numberOfPassengers}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent appearance-none"
            >
              {Array.from({ length: Math.min(trip.availableSeats, 10) }, (_, i) => i + 1).map(
                (num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Passenger' : 'Passengers'}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <div className="bg-[#e0f2fe] p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#475569]">Price per person:</span>
            <span className="font-semibold text-[#1e293b]">${trip.price}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#475569]">Number of passengers:</span>
            <span className="font-semibold text-[#1e293b]">{formData.numberOfPassengers}</span>
          </div>
          <div className="border-t border-[#0ea5e9] pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-[#1e293b]">Total:</span>
              <span className="text-2xl font-bold text-[#0ea5e9]">${totalPrice}</span>
            </div>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full bg-[#0ea5e9] text-white py-4 rounded-lg font-semibold hover:bg-[#0284c7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <span>Confirm Booking</span>
          )}
        </motion.button>
      </div>

      <p className="text-xs text-[#475569] text-center mt-4">
        By booking, you agree to our terms and conditions
      </p>
    </motion.form>
  );
}
