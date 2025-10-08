"use client"

import useSWR from "swr"
import { Ticket, Clock, CheckCircle, Award } from "lucide-react"
import { motion } from "framer-motion"
import { API_ENDPOINTS } from "@/lib/api"

export function DashboardStats() {
  const { data: stats } = useSWR(API_ENDPOINTS.userBookings)

  const statsData = [
    {
      icon: Ticket,
      label: "Total Bookings",
      value: stats?.total || 0,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Clock,
      label: "Upcoming Trips",
      value: stats?.upcoming || 0,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: CheckCircle,
      label: "Completed",
      value: stats?.completed || 0,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: Award,
      label: "Loyalty Points",
      value: stats?.loyaltyPoints || 0,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="rounded-2xl bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-3xl font-bold text-secondary">{stat.value}</p>
            </div>
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`h-7 w-7 ${stat.color}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
