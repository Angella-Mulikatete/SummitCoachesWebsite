// // API configuration and helper functions
// // Force use of local API proxy for relative paths to avoid env var confusion
// const API_BASE_URL = "/api"
// const BACKEND_API_URL = "/proxy"

// export const API_ENDPOINTS = {
//   // Authentication (Moved below to use BACKEND_API_URL)

//   // Trips and Routes
//   routes: "/routes",
//   trips: "/trips",
//   tripDetails: (id: string) => `/trips/${id}`,
//   tripSeats: (id: string) => `/trips/${id}/seats`,

//   // Bookings
//   bookings: "/bookings",
//   validateBooking: "/bookings/validate",
//   bookingDetails: (id: string) => `/bookings/${id}`,
//   cancelBooking: (id: string) => `/bookings/${id}/cancel`,

//   // User
//   userBookings: "/user/bookings",
//   loyaltyPoints: "/user/loyalty-points",

//   // Dynamic Content
//   aboutUs: "/content/about",
//   contactInfo: "/content/contact",
//   terms: "/content/terms",
//   faqs: "/content/faqs",

//   // Seat Layouts (Backend API)
//   seatLayouts: `${BACKEND_API_URL}/seat-layouts`,
//   seatLayout: (id: string | number) => `${BACKEND_API_URL}/seat-layouts/${id}`,

//   // Luggage Types (Backend API)
//   luggageTypes: `${BACKEND_API_URL}/luggage-types`,
//   luggageType: (id: string | number) => `${BACKEND_API_URL}/luggage-types/${id}`,

//   // Discounts (Backend API)
//   discounts: `${BACKEND_API_URL}/discounts`,
//   validateDiscount: `${BACKEND_API_URL}/discounts/validate`,
//   activeDiscounts: `${BACKEND_API_URL}/discounts/active/list`,

//   // Seats (Backend API)
//   seats: `${BACKEND_API_URL}/seats`,
//   seat: (id: string | number) => `${BACKEND_API_URL}/seats/${id}`,
//   seatsByBus: (busId: string | number) => `${BACKEND_API_URL}/seats/bus/${busId}`,

//   // Buses
//   buses: `${BACKEND_API_URL}/buses`,
//   busDetails: (id: string | number) => `${BACKEND_API_URL}/buses/${id}`,
//   busSeatMap: (id: string | number) => `${BACKEND_API_URL}/buses/${id}/seat-map`,
//   busSeats: (id: string | number) => `${BACKEND_API_URL}/buses/${id}/seats`,
//   busTrips: (id: string | number) => `${BACKEND_API_URL}/buses/${id}/trips`,
//   busStatus: (id: string | number) => `${BACKEND_API_URL}/buses/${id}/status`,
//   searchBuses: `${BACKEND_API_URL}/buses/search`,
//   availableBuses: `${BACKEND_API_URL}/buses/available`,

//   // Bus Types
//   busTypes: `${BACKEND_API_URL}/bus-types`,
//   busTypeDetails: (id: string | number) => `${BACKEND_API_URL}/bus-types/${id}`,
//   busTypeBuses: (id: string | number) => `${BACKEND_API_URL}/bus-types/${id}/buses`,
//   busTypesDropdown: `${BACKEND_API_URL}/bus-types/dropdown`,

//   // Parcel Types
//   parcelTypes: `${BACKEND_API_URL}/parcel-types`,
//   parcelType: (id: string | number) => `${BACKEND_API_URL}/parcel-types/${id}`,
//   calculateParcelCharges: (id: string | number) => `${BACKEND_API_URL}/parcel-types/${id}/calculate-charges`,

//   // Promo Codes
//   promoCodes: `${BACKEND_API_URL}/promo-codes`,
//   promoCode: (id: string | number) => `${BACKEND_API_URL}/promo-codes/${id}`,
//   checkPromoUsage: (id: string | number) => `${BACKEND_API_URL}/promo-codes/${id}/usage`,
//   publicPromoCodes: `${BACKEND_API_URL}/promo-codes/public/list`,

//   // Auth
//   register: `${BACKEND_API_URL}/auth/register`,
//   login: `${BACKEND_API_URL}/auth/login`,
//   logout: `${BACKEND_API_URL}/auth/logout`,
//   profile: `${BACKEND_API_URL}/auth/profile`,

