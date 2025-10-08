"use client"

import { Suspense } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SearchForm } from "@/components/search/search-form"
import { TripList } from "@/components/search/trip-list"
import { SearchSkeleton } from "@/components/search/search-skeleton"

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-secondary">Find Your Trip</h1>
            <p className="text-secondary-light">Search for available trips and book your journey</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
            <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
              <SearchForm />
            </aside>

            <div>
              <Suspense fallback={<SearchSkeleton />}>
                <TripList />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
