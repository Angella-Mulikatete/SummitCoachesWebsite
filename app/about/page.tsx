"use client"

import { Navbar } from "@/app/(layout)/navbar"
import { Footer } from "@/app/(layout)/footer"
import useSWR from "swr"
import { API_ENDPOINTS } from "@/lib/api"
import type { DynamicContent } from "@/lib/types"
import { motion } from "framer-motion"
import { Users, Target, Award, Heart } from "lucide-react"

export default function AboutPage() {
  const { data: content, isLoading } = useSWR<DynamicContent>(API_ENDPOINTS.aboutUs)

  const values = [
    {
      icon: Users,
      title: "Customer First",
      description: "Your comfort and safety are our top priorities",
    },
    {
      icon: Target,
      title: "Reliability",
      description: "On-time departures and arrivals you can count on",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to providing the best service quality",
    },
    {
      icon: Heart,
      title: "Care",
      description: "We treat every passenger like family",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-light/30 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h1 className="mb-6 text-balance text-4xl font-bold text-secondary md:text-5xl">About Summit Coaches</h1>
              <p className="text-pretty text-lg leading-relaxed text-secondary-light">
                Your trusted partner for comfortable and reliable bus travel across Uganda
              </p>
            </motion.div>
          </div>
        </section>

        {/* Dynamic Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="mx-auto max-w-4xl animate-pulse space-y-4">
                <div className="h-6 w-3/4 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-lg mx-auto max-w-4xl"
              >
                <div
                  className="leading-relaxed text-secondary-light"
                  dangerouslySetInnerHTML={{ __html: content?.content || "" }}
                />
              </motion.div>
            )}
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold text-secondary md:text-4xl">Our Core Values</h2>
              <p className="text-pretty text-lg text-secondary-light">What drives us every day</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-2xl bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-secondary">{value.title}</h3>
                  <p className="text-pretty text-sm leading-relaxed text-secondary-light">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { number: "10+", label: "Years of Service" },
                { number: "50+", label: "Daily Trips" },
                { number: "100K+", label: "Happy Customers" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="mb-2 text-5xl font-bold text-primary">{stat.number}</p>
                  <p className="text-lg text-secondary-light">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
