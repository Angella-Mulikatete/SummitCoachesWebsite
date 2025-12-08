import { use } from "react"

import TripDetails from "@/components/trips/trip-details"

export default function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <main className="flex-1">
        <TripDetails tripId={id} />
      </main>
    </div>
  )
}
