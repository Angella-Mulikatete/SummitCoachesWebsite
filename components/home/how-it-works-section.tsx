"use client"

import { Search, CreditCard, Ticket, Bus } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Search for Trips",
    description: "Enter your origin, destination, and travel date to find available trips",
  },
  {
    icon: CreditCard,
    number: "02",
    title: "Select & Book",
    description: "Choose your preferred seats and complete your booking details",
  },
  {
    icon: Ticket,
    number: "03",
    title: "Get Your Ticket",
    description: "Receive your QR-coded ticket via email and SMS instantly",
  },
  {
    icon: Bus,
    number: "04",
    title: "Board & Travel",
    description: "Present your ticket at our office and enjoy your journey",
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-secondary md:text-4xl">How It Works</h2>
          <p className="text-pretty text-lg text-secondary-light">Book your trip in 4 simple steps</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-primary/20 lg:block" />
              )}

              <div className="relative rounded-2xl bg-white p-6 text-center shadow-sm">
                <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-10 w-10 text-primary" />
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {step.number}
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-secondary">{step.title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-secondary-light">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
