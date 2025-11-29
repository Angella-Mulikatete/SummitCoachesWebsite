'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bus, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1e293b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Bus className="h-8 w-8 text-[#0ea5e9]" />
              <span className="text-xl font-bold">Summit Coaches</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner for comfortable and reliable coach travel experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/trips" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">
                  Trips
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 text-[#0ea5e9] mt-0.5" />
                <span className="text-gray-400 text-sm">+256 700 000 000</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-[#0ea5e9] mt-0.5" />
                <span className="text-gray-400 text-sm">info@summitcoaches.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-[#0ea5e9] mt-0.5" />
                <span className="text-gray-400 text-sm">Kampala, Uganda</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#0ea5e9] p-2 rounded-full hover:bg-[#0284c7] transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#0ea5e9] p-2 rounded-full hover:bg-[#0284c7] transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#0ea5e9] p-2 rounded-full hover:bg-[#0284c7] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Summit Coaches. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="hover:text-[#0ea5e9] transition-colors">
              Terms & Conditions
            </Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-[#0ea5e9] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
