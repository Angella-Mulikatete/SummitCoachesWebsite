"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-hover p-8 text-center text-white shadow-2xl md:p-16"
        >
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">Ready to Start Your Journey?</h2>
          <p className="mb-8 text-pretty text-lg text-white/90 md:text-xl">
            Book your ticket now and experience comfortable travel across Uganda
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/search">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Book a Trip Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white bg-transparent text-white hover:bg-white hover:text-primary sm:w-auto"
              >
                Create an Account
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
