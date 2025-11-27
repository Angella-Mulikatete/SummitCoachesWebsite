
import type { Metadata } from "next"
import { Navbar } from "@/app/(layout)/navbar"
import { Footer } from "@/app/(layout)/footer"
import "./globals.css"

export const metadata: Metadata = {
  title: "Summit Coaches - Premium Bus Travel",
  description: "Connecting you to the world's most beautiful destinations with comfort and style.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}










