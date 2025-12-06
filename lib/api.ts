// API configuration and helper functions
// Force use of local API proxy for relative paths to avoid env var confusion
const API_BASE_URL = "/api"
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://admin.summitcoachesug.com/api/v1"

export const API_ENDPOINTS = {
  // Authentication
  login: "/auth/login",
  register: "/auth/register",
  logout: "/auth/logout",
  profile: "/auth/profile",

  // Trips and Routes
  routes: "/routes",
  trips: "/trips",
  tripDetails: (id: string) => `/trips/${id}`,
  tripSeats: (id: string) => `/trips/${id}/seats`,

  // Bookings
  bookings: "/bookings",
  validateBooking: "/bookings/validate",
  bookingDetails: (id: string) => `/bookings/${id}`,
  cancelBooking: (id: string) => `/bookings/${id}/cancel`,

  // User
  userBookings: "/user/bookings",
  loyaltyPoints: "/user/loyalty-points",

  // Dynamic Content
  aboutUs: "/content/about",
  contactInfo: "/content/contact",
  terms: "/content/terms",
  faqs: "/content/faqs",

  // Seat Layouts (Backend API)
  seatLayouts: `${BACKEND_API_URL}/seat-layouts`,
  seatLayout: (id: string | number) => `${BACKEND_API_URL}/seat-layouts/${id}`,

  // Luggage Types (Backend API)
  luggageTypes: `${BACKEND_API_URL}/luggage-types`,
  luggageType: (id: string | number) => `${BACKEND_API_URL}/luggage-types/${id}`,

  // Discounts (Backend API)
  discounts: `${BACKEND_API_URL}/discounts`,
  validateDiscount: `${BACKEND_API_URL}/discounts/validate`,
  activeDiscounts: `${BACKEND_API_URL}/discounts/active/list`,

  // Seats (Backend API)
  seats: `${BACKEND_API_URL}/seats`,
  seat: (id: string | number) => `${BACKEND_API_URL}/seats/${id}`,
  seatsByBus: (busId: string | number) => `${BACKEND_API_URL}/seats/bus/${busId}`,

  // Buses
  buses: `${BACKEND_API_URL}/buses`,
  busDetails: (id: string | number) => `${BACKEND_API_URL}/buses/${id}`,
  busSeatMap: (id: string | number) => `${BACKEND_API_URL}/buses/${id}/seat-map`,
  busSeats: (id: string | number) => `${BACKEND_API_URL}/buses/${id}/seats`,
  busTrips: (id: string | number) => `${BACKEND_API_URL}/buses/${id}/trips`,
  busStatus: (id: string | number) => `${BACKEND_API_URL}/buses/${id}/status`,
  searchBuses: `${BACKEND_API_URL}/buses/search`,
  availableBuses: `${BACKEND_API_URL}/buses/available`,

  // Bus Types
  busTypes: `${BACKEND_API_URL}/bus-types`,
  busTypeDetails: (id: string | number) => `${BACKEND_API_URL}/bus-types/${id}`,
  busTypeBuses: (id: string | number) => `${BACKEND_API_URL}/bus-types/${id}/buses`,
  busTypesDropdown: `${BACKEND_API_URL}/bus-types/dropdown`,

  // Fares
  fares: `${BACKEND_API_URL}/fares`,
  fareDetails: (id: string | number) => `${BACKEND_API_URL}/fares/${id}`,
  activeFares: `${BACKEND_API_URL}/fares/active`,
  routeFares: (routeId: string | number) => `${BACKEND_API_URL}/routes/${routeId}/fares`,
  routeDefaultFare: (routeId: string | number) => `${BACKEND_API_URL}/routes/${routeId}/default-fare`,
  busTypeFares: (busTypeId: string | number) => `${BACKEND_API_URL}/fares/bus-type/${busTypeId}`,
}

export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // Handle absolute URLs (e.g., from BACKEND_API_URL)
  const isAbsolute = endpoint.startsWith('http://') || endpoint.startsWith('https://');
  const url = isAbsolute ? endpoint : `${API_BASE_URL}${endpoint}`

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  }

  // Get auth token from localStorage if available
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "An error occurred" }))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

export const api = {
  get: <T = any>(endpoint: string) => apiRequest<T>(endpoint, { method: "GET" }),
  post: <T = any>(endpoint: string, data?: any) =>
    apiRequest<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  put: <T = any>(endpoint: string, data?: any) =>
    apiRequest<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: <T = any>(endpoint: string) => apiRequest<T>(endpoint, { method: "DELETE" }),
}
