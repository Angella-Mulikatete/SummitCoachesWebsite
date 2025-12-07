// src/lib/types.ts

// ==================== ROUTE TYPES ====================
export interface Route {
  id: string | number
  name: string
  code: string
  destination: string
  base_fare: number
  active: boolean

  // Additional fields from RouteController
  direction?: 'departure' | 'arrival' | 'both'
  distance_km?: number
  duration_minutes?: number
  next_trip_date?: string
  available_trips_count?: number
  min_fare?: number
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
  fares: Fare[]
}

export interface RouteWithTrips {
  route: Route
  trips: Trip[]
}

export interface RouteSearchParams {
  company_id?: number
  active?: boolean
  has_trips?: boolean
  search?: string
  date_filter?: string
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
  bus_id?: number // Added for bus relationship
  bus_registration?: string // From RouteController
  fare: number
  available_seats: number
  total_seats?: number
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

  // ✅ ADDED: Route relationship fields
  route_id?: number | string // Route ID from API

  // Nested objects
  bus?: {
    registrationNumber: string
    plateNo: string
    type: string
    capacity: string
    amenities?: string[]
  }
  route?: {
    id?: number | string // ✅ ADDED: Route ID
    origin: string
    destination: string
    name: string
    distanceKm: number
    estimatedDuration: string
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

export interface TripSearchParams {
  // Location filters
  origin?: string
  destination?: string
  route_id?: string | number

  // Date filters
  date?: string // Specific date (YYYY-MM-DD)
  trip_date?: string // Alias for date

  // ✅ NEW: Control whether to show only upcoming trips
  upcoming_only?: boolean // Default: true

  // Pagination
  page?: number
  per_page?: number

  // Other filters
  featured?: boolean
  limit?: number
  min_seats?: number
}




// ==================== SEAT TYPES ====================
export interface Seat {
  id: number
  bus_id: number
  seat_number: string
  row_label: string
  position_x: number
  position_y: number
  is_window: boolean
  is_reserved: boolean
  active: boolean
  status: 'available' | 'booked' | 'reserved' | 'maintenance' | 'broken'
  creator?: any
  bus?: {
    id: number
    registration_number: string
    [key: string]: any
  }
}

export interface SeatMap {
  trip_id: number
  layout: Seat[]
  total_rows: number
  seats_per_row: number
}

// ==================== SEAT LAYOUT TYPES (FROM API) ====================
export interface SeatLayoutSeat {
  id: string // e.g., "A1", "B2"
  number: number
  row: string // e.g., "A", "B", "C"
  column: number
  type: "seat" | "aisle" | "empty"
  status: "available" | "booked" | "reserved"
}

export interface SeatLayoutMap {
  rows: number
  columns: number
  total_seats: number
  seats: SeatLayoutSeat[][] // Array of rows, each containing seats
  version: string
}

export interface SeatLayout {
  id: number
  bus_type_id: string | number
  layout_name: string
  code: string
  description: string | null
  rows: string | number
  columns: string | number
  seat_map: SeatLayoutMap
  total_seats: string | number
  active: boolean
  status: string
  bus_type: {
    id: number
    name: string
  }
}

// ==================== BOOKING TYPES ====================
export interface PassengerInfo {
  id?: number
  name: string
  phone: string
  email?: string | null
  passenger_type?: 'adult' | 'child' | 'student' | 'senior'
  is_walkin?: boolean
  is_verified?: boolean
  total_bookings?: number
  loyalty_points?: number
  last_booking_date?: string
  created_at?: string
}

export interface Luggage {
  id?: number
  tracking_code?: string
  type?: string
  weight?: number | null
  charge?: number
  description?: string | null
  status?: string
  is_with_passenger?: boolean
  sender_name?: string | null
  sender_contact?: string | null
  receiver_name?: string | null
  receiver_contact?: string | null
}

// ==================== LUGGAGE TYPE (FROM API) ====================
export interface LuggageType {
  id: number
  name: string
  description: string | null
  base_charge: number
  max_weight: number | null
  charge_per_kg: number | null
  active: boolean
  created_at: string
  updated_at: string
}

export interface Parcel {
  id?: number
  tracking_code?: string
  description?: string | null
  weight?: number | null
  charge?: number
  status?: string
  sender_name: string
  sender_contact: string
  receiver_name: string
  receiver_contact: string
  pickup_location?: string | null
  dropoff_location?: string | null
}

export type BookingType = 'passenger' | 'luggage' | 'parcel' | 'mixed'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
export type PaymentMethod = 'cash' | 'mobile_money' | 'card' | 'bank_transfer'
export type PassengerType = 'adult' | 'child' | 'infant' | 'student' | 'senior'

export interface Booking {
  id: number
  reference: string
  booking_type: BookingType
  status: BookingStatus
  payment_status: PaymentStatus
  payment_method?: PaymentMethod | null
  grand_total: number
  travel_date: string
  created_at: string
  updated_at?: string
  passenger?: PassengerInfo | null
  trip?: Trip
  seat?: Seat | null
  ticket?: {
    seat_number: string
    amount_paid: number
  } | null
  luggages?: Luggage[]
  parcels?: Parcel[]
}

// export interface CreateBookingPayload {
//   trip_id: number
//   booking_type: BookingType
//   payment_status: PaymentStatus
//   payment_method?: PaymentMethod
//   seat_id?: number
//   fare_id?: number
//   discount_id?: number
//   promo_code?: string

//   // Passenger details
//   passenger_id?: number
//   passenger_name?: string
//   passenger_phone?: string
//   passenger_email?: string
//   passenger_type?: 'adult' | 'child' | 'student' | 'senior'

//   // Luggage details
//   luggage_type_id?: number
//   luggage_count?: number
//   luggage_weight?: number
//   luggage_description?: string
//   luggage_charge?: number

//   // Parcel details
//   parcel_type_id?: number
//   parcel_count?: number
//   parcel_weight?: number
//   parcel_description?: string
//   parcel_charge?: number

//   // Sender/Receiver (for luggage/parcel)
//   sender_name?: string
//   sender_contact?: string
//   sender_email?: string
//   receiver_name?: string
//   receiver_contact?: string
//   receiver_email?: string
//   pickup_location?: string
//   dropoff_location?: string

//   // Group booking
//   is_group_booking?: boolean
//   group_size?: number
//   group_passengers?: Array<{
//     name: string
//     phone?: string
//     email?: string
//     passenger_type?: 'adult' | 'child' | 'student' | 'senior'
//   }>
// }

export interface CreateBookingPayload {
  // Required fields
  trip_id: number
  booking_type: BookingType
  payment_status: PaymentStatus
  payment_method: 'cash' | 'mobile_money' | 'card' | 'bank_transfer'
  
  // Seat booking (required for passenger bookings)
  seat_id?: number
  
  // Discount & Promo
  discount_id?: number
  promo_code?: string
  
  // Passenger details (required for passenger bookings)
  // passenger_id?: number
  passenger_name?: string
  passenger_phone?: string
  passenger_email?: string
  passenger_type?: PassengerType
  
  // Luggage details (optional for passenger, required for luggage bookings)
  luggage_type_id?: number
  luggage_count?: number
  luggage_weight?: number
  luggage_description?: string
  
  // Parcel details (required for parcel bookings)
  parcel_type_id?: number
  parcel_count?: number
  parcel_weight?: number
  parcel_description?: string
  sender_name?: string
  sender_contact?: string
  sender_email?: string
  receiver_name?: string
  receiver_contact?: string
  receiver_email?: string
  pickup_location?: string
  dropoff_location?: string
  
  // Group booking
  is_group_booking?: boolean
  group_passengers?: GroupPassenger[]
}

export interface GroupPassenger {
  name: string
  phone: string
  email?: string
  passenger_type: PassengerType
}

export interface BookingSummary {
  total_bookings: number
  total_revenue: number
  paid_bookings?: number
  pending_bookings?: number
  cancelled_bookings?: number
  today?: {
    bookings: number
    revenue: number
    pending?: number
  }
  yesterday?: {
    bookings: number
    revenue: number
  }
  this_week?: {
    bookings: number
    revenue: number
  }
  this_month?: {
    bookings: number
    revenue: number
  }
  upcoming_trips?: number
  completed_trips?: number
  cancelled_trips?: number
  daily_average?: {
    bookings: number
    revenue: number
  }
}

export interface BookingResponse {
  success: boolean
  message: string
  data: {
    id: number
    reference: string
    booking_type: BookingType
    status: 'confirmed' | 'pending' | 'cancelled'
    grand_total: number
    travel_date: string
    passenger?: {
      id: number
      name: string
      phone: string
      email?: string
    }
    trip: {
      id: number
      departure_time: string
      route: {
        name: string
        origin: string
        destination: string
      }
    }
    ticket?: {
      seat_number: string
      amount_paid: number
    }
    luggages?: Array<{
      tracking_code: string
      weight: number
      charge: number
    }>
    parcels?: Array<{
      tracking_code: string
      weight: number
      charge: number
      sender_name: string
      receiver_name: string
    }>
  }
}

export interface PromoCode {
  id: number
  code: string
  description?: string | null
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  formatted_value?: string
  valid_from: string
  valid_to: string | null
  max_uses?: number | null
  used_count?: number
  remaining_uses?: number
  is_public: boolean
  is_active: boolean
  min_booking_amount?: number | null
  max_discount_amount?: number | null
  requires_insurance?: boolean
  insurance_percentage?: number | null
}

// ==================== DISCOUNT TYPES (FROM API) ====================
export interface Discount {
  id: number
  name: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  formatted_value?: string
  max_uses: number | null
  used_count: number
  is_active: boolean
  start_date: string | null
  end_date: string | null
  created_at: string
  updated_at: string
}

export interface DiscountValidationResponse {
  success: boolean
  message?: string
  data?: {
    discount: Discount
    discount_amount: number
    final_amount: number
  }
  status_code?: number
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
  message?: string
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

export interface SelectedLuggage {
  id: string
  type_id: number
  type_name: string
  quantity: number
  weight: number
  total_charge: number
  base_charge: number
  charge_per_kg: number
}

// Temporary interface for UI Seat until we fully align with API
export interface UISeat {
  seatNo: string
  row: number
  column: number
  price: number
  class?: string
}

// ==================== NEW BACKEND TYPES ====================

export interface Bus {
  id: number
  registration_number: string
  capacity: number
  active: boolean
  status: string
  company?: {
    id: number
    name: string
    logo?: string
  }
  bus_type?: {
    id: number
    name: string
    description?: string
  }
  seat_layout?: {
    id: number
    total_seats: number
    rows: number
    columns: number
  }
}

// ==================== NEW AUTH TYPES ====================
export interface RegisterPayload {
  name: string
  email?: string
  phone: string
  password?: string
  password_confirmation?: string
  gender?: string
  address?: string
}

export interface LoginPayload {
  login: string
  password?: string
}

// ==================== PARCEL TYPES ====================
export interface ParcelType {
  id: number
  name: string
  description?: string
  min_weight: number
  max_weight: number
  base_charge: number
  charge_per_kg: number
  requires_insurance: boolean
  insurance_percentage?: number
  active: boolean
}

export interface CalculateParcelChargesPayload {
  parcel_type_id: number
  weight: number
  declared_value?: number // for insurance
}

export interface CalculateParcelChargesResponse {
  success: boolean
  data: {
    base_charge: number
    weight_charge: number
    insurance_charge: number
    total_charge: number
  }
}

// ==================== PROMO TYPES ====================
export interface PromoUsageResponse {
  success: boolean
  data: {
    count: number
    limit: number
    remaining: number
    can_use: boolean
  }
}

export interface Fare {
  id: number
  route_id: number
  bus_type_id: number | null
  base_amount: number
  fare_type: 'standard' | 'discount' | 'special' | 'holiday' | 'promotional' | 'student' | 'senior' | 'group'
  is_peak: boolean
  is_default: boolean
  active: boolean
  effective_from: string | null
  effective_to: string | null
  bus_type?: {
    id: number
    name: string
  }
}
