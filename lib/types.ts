// Type definitions for the Summit Coaches system

export interface User {
  id: string
  name: string
  email: string
  phone: string
  loyaltyPoints: number
  createdAt: string
}

export interface Route {
  id: string
  name: string
  origin: string
  destination: string
  distanceKm: number
  estimatedDuration: string
  stops: Stop[]
}

export interface Stop {
  id: string
  name: string
  order: number
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface Trip {
  id: string
  routeId: string
  route: Route
  busId: string
  bus: Bus
  departureTime: string
  arrivalTime: string
  status: "scheduled" | "boarding" | "en-route" | "completed" | "cancelled"
  availableSeats: number
  basePrice: number
  seatMap: SeatMap
}

export interface Bus {
  id: string
  plateNo: string
  type: string
  capacity: number
  amenities: string[]
}

export interface SeatMap {
  rows: number
  columns: number
  seats: Seat[]
}

export interface Seat {
  seatNo: string
  row: number
  column: number
  class: "economy" | "business" | "vip"
  isBooked: boolean
  isLocked?: boolean
  price: number
}

export interface Booking {
  id: string
  tripId: string
  trip: Trip
  userId: string
  seats: BookedSeat[]
  luggage: LuggageItem[]
  grossAmount: number
  discountAmount: number
  taxAmount: number
  netAmount: number
  paymentStatus: "pending" | "completed" | "failed" | "refunded"
  bookingStatus: "confirmed" | "cancelled" | "completed"
  bookingReference: string
  qrCode: string
  createdAt: string
}

export interface BookedSeat {
  seatNo: string
  passengerName: string
  price: number
}

export interface LuggageItem {
  id: string
  description: string
  weight: number
  price: number
}

export interface BookingFormData {
  tripId: string
  seats: {
    seatNo: string
    passengerName: string
  }[]
  luggage: {
    description: string
    weight: number
  }[]
  discountCode?: string
}

export interface SearchParams {
  origin: string
  destination: string
  date: string
  passengers?: number
}

export interface DynamicContent {
  id: string
  title: string
  content: string
  updatedAt: string
}
