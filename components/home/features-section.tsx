"use client"

import { Shield, Clock, Smartphone, Ticket, Award, Headphones } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Travel with confidence knowing your safety is our top priority",
  },
  {
    icon: Clock,
    title: "On-Time Departure",
    description: "We value your time with punctual departures and arrivals",
  },
  {
    icon: Smartphone,
    title: "Easy Booking",
    description: "Book your tickets online in just a few clicks",
  },
  {
    icon: Ticket,
    title: "Digital Tickets",
    description: "Get your QR-coded ticket instantly via email and SMS",
  },
  {
    icon: Award,
    title: "Comfortable Seats",
    description: "Enjoy spacious, reclining seats for a relaxing journey",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our customer service team is always here to help",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-secondary md:text-4xl">
            Why Choose Summit Coaches?
          </h2>
          <p className="text-pretty text-lg text-secondary-light">
            Experience the best in bus travel with our premium services
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                <feature.icon className="h-7 w-7 text-primary transition-colors group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-secondary">{feature.title}</h3>
              <p className="text-pretty leading-relaxed text-secondary-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
