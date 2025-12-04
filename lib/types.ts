// src/lib/types.ts

// ==================== ROUTE TYPES ====================
export interface Route {
  id: string | number
  name: string
  code: string
  direction: 'departure' | 'arrival'
  distance_km: number | null
  duration_minutes: number | null
  active: string | boolean
  company_name: string
  origin: string
  destination: string
  base_fare: string | number
}

export interface RouteFare {
  id: string | number
  base_amount: string | number
  fare_type: 'standard' | 'peak' | 'off-peak'
  is_peak: string | boolean
  active: string | boolean
  bus_type_name: string
}

export interface RouteWithFares {
  route: Route
  fares: RouteFare[]
}

export interface RouteWithTrips {
  route: Route
  trips: Trip[]
}

export interface RouteSearchParams {
  company_id?: number
  active?: boolean
  search?: string
  date_filter?: 'today' | 'tomorrow' | 'week'
  min_seats?: number
  origin?: string
  destination?: string
}

// ==================== TRIP TYPES ====================
export interface Trip {
  // Required fields from Laravel API
  id: number
  origin: string
  destination: string
  departure_time: string
  arrival_time: string
  date: string
  bus_number: string
  bus_type: string
  fare: number
  available_seats: number
  total_seats: number
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string

  // Frontend display fields
  title: string
  description: string
  image: string
  thumbnail?: string

  // Computed/optional fields for frontend compatibility
  price: number // Same as fare
  availableSeats: number // Same as available_seats

  // Optional fields that may be needed by TripCard
  departureDate?: string
  returnDate?: string
  features?: string[]
  departureTime?: string
  arrivalTime?: string

  // Nested objects
  bus?: {
    registrationNumber: string
    type: string
    capacity: string
  }
  route?: {
    origin: string
    destination: string
    name: string
  }
}

export interface SearchTripsParams {
  origin?: string
  destination?: string
  date?: string
  page?: number
  per_page?: number
  featured?: boolean
  limit?: number
}

// ==================== SEAT TYPES ====================
export interface Seat {
  id: number
  seat_number: string
  row: number
  column: number
  is_available: boolean
  is_window: boolean
  is_aisle: boolean
  price_modifier?: number
}

export interface SeatMap {
  trip_id: number
  layout: Seat[]
  total_rows: number
  seats_per_row: number
}

// ==================== BOOKING TYPES ====================
export interface Passenger {
  name: string
  phone: string
  email: string
  id_number?: string
  seat_numbers: string[]
}

export interface Booking {
  id: number
  trip_id: number
  passenger: Passenger
  seats: string[]
  total_amount: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  booking_reference: string
  payment_status: 'pending' | 'paid' | 'failed'
  created_at: string
  updated_at: string
  trip?: Trip
}

export interface CreateBookingPayload {
  trip_id: number | string
  passenger_name: string
  passenger_phone: string
  passenger_email: string
  passenger_id_number?: string
  seat_numbers: string[]
}

// ==================== PAYMENT TYPES ====================
export interface Payment {
  id: number
  booking_id: number
  amount: number
  status: 'pending' | 'completed' | 'failed'
  payment_method: string
  transaction_id?: string
  provider_reference?: string
  created_at: string
  updated_at: string
}

export interface PaymentInitializePayload {
  booking_id: number | string
  amount: number
  phone_number: string
  payment_method: 'mobile_money' | 'card' | 'cash'
}

// ==================== API RESPONSE TYPES ====================
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

// ==================== DYNAMIC CONTENT TYPES ====================
export interface DynamicContent {
  id: number | string
  type: 'hero' | 'feature' | 'testimonial' | 'faq' | 'announcement' | 'banner'
  title: string
  content: string
  subtitle?: string
  image?: string
  cta_text?: string
  cta_link?: string
  metadata?: Record<string, any>
  is_active: boolean
  display_order?: number
  created_at: string
  updated_at: string
}

export interface HeroContent extends DynamicContent {
  type: 'hero'
  background_image?: string
  video_url?: string
}

export interface FeatureContent extends DynamicContent {
  type: 'feature'
  icon?: string
  features?: string[]
}

export interface TestimonialContent extends DynamicContent {
  type: 'testimonial'
  author_name: string
  author_role?: string
  author_image?: string
  rating?: number
}

export interface FAQContent extends DynamicContent {
  type: 'faq'
  question: string
  answer: string
  category?: string
}

export interface AnnouncementContent extends DynamicContent {
  type: 'announcement'
  severity?: 'info' | 'warning' | 'error' | 'success'
  expires_at?: string
}

