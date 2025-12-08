"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, MapPin, Search, Users, SlidersHorizontal, Loader2 } from "lucide-react"

import { useRoutes } from "@/lib/hooks"

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    origin: searchParams.get("origin") || "",
    destination: searchParams.get("destination") || "",
    date: searchParams.get("date") || "",
    passengers: searchParams.get("passengers") || "1",
  })

  const [showFilters, setShowFilters] = useState(false)

  // Fetch routes to populate dropdowns
  const { routes, isLoading: routesLoading } = useRoutes()

  // Extract unique origins and destinations
  const { origins, destinations } = useMemo(() => {
    if (!routes) return { origins: [], destinations: [] }

    // Get unique origins
    const uniqueOrigins = Array.from(new Set(routes.map(r => r.origin))).sort()

    // Get unique destinations
    const uniqueDestinations = Array.from(new Set(routes.map(r => r.destination))).sort()

    // If an origin is selected, filter destinations generally available from that origin
    // Note: The simple route structure might not explicitly link origin->dest pairs easily without checking all routes
    // But we can filter destinations if the current origin matches a route
    let filteredDestinations = uniqueDestinations
    if (formData.origin) {
      const possibleDests = routes
        .filter(r => r.origin === formData.origin)
        .map(r => r.destination)
      if (possibleDests.length > 0) {
        filteredDestinations = Array.from(new Set(possibleDests)).sort()
      }
    }

    return { origins: uniqueOrigins, destinations: filteredDestinations }
  }, [routes, formData.origin])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (formData.origin) params.set("origin", formData.origin)
    if (formData.destination) params.set("destination", formData.destination)
    if (formData.date) params.set("date", formData.date)
    if (formData.passengers) params.set("passengers", formData.passengers)

    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-semibold text-secondary">Search Trips</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search-origin">From</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground z-10" />
              <Select
                value={formData.origin}
                onValueChange={(value: string) => setFormData(prev => ({ ...prev, origin: value, destination: '' }))} // Reset dest on origin change
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder={routesLoading ? "Loading..." : "Select Origin"} />
                </SelectTrigger>
                <SelectContent>
                  {origins.map((origin) => (
                    <SelectItem key={origin} value={origin}>
                      {origin}
                    </SelectItem>
                  ))}
                  {origins.length === 0 && !routesLoading && (
                    <div className="p-2 text-sm text-slate-500 text-center">No locations found</div>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="search-destination">To</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground z-10" />
              <Select
                value={formData.destination}
                onValueChange={(value: string) => setFormData(prev => ({ ...prev, destination: value }))}
                disabled={!formData.origin}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Select Destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest} value={dest}>
                      {dest}
                    </SelectItem>
                  ))}
                  {destinations.length === 0 && (
                    <div className="p-2 text-sm text-slate-500 text-center">
                      {formData.origin ? "No routes from this origin" : "Select origin first"}
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="search-date">Travel Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="pl-10"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="search-passengers">Passengers</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search-passengers"
                type="number"
                min="1"
                max="10"
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={!formData.origin || !formData.destination || !formData.date}>
        <Search className="mr-2 h-5 w-5" />
        Search Trips
      </Button>

      {/* Optional Filters */}
      <div className="border-t border-border pt-6">
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="flex w-full items-center justify-between text-sm font-medium text-secondary"
        >
          <span className="flex items-center">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </span>
          <span className="text-xs text-muted-foreground">{showFilters ? "Hide" : "Show"}</span>
        </button>

        {showFilters && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm">Bus Type</Label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-sm">Standard</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-sm">Lovebird (VIP)</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}