//   // Fares
//   fares: `${BACKEND_API_URL}/fares`,
//   fareDetails: (id: string | number) => `${BACKEND_API_URL}/fares/${id}`,
//   activeFares: `${BACKEND_API_URL}/fares/active`,
//   routeFares: (routeId: string | number) => `${BACKEND_API_URL}/routes/${routeId}/fares`,
//   routeDefaultFare: (routeId: string | number) => `${BACKEND_API_URL}/routes/${routeId}/default-fare`,
//   busTypeFares: (busTypeId: string | number) => `${BACKEND_API_URL}/fares/bus-type/${busTypeId}`,
// }

// export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
//   // Handle absolute URLs (e.g., from BACKEND_API_URL)
//   const isAbsolute = endpoint.startsWith('http://') || endpoint.startsWith('https://');
//   const url = isAbsolute ? endpoint : `${API_BASE_URL}${endpoint}`

//   const defaultHeaders: Record<string, string> = {
//     "Content-Type": "application/json",
//   }

//   // Get auth token from localStorage if available
//   const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
//   if (token) {
//     defaultHeaders["Authorization"] = `Bearer ${token}`
//   }

//   const config: RequestInit = {
//     ...options,
//     headers: {
//       ...defaultHeaders,
//       ...options?.headers,
//     },
//   }
//   try {
//     const response = await fetch(url, config)

//     if (!response.ok) {
//       let errorMessage = `HTTP error! status: ${response.status}`
//       try {
//         const errorData = await response.json()
//         errorMessage = errorData.message || errorMessage
//       } catch {
//         // If parsing JSON fails, fallback to status text default
//       }
//       throw new Error(errorMessage)
//     }

//     // Handle 204 No Content
//     if (response.status === 204) {
//       return {} as T
//     }

//     return response.json()
//   } catch (error) {
//     console.error("API Request failed:", error)
//     throw error
//   }
// }

// API configuration and helper functions
// Force use of local API proxy for relative paths to avoid env var confusion
const API_BASE_URL = "/api"
const BACKEND_API_URL = "/proxy"

