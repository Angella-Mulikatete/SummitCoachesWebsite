"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"
import useSWR from "swr"
import { API_ENDPOINTS } from "@/lib/api"
import type { DynamicContent } from "@/lib/types"

export default function ContactPage() {
  const { toast } = useToast()
  const { data: contactInfo } = useSWR<DynamicContent>(API_ENDPOINTS.contactInfo)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await api.post("/contact", formData)

      toast({
        title: "Message Sent",
        description: "We'll get back to you as soon as possible",
      })

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Failed to Send",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactDetails = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Kampala, Uganda",
      link: null,
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+256 700 000 000",
      link: "tel:+256700000000",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "info@summitcoaches.com",
      link: "mailto:info@summitcoaches.com",
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Mon - Sun: 6:00 AM - 10:00 PM",
      link: null,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
  
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
              <h1 className="mb-6 text-balance text-4xl font-bold text-secondary md:text-5xl">Get in Touch</h1>
              <p className="text-pretty text-lg leading-relaxed text-secondary-light">
                Have questions? We're here to help. Reach out to us anytime.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {contactDetails.map((detail, index) => (
                <motion.div
                  key={detail.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-2xl bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <detail.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-secondary">{detail.title}</h3>
                  {detail.link ? (
                    <a
                      href={detail.link}
                      className="text-pretty text-sm leading-relaxed text-secondary-light hover:text-primary"
                    >
                      {detail.content}
                    </a>
                  ) : (
                    <p className="text-pretty text-sm leading-relaxed text-secondary-light">{detail.content}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl bg-white p-8 shadow-lg"
              >
                <h2 className="mb-6 text-2xl font-bold text-secondary">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+256 700 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
