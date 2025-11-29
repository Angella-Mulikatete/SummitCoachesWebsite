'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, Award, HeartHandshake, Wifi, Coffee } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Your safety is our priority with fully insured journeys and experienced drivers.',
  },
  {
    icon: Clock,
    title: 'Punctual Service',
    description: 'We value your time with guaranteed on-time departures and arrivals.',
  },
  {
    icon: Award,
    title: 'Premium Comfort',
    description: 'Luxury coaches with reclining seats, AC, and entertainment systems.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer First',
    description: '24/7 support and dedicated team to make your journey memorable.',
  },
  {
    icon: Wifi,
    title: 'Free WiFi',
    description: 'Stay connected throughout your journey with complimentary high-speed WiFi.',
  },
  {
    icon: Coffee,
    title: 'Refreshments',
    description: 'Complimentary snacks and beverages on all our coach trips.',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#e0f2fe] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-4">
            Why Choose Summit Coaches?
          </h2>
          <p className="text-xl text-[#475569] max-w-2xl mx-auto">
            Experience the difference with our premium services and unmatched comfort
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-[#e0f2fe] rounded-full flex items-center justify-center mb-6"
              >
                <feature.icon className="h-8 w-8 text-[#0ea5e9]" />
              </motion.div>

              <h3 className="text-xl font-bold text-[#1e293b] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#475569]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
