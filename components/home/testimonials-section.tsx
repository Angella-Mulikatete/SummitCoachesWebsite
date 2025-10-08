"use client"

import { Star } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Sarah Nakato",
    location: "Kampala",
    rating: 5,
    comment:
      "Summit Coaches made my journey to Mbarara so comfortable! The booking process was easy and the bus was clean and on time.",
  },
  {
    name: "David Okello",
    location: "Gulu",
    rating: 5,
    comment:
      "I travel frequently for business and Summit Coaches is my go-to choice. Professional service and always reliable.",
  },
  {
    name: "Grace Nambi",
    location: "Mbale",
    rating: 5,
    comment:
      "The online booking system is fantastic! I got my ticket instantly and the QR code made boarding so quick and easy.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-gradient-to-br from-primary-light/30 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-secondary md:text-4xl">What Our Customers Say</h2>
          <p className="text-pretty text-lg text-secondary-light">Join thousands of satisfied travelers</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl bg-white p-6 shadow-md"
            >
              <div className="mb-4 flex items-center space-x-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="mb-4 text-pretty leading-relaxed text-secondary-light">"{testimonial.comment}"</p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-secondary">{testimonial.name}</p>
                <p className="text-sm text-secondary-light">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
