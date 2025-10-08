"use client"

import { use, useRef } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BookingReceipt } from "@/components/booking/booking-receipt"
import { Button } from "@/components/ui/button"
import { Download, Printer, Home, Mail } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useReactToPrint } from "react-to-print"

export default function ConfirmationPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = use(params)
  const receiptRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <svg className="h-10 w-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="mb-2 text-3xl font-bold text-secondary">Booking Confirmed!</h1>
            <p className="text-lg text-secondary-light">Your booking has been successfully created</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Booking Reference: <span className="font-mono font-semibold text-primary">{bookingId}</span>
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="no-print mb-6 flex flex-wrap justify-center gap-4"
          >
            <Button onClick={handlePrint} size="lg">
              <Printer className="mr-2 h-5 w-5" />
              Print Receipt
            </Button>
            <Button variant="outline" size="lg">
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="mr-2 h-5 w-5" />
              Email Receipt
            </Button>
          </motion.div>

          {/* Receipt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto max-w-3xl"
          >
            <div ref={receiptRef}>
              <BookingReceipt bookingId={bookingId} />
            </div>
          </motion.div>

          {/* Important Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border-2 border-accent/20 bg-accent/5 p-6"
          >
            <h3 className="mb-4 text-xl font-semibold text-secondary">Important Instructions</h3>
            <ul className="space-y-2 text-sm text-secondary-light">
              <li className="flex items-start space-x-2">
                <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs text-white">
                  1
                </span>
                <span>Print or save this receipt - you'll need it at our office</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs text-white">
                  2
                </span>
                <span>Visit our office at least 30 minutes before departure</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs text-white">
                  3
                </span>
                <span>Present this receipt and make payment to confirm your booking</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs text-white">
                  4
                </span>
                <span>Bring a valid ID for verification</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs text-white">
                  5
                </span>
                <span>Check your email and SMS for booking confirmation</span>
              </li>
            </ul>
          </motion.div>

          {/* Navigation */}
          <div className="no-print mt-8 flex justify-center gap-4">
            <Link href="/">
              <Button variant="outline" size="lg">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg">
                View My Bookings
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
