"use client"

import useSWR from "swr"
import { API_ENDPOINTS } from "@/lib/api"
import type { DynamicContent } from "@/lib/types"
import { motion, useInView, type Variants } from "framer-motion"
import { Users, Target, Award, Heart, ArrowRight } from "lucide-react"
import { useRef } from "react"

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export default function AboutPage() {
  const { data: content, isLoading } = useSWR<DynamicContent>(API_ENDPOINTS.aboutUs)

  const values = [
    {
      icon: Users,
      title: "Customer First",
      description: "We don't just drive buses; we serve people. Your comfort, safety, and satisfaction are the compass that guides our every decision.",
    },
    {
      icon: Target,
      title: "Unwavering Reliability",
      description: "Time is precious. We pride ourselves on punctual departures and arrivals, so you can plan your life with confidence.",
    },
    {
      icon: Award,
      title: "Pursuit of Excellence",
      description: "From our fleet maintenance to our customer support, we constantly raise the bar to provide the premium service you deserve.",
    },
    {
      icon: Heart,
      title: "Genuine Care",
      description: "We treat every passenger like family. A warm smile and a helping hand are standard parts of the Summit experience.",
    },
  ]

  const stats = [
    { number: "10+", label: "Years of Service" },
    { number: "50+", label: "Daily Trips" },
    { number: "100K+", label: "Happy Customers" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <main className="flex-1">

        {/* Hero Section 
           - Adjusted: py-10 md:py-28 -> py-12 md:py-20 
           - Reduces the huge top gap on desktop 
        */}
        <section className="relative py-12 md:py-20 overflow-hidden bg-white">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mx-auto max-w-4xl text-center"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4 tracking-wide uppercase">
                Our Story
              </span>
              <h1 className="mb-6 text-4xl md:text-6xl font-bold text-secondary tracking-tight">
                Redefining Travel in <span className="text-primary">Uganda</span>
              </h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Summit Coaches isn't just a transport company. We are your trusted partner for comfortable, safe, and reliable journeys across the region.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Dynamic Content Section 
           - Adjusted: py-10 -> py-8 md:py-16
           - Keeps content close to the hero title for flow
        */}
        <section className="py-8 md:py-16 bg-white border-y border-slate-100">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="mx-auto max-w-3xl space-y-6 animate-pulse">
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="h-4 w-5/6 bg-slate-100 rounded" />
                <div className="h-32 w-full bg-slate-100 rounded" />
                <div className="h-4 w-4/6 bg-slate-100 rounded" />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="prose prose-lg prose-slate mx-auto max-w-3xl 
                  prose-headings:font-bold prose-headings:text-secondary 
                  prose-p:text-slate-600 prose-p:leading-8
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-secondary prose-strong:font-semibold
                  prose-img:rounded-2xl prose-img:shadow-lg"
              >
                <div dangerouslySetInnerHTML={{ __html: content?.content || "" }} />
              </motion.div>
            )}
          </div>
        </section>

        {/* Stats Section 
           - Adjusted: py-20 -> py-12 md:py-16
           - Reduces height of the dark bar 
        */}
        <section className="py-12 md:py-16 bg-secondary text-white relative overflow-hidden">
          {/* Decorative patterns */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid gap-8 md:gap-12 md:grid-cols-3 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
              {stats.map((stat, index) => (
                <StatItem key={index} number={stat.number} label={stat.label} delay={index * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* Our Values 
           - Adjusted: py-24 -> py-16 md:py-20
           - Still spacious, but not excessive
        */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <h2 className="mb-4 text-3xl font-bold text-secondary md:text-4xl">Our Core Values</h2>
              <p className="text-lg text-slate-500">
                The principles that drive our engines and guide our service every single day.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
                >
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-secondary">{value.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section 
           - Adjusted: py-20 -> py-12 md:py-20
        */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-primary to-primary-hover rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl shadow-primary/20">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Difference?</h2>
              <p className="text-primary-light text-lg mb-8 max-w-2xl mx-auto">
                Book your next trip with Summit Coaches and discover why thousands of travelers choose us every year.
              </p>
              <button className="bg-white text-primary hover:bg-slate-50 font-bold py-4 px-8 rounded-full inline-flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
                Book a Seat Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

// Helper component for Stats Animation
function StatItem({ number, label, delay }: { number: string; label: string; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="pt-8 md:pt-0">
      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay, type: "spring" }}
        className="mb-2 text-5xl md:text-6xl font-extrabold text-primary"
      >
        {number}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-lg text-slate-300 font-medium"
      >
        {label}
      </motion.p>
    </div>
  )
}