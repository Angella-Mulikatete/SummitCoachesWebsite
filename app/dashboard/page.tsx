"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { BookingsList } from "@/components/dashboard/bookings-list"
import { UserProfile } from "@/components/dashboard/user-profile"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("auth_token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(userData))
  }, [router])

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold text-secondary">Welcome back, {user.name}!</h1>
              <p className="text-secondary-light">Manage your bookings and account settings</p>
            </div>

            <DashboardStats />

            <div className="mt-8">
              <Tabs defaultValue="bookings" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                </TabsList>

                <TabsContent value="bookings" className="mt-6">
                  <BookingsList />
                </TabsContent>

                <TabsContent value="profile" className="mt-6">
                  <UserProfile user={user} />
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </main>
      
    </div>
  )
}
