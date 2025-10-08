"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"
import { motion } from "framer-motion"

const popularRoutes = [
  {
    from: "Kampala",
    to: "Mbarara",
    duration: "4h 30m",
    price: "UGX 25,000",
    trips: "8 daily trips",
  },
  {
    from: "Kampala",
    to: "Gulu",
    duration: "5h 15m",
    price: "UGX 30,000",
    trips: "6 daily trips",
  },
  {
    from: "Kampala",
    to: "Mbale",
    duration: "4h 00m",
    price: "UGX 22,000",
    trips: "10 daily trips",
  },
  {
    from: "Kampala",
    to: "Fort Portal",
    duration: "5h 30m",
    price: "UGX 28,000",
    trips: "5 daily trips",
  },
]

export function PopularRoutesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-secondary md:text-4xl">Popular Routes</h2>
          <p className="text-pretty text-lg text-secondary-light">Explore our most traveled destinations</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {popularRoutes.map((route, index) => (
            <motion.div
              key={`${route.from}-${route.to}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary hover:shadow-lg"
            >
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-secondary">{route.from}</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-secondary">{route.to}</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-secondary-light">
                  <p>Duration: {route.duration}</p>
                  <p className="text-xs">{route.trips}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-secondary-light">Starting from</p>
                  <p className="text-2xl font-bold text-primary">{route.price}</p>
                </div>
                <Link
                  href={`/search?origin=${route.from}&destination=${route.to}&date=${new Date().toISOString().split("T")[0]}`}
                >
                  <Button size="sm">Book Now</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/search">
            <Button size="lg" variant="outline">
              View All Routes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
