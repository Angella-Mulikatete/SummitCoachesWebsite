'use client';

import { motion } from 'framer-motion';
import { Award, Users, Globe, Heart, Shield, Clock } from 'lucide-react';

const stats = [
  { label: 'Years of Experience', value: '15+', icon: Award },
  { label: 'Happy Customers', value: '10,000+', icon: Users },
  { label: 'Destinations', value: '50+', icon: Globe },
  { label: 'Satisfaction Rate', value: '98%', icon: Heart },
];

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Your safety is our top priority with fully maintained vehicles and experienced drivers.',
  },
  {
    icon: Heart,
    title: 'Customer Care',
    description: 'We go above and beyond to ensure every journey is comfortable and memorable.',
  },
  {
    icon: Clock,
    title: 'Reliability',
    description: 'On-time departures and arrivals, because we value your time as much as you do.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-white to-[#e0f2fe]">
      <div className="relative py-20 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About Summit Coaches</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Your trusted partner for premium coach travel experiences since 2009
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[#1e293b] mb-6">Our Story</h2>
            <p className="text-[#475569] text-lg mb-4">
              Founded in 2009, Summit Coaches began with a simple mission: to provide comfortable,
              reliable, and memorable coach travel experiences for everyone.
            </p>
            <p className="text-[#475569] text-lg mb-4">
              Over the years, we&apos;ve grown from a small family business to one of the region&apos;s most
              trusted coach travel companies, serving thousands of satisfied customers annually.
            </p>
            <p className="text-[#475569] text-lg">
              Today, we operate a modern fleet of luxury coaches and offer trips to over 50 destinations,
              all while maintaining the personal touch and attention to detail that made us successful.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Our coaches"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <stat.icon className="h-8 w-8 text-[#0ea5e9] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#1e293b] mb-2">{stat.value}</p>
              <p className="text-[#475569] text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#1e293b] mb-4">Our Values</h2>
          <p className="text-xl text-[#475569] max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-[#e0f2fe] rounded-full flex items-center justify-center mb-6">
                <value.icon className="h-8 w-8 text-[#0ea5e9]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1e293b] mb-3">{value.title}</h3>
              <p className="text-[#475569]">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