// ==================== CMS/CONTENT TYPES ====================
export interface BlogPost {
  id: number | string
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  author: {
    id: number | string
    name: string
    avatar?: string
  }
  category?: string
  tags?: string[]
  published_at: string
  created_at: string
  updated_at: string
  status: 'draft' | 'published' | 'archived'
}

export interface Page {
  id: number | string
  title: string
  slug: string
  content: string
  meta_title?: string
  meta_description?: string
  is_published: boolean
  created_at: string
  updated_at: string
}

// ==================== USER TYPES ====================
export interface User {
  id: number | string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  success: boolean
  user: User
  token: string
  expires_at: string
}

// ==================== NOTIFICATION TYPES ====================
export interface Notification {
  id: number | string
  type: 'booking' | 'payment' | 'trip' | 'system'
  title: string
  message: string
  is_read: boolean
  data?: Record<string, any>
  created_at: string
}

// ==================== SETTINGS TYPES ====================
export interface SiteSettings {
  site_name: string
  site_description: string
  site_logo?: string
  contact_email: string
  contact_phone: string
  social_links?: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
  maintenance_mode: boolean
}

// ==================== STATISTICS TYPES ====================
export interface DashboardStats {
  total_trips: number
  total_bookings: number
  total_revenue: number
  active_users: number
  upcoming_trips: number
  pending_bookings: number
}

// ==================== REVIEW/RATING TYPES ====================
export interface Review {
  id: number | string
  trip_id: number | string
  user_id: number | string
  rating: number
  comment: string
  created_at: string
  updated_at: string
  user?: {
    name: string
    avatar?: string
  }
}

export interface CreateReviewPayload {
  trip_id: number | string
  rating: number
  comment: string
}

// ==================== LOCATION TYPES ====================
export interface Location {
  id: number | string
  name: string
  code: string
  city: string
  country: string
  latitude?: number
  longitude?: number
  is_active: boolean
}

// ==================== UTILITY TYPES ====================
export type Status = 'active' | 'inactive' | 'pending' | 'archived'

export type SortOrder = 'asc' | 'desc'

export interface PaginationParams {
  page?: number
  per_page?: number
  sort_by?: string
  sort_order?: SortOrder
}

export interface FilterParams {
  search?: string
  status?: Status
  date_from?: string
  date_to?: string
  [key: string]: any
}



















// // Type definitions for the Summit Coaches system

// export interface User {
//   id: string
//   name: string
//   email: string
//   phone: string
//   loyaltyPoints: number
//   createdAt: string
// }

// export interface Route {
//   id: string
//   name: string
//   origin: string
//   destination: string
//   distanceKm: number
//   estimatedDuration: string
//   stops: Stop[]
// }

// export interface Stop {
//   id: string
//   name: string
//   order: number
//   coordinates?: {
//     lat: number
//     lng: number
//   }
// }

// export interface Trip {
//   id: string
//   routeId: string
//   route: Route
//   busId: string
//   bus: Bus
//   departureTime: string
//   arrivalTime: string
//   status: "scheduled" | "boarding" | "en-route" | "completed" | "cancelled"
//   availableSeats: number
//   basePrice: number
//   seatMap: SeatMap
// }

// export interface Bus {
//   id: string
//   plateNo: string
//   type: string
//   capacity: number
//   amenities: string[]
// }

// export interface SeatMap {
//   rows: number
//   columns: number
//   seats: Seat[]
// }

// export interface Seat {
//   seatNo: string
//   row: number
//   column: number
//   class: "economy" | "business" | "vip"
//   isBooked: boolean
//   isLocked?: boolean
//   price: number
// }

// export interface Booking {
//   id: string
//   tripId: string
//   trip: Trip
//   userId: string
//   seats: BookedSeat[]
//   luggage: LuggageItem[]
//   grossAmount: number
//   discountAmount: number
//   taxAmount: number
//   netAmount: number
//   paymentStatus: "pending" | "completed" | "failed" | "refunded"
//   bookingStatus: "confirmed" | "cancelled" | "completed"
//   bookingReference: string
//   qrCode: string
//   createdAt: string
// }

// export interface BookedSeat {
//   seatNo: string
//   passengerName: string
//   price: number
// }

// export interface LuggageItem {
//   id: string
//   description: string
//   weight: number
//   price: number
// }

// export interface BookingFormData {
//   tripId: string
//   seats: {
//     seatNo: string
//     passengerName: string
//   }[]
//   luggage: {
//     description: string
//     weight: number
//   }[]
//   discountCode?: string
// }

// export interface SearchParams {
//   origin: string
//   destination: string
//   date: string
//   passengers?: number
// }

// export interface DynamicContent {
//   id: string
//   title: string
//   content: string
//   updatedAt: string
// }
