"use client"

import { motion, Variants } from 'framer-motion'
import { Bus, Users, MapPin, ShieldCheck, Clock, Coffee } from 'lucide-react'

// Extended feature list to look better in a grid, or stick to 3 if preferred
const features = [
  {
    icon: Bus,
    title: 'Modern Fleet',
    description: 'Travel in our state-of-the-art coaches equipped with high-speed WiFi, USB power outlets, and spacious reclining seats.'
  },
  {
    icon: Users,
    title: 'Expert Drivers',
    description: 'Our drivers are professionally trained, vetted, and dedicated to your safety, ensuring a smooth journey every mile.'
  },
  {
    icon: MapPin,
    title: 'Scenic Routes',
    description: 'We curate the most beautiful routes across the country, making the journey itself just as memorable as the destination.'
  }
]

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

export function FeaturesSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle decorative background blob */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-light/30 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">
              The Summit Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Why Choose Summit Coaches?
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              We don't just move people; we elevate the standard of ground travel.
              Sit back, relax, and enjoy the ride.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <feature.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors duration-300" />
              </div>

              <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {feature.description}
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500 rounded-b-2xl opacity-0 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}