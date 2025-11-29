'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-white to-[#e0f2fe]">
      <div className="relative py-20 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Have questions? We&apos;re here to help you plan your perfect journey
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl font-bold text-[#1e293b] mb-8">Contact Information</h2>

            <div className="space-y-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="w-12 h-12 bg-[#e0f2fe] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-[#0ea5e9]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e293b] mb-1">Phone</h3>
                  <p className="text-[#475569]">+1 (555) 123-4567</p>
                  <p className="text-sm text-[#475569]">Mon-Fri 9am-6pm</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="w-12 h-12 bg-[#e0f2fe] rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-[#0ea5e9]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e293b] mb-1">Email</h3>
                  <p className="text-[#475569]">info@summitcoaches.com</p>
                  <p className="text-sm text-[#475569]">We&apos;ll respond within 24 hours</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="w-12 h-12 bg-[#e0f2fe] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-[#0ea5e9]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e293b] mb-1">Address</h3>
                  <p className="text-[#475569]">123 Travel Street</p>
                  <p className="text-[#475569]">City, State 12345</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="w-12 h-12 bg-[#e0f2fe] rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-[#0ea5e9]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e293b] mb-1">Business Hours</h3>
                  <p className="text-[#475569]">Monday - Friday: 9am - 6pm</p>
                  <p className="text-[#475569]">Saturday: 10am - 4pm</p>
                  <p className="text-[#475569]">Sunday: Closed</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-[#1e293b] mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#1e293b] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1e293b] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1e293b] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1e293b] mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#0ea5e9] text-white py-4 rounded-lg font-semibold hover:bg-[#0284c7] transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="h-5 w-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