export const API_ENDPOINTS = {
  // ==================== AUTH (Use Next.js API Routes) ====================
  register: "/auth/register",  
  login: "/auth/login",        
  logout: "/auth/logout",      
  profile: "/auth/profile",    

  // ==================== TRIPS AND ROUTES ====================
  routes: "/routes",
  trips: "/trips",
  tripDetails: (id: string | number) => `/trips/${id}`,
  tripSeats: (id: string | number) => `/trips/${id}/seats`,
  routeFares: (routeId: string | number) => `/routes/${routeId}/fares`,
  routeTrips: (routeId: string | number) => `/routes/${routeId}/trips`,

  // ==================== BOOKINGS (Use Next.js API Routes) ====================
  bookings: "/bookings",                                    // ✅ Added
  createBooking: "/bookings",                               // ✅ Added (POST to /bookings)
  validateBooking: "/bookings/validate",
  bookingDetails: (id: string | number) => `/bookings/${id}`,
  cancelBooking: (id: string | number) => `/bookings/${id}/cancel`,
  confirmBooking: (id: string | number) => `/bookings/${id}/confirm`,

  // ==================== USER ====================
  userBookings: "/user/bookings",
  myBookings: "/my-bookings",                              // ✅ Added
  loyaltyPoints: "/user/loyalty-points",

  // ==================== PAYMENTS ====================
  payments: "/payments",                                    // ✅ Added
  initializePayment: "/payments",                          // ✅ Added
  paymentStatus: (id: string | number) => `/payments/${id}/status`,

  // ==================== DYNAMIC CONTENT ====================
  aboutUs: "/content/about",
  contactInfo: "/content/contact",
  terms: "/content/terms",
  faqs: "/content/faqs",

  // ==================== SEAT LAYOUTS (Backend API) ====================
  seatLayouts: `${BACKEND_API_URL}/seat-layouts`,
  seatLayout: (id: string | number) => `${BACKEND_API_URL}/seat-layouts/${id}`,

  // ==================== LUGGAGE TYPES (Backend API) ====================
  luggageTypes: `${BACKEND_API_URL}/luggage-types`,
  luggageType: (id: string | number) => `${BACKEND_API_URL}/luggage-types/${id}`,

  // ==================== DISCOUNTS (Backend API) ====================
  discounts: `${BACKEND_API_URL}/discounts`,
  validateDiscount: `${BACKEND_API_URL}/discounts/validate`,
  activeDiscounts: `${BACKEND_API_URL}/discounts/active/list`,

  // ==================== SEATS (Backend API) ====================
  seats: `${BACKEND_API_URL}/seats`,
  seat: (id: string | number) => `${BACKEND_API_URL}/seats/${id}`,
  seatsByBus: (busId: string | number) => `${BACKEND_API_URL}/seats/bus/${busId}`,
  tripSeatsBackend: (tripId: string | number) => `${BACKEND_API_URL}/seats/trip/${tripId}`,

  // ==================== BUSES (Backend API) ====================
  buses: `${BACKEND_API_URL}/buses`,
  busDetails: (id: string | number) => `${BACKEND_API_URL}/buses/${id}`,
  busSeatMap: (id: string | number) => `${BACKEND_API_URL}/buses/${id}/seat-map`,
  busSeats: (id: string | number) => `${BACKEND_API_URL}/buses/${id}/seats`,
  busTrips: (id: string | number) => `${BACKEND_API_URL}/buses/${id}/trips`,
  busStatus: (id: string | number) => `${BACKEND_API_URL}/buses/${id}/status`,
  searchBuses: `${BACKEND_API_URL}/buses/search`,
  availableBuses: `${BACKEND_API_URL}/buses/available`,

  // ==================== BUS TYPES (Backend API) ====================
  busTypes: `${BACKEND_API_URL}/bus-types`,
  busTypeDetails: (id: string | number) => `${BACKEND_API_URL}/bus-types/${id}`,
  busTypeBuses: (id: string | number) => `${BACKEND_API_URL}/bus-types/${id}/buses`,
  busTypesDropdown: `${BACKEND_API_URL}/bus-types/dropdown`,

  // ==================== PARCEL TYPES (Backend API) ====================
  parcelTypes: `${BACKEND_API_URL}/parcel-types`,
  parcelType: (id: string | number) => `${BACKEND_API_URL}/parcel-types/${id}`,
  calculateParcelCharges: (id: string | number) => `${BACKEND_API_URL}/parcel-types/${id}/calculate-charges`,

  // ==================== PROMO CODES (Backend API) ====================
  promoCodes: `${BACKEND_API_URL}/promo-codes`,
  promoCode: (id: string | number) => `${BACKEND_API_URL}/promo-codes/${id}`,
  validatePromoCode: `${BACKEND_API_URL}/promo-codes/validate`,  // ✅ Added
  checkPromoUsage: (id: string | number) => `${BACKEND_API_URL}/promo-codes/${id}/usage`,
  publicPromoCodes: `${BACKEND_API_URL}/promo-codes/public/list`,

  // ==================== FARES (Backend API) ====================
  fares: `${BACKEND_API_URL}/fares`,
  fareDetails: (id: string | number) => `${BACKEND_API_URL}/fares/${id}`,
  activeFares: `${BACKEND_API_URL}/fares/active`,
  routeFaresBackend: (routeId: string | number) => `${BACKEND_API_URL}/routes/${routeId}/fares`,
  routeDefaultFare: (routeId: string | number) => `${BACKEND_API_URL}/routes/${routeId}/default-fare`,
  busTypeFares: (busTypeId: string | number) => `${BACKEND_API_URL}/fares/bus-type/${busTypeId}`,

  // ==================== PASSENGERS ====================
  passengers: `${BACKEND_API_URL}/passengers`,
  lookupPassenger: (phone: string) => `/passengers/lookup?phone=${encodeURIComponent(phone)}`, // ✅ Uses Next.js route
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
    console.log(`🌐 API Request: ${config.method || 'GET'} ${url}`)
    
    const response = await fetch(url, config)

    if (!response.ok) {
      let errorData: any = null
      let errorMessage = `HTTP error! status: ${response.status}`
      
      try {
        errorData = await response.json()
        errorMessage = errorData.message || errorMessage
        
        // ✅ Enhanced error logging
        console.error(`❌ API Error (${response.status}):`, {
          endpoint: url,
          message: errorMessage,
          errors: errorData.errors,
          fullResponse: errorData
        })
        
        // ✅ Throw error with validation details if present
        if (errorData.errors) {
          const error = new Error(errorMessage) as any
          error.errors = errorData.errors
          error.status = response.status
          throw error
        }
      } catch (parseError) {
        // If parsing JSON fails, use status text
        console.error(`❌ API Error (${response.status}): Failed to parse error response`)
      }
      
      const error = new Error(errorMessage) as any
      error.status = response.status
      throw error
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T
    }

    const data = await response.json()
    console.log(`✅ API Response: ${url}`, data)
    
    return data
  } catch (error) {
    console.error("❌ API Request failed:", error)
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
