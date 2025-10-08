// API configuration and helper functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

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
}

export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const defaultHeaders = {
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
  get: (endpoint: string) => apiRequest(endpoint, { method: "GET" }),
  post: (endpoint: string, data?: any) =>
    apiRequest(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  put: (endpoint: string, data?: any) =>
    apiRequest(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (endpoint: string) => apiRequest(endpoint, { method: "DELETE" }),
}
