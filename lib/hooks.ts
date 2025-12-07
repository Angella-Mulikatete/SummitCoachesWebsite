// src/lib/hooks.ts

import { useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { Trip, Booking, ApiResponse, Route, RouteSearchParams, RouteWithTrips, TripSearchParams, AuthResponse, BookingResponse, CreateBookingPayload } from './types'

// API base URL (calls Next.js API routes)
const API_BASE = '/api'

// Fetcher function for SWR with proper typing
const fetcher = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}

/**
 * Transform API trip data to include frontend-friendly fields
 */
function transformTrip(apiTrip: any): Trip {
  // Handle nested route object if present
  const origin = apiTrip.route?.origin || apiTrip.origin || '';
  const destination = apiTrip.route?.destination || apiTrip.destination || '';

  return {
    ...apiTrip,
    id: apiTrip.id,
    // Map API fields to frontend fields
    price: apiTrip.fare || apiTrip.price || 0,
    availableSeats: parseInt(apiTrip.remaining_seats || apiTrip.available_seats || apiTrip.availableSeats || 0),
    title: apiTrip.title || (origin && destination ? `${origin} to ${destination}` : 'Bus Trip'),
    description: apiTrip.description || (origin && destination ? `Bus trip from ${origin} to ${destination}` : ''),
    image: apiTrip.image || apiTrip.thumbnail || '/bus-placeholder.png',
    // Optional fields with defaults
    departureDate: apiTrip.trip_date || apiTrip.departureDate || apiTrip.date,
    departureTime: apiTrip.departure_time_12h || apiTrip.departure_time,
    arrivalTime: apiTrip.arrival_time_12h || apiTrip.arrival_time,
    returnDate: apiTrip.returnDate || undefined,
    features: apiTrip.features || [],
    // Nested objects
    bus: apiTrip.bus ? {
      registrationNumber: apiTrip.bus.registration_number,
      plateNo: apiTrip.bus.registration_number,
      type: apiTrip.bus.bus_type?.name || 'Standard',
      capacity: apiTrip.bus.capacity?.toString() || '0',
      amenities: apiTrip.bus.amenities || []
    } : undefined,
    route: apiTrip.route ? {
      id: apiTrip.route.id,
      origin: apiTrip.route.origin,
      destination: apiTrip.route.destination,
      name: apiTrip.route.name,
      distanceKm: apiTrip.route.distance_km || 0,
      estimatedDuration: apiTrip.route.estimated_duration || apiTrip.route.duration_minutes ? `${apiTrip.route.duration_minutes} minutes` : ''
    } : undefined,
    route_id: apiTrip.route_id || apiTrip.route?.id
  }
}

export function useTrips(params?: TripSearchParams) {
  // Build query params
  const queryParams: Record<string, string> = {};

  // ✅ FIX: ONLY send trip_date if user explicitly requested a specific date
  if (params?.trip_date || params?.date) {
    queryParams.trip_date = params.trip_date || params.date || '';
  }
  // ❌ DON'T send today's date by default - this filters OUT future trips!

  // Add other filters
  if (params?.origin) queryParams.origin = params.origin;
  if (params?.destination) queryParams.destination = params.destination;
  if (params?.route_id) queryParams.route_id = params.route_id.toString();
  if (params?.page) queryParams.page = params.page.toString();
  if (params?.per_page) queryParams.per_page = params.per_page.toString();

  // Construct query string
  const queryString = Object.keys(queryParams).length > 0
    ? '?' + new URLSearchParams(queryParams).toString()
    : '';

  console.log('🔍 useTrips query:', queryString);

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<any[]>>(
    `${API_BASE}/trips${queryString}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )

  // Transform API response to Trip[]
  let trips: Trip[] = []

  if (data) {
    // Check for API error response
    if ((data as any).success === false) {
      console.error('useTrips - API returned error:', (data as any).message)
      return { trips: [], isLoading: false, isError: (data as any).message || 'API Error', mutate }
    }

    const innerData = (data as any).data

    if (innerData) {
      // Check for 'trips' property (custom structure)
      if (innerData.trips && Array.isArray(innerData.trips)) {
        trips = innerData.trips.map(transformTrip)
      }
      // Check for Laravel pagination structure (data.data)
      else if (innerData.data && Array.isArray(innerData.data)) {
        trips = innerData.data.map(transformTrip)
      } else if (Array.isArray(innerData)) {
        trips = innerData.map(transformTrip)
      } else {
        console.error('useTrips - innerData is not an array or pagination object:', innerData)
      }
    } else if (Array.isArray(data)) {
      trips = data.map(transformTrip)
    } else {
      console.error('useTrips - Unexpected data structure:', data)
    }
  }

  console.log(`✅ useTrips returning ${trips.length} trips`);

  return {
    trips,
    isLoading,
    isError: error,
    mutate,
  }
}

/**
 * ✅ UPDATED: Hook specifically for searching trips
 */
export function useTripSearch(origin?: string, destination?: string, date?: string) {
  return useTrips({
    origin,
    destination,
    trip_date: date, // Only send date if explicitly provided
    per_page: 20
  });
}

/**
 * ✅ UPDATED: Hook for getting today's trips only
 */
export function useTodaysTrips(routeId?: string | number) {
  const today = new Date().toISOString().split('T')[0];

  return useTrips({
    route_id: routeId,
    trip_date: today, // Explicitly request today's date
    per_page: 50
  });
}

/**
 * Hook to fetch routes with optional filters
 */
export function useRoutes(params?: RouteSearchParams) {
  // Construct query string from params
  const queryString = params
    ? '?' + new URLSearchParams(
      Object.entries(params).reduce((acc, [key, val]) => {
        if (val !== undefined && val !== null) {
          acc[key] = String(val)
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()
    : ''

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Route[]>>(
    `${API_BASE}/routes${queryString}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )

  // Extract routes from response
  let routes: Route[] = []

  if (data) {
    // Check for API error response
    if ((data as any).success === false) {
      console.error('useRoutes - API returned error:', (data as any).message)
      return { routes: [], isLoading: false, isError: (data as any).message || 'API Error', mutate }
    }

    const innerData = (data as any).data

    if (Array.isArray(innerData)) {
      routes = innerData
    } else if (innerData?.data && Array.isArray(innerData.data)) {
      routes = innerData.data
    } else {
      console.error('useRoutes - Unexpected data structure:', data)
    }
  }

  return {
    routes,
    isLoading,
    isError: error,
    mutate,
  }
}

/**
 * Hook to fetch a single route by ID
 */
export function useRoute(id: string | number) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<any>>(
    id ? `${API_BASE}/routes/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const route: Route | undefined = data?.data || undefined

  return {
    route,
    isLoading,
    isError: error,
    mutate,
  }
}

/**
 * ✅ IMPROVED: Hook to fetch trips for a specific route (upcoming only by default)
 */
export function useRouteTrips(
  routeId: string | number,
  params?: { date?: string; date_filter?: string; min_seats?: number; upcoming_only?: boolean }
) {
  // Build query params
  const queryParams: Record<string, string> = {};

  // ✅ Default to upcoming trips
  const upcomingOnly = params?.upcoming_only !== false;

  if (params?.date) {
    queryParams.date = params.date;
  } else if (upcomingOnly) {
    // Default to today onwards
    queryParams.date = new Date().toISOString().split('T')[0];
  }

  if (params?.date_filter) queryParams.date_filter = params.date_filter;
  if (params?.min_seats) queryParams.min_seats = params.min_seats.toString();

  const queryString = Object.keys(queryParams).length > 0
    ? '?' + new URLSearchParams(queryParams).toString()
    : '';

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<RouteWithTrips>>(
    routeId ? `${API_BASE}/routes/${routeId}/trips${queryString}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  // Extract route and trips from response
  let route: Route | undefined = undefined
  let trips: Trip[] = []

  if (data && (data as any).success !== false) {
    const innerData = (data as any).data
    console.log('🪝 useRouteTrips raw data:', innerData); // DEBUG LOG
    if (innerData) {
      route = innerData.route
      if (Array.isArray(innerData.trips)) {
        trips = innerData.trips.map(transformTrip)
      }
    }
  }

  return {
    route,
    trips,
    isLoading,
    isError: error,
    mutate,
  }
}

/**
 * Hook to fetch a single trip by ID
 */
export function useTrip(id: string | number) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<any>>(
    id ? `${API_BASE}/trips/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  // Transform single trip
  const trip: Trip | undefined = data?.data ? transformTrip(data.data) : undefined

  return {
    trip,
    isLoading,
    isError: error,
    mutate,
  }
}

/**
 * Hook to fetch available seats for a trip
 */
export function useAvailableSeats(tripId: string | number) {
  const { data, error, isLoading, mutate } = useSWR(
    tripId ? `${API_BASE}/trips/${tripId}/seats` : null,
    fetcher
  )

  return {
    seats: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}

// /**
//  * Hook to create a booking
//  */
// export function useCreateBooking() {
//   const [isLoading, setIsLoading] = useState(false)

//   const createBooking = async (bookingData: any) => {
//     setIsLoading(true)
//     try {
//       const response = await axios.post<ApiResponse<Booking>>(
//         `${API_BASE}/bookings`,
//         bookingData
//       )
//       return response.data
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         throw new Error(
//           error.response?.data?.message || 'Failed to create booking'
//         )
//       }
//       throw error
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return { createBooking, isLoading }
// }

// /**
//  * Hook to fetch user's bookings (requires auth)
//  */
// export function useMyBookings(status?: string) {
//   const queryString = status ? `?status=${status}` : ''

//   const { data, error, isLoading, mutate } = useSWR<ApiResponse<Booking[]>>(
//     `${API_BASE}/my-bookings${queryString}`,
//     fetcher,
//     {
//       revalidateOnFocus: true,
//     }
//   )

//   return {
//     bookings: data?.data || [],
//     isLoading,
//     isError: error,
//     mutate,
//   }
// }


export function useCreateBooking() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createBooking = async (bookingData: CreateBookingPayload): Promise<BookingResponse> => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Get auth token if available
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
      
      const headers: any = {
        'Content-Type': 'application/json',
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      console.log('📤 Submitting booking payload:', JSON.stringify(bookingData, null, 2))

      const response = await axios.post<BookingResponse>(
        `${API_BASE}/bookings`,
        bookingData,
        { headers }
      )

      console.log('✅ Booking response:', response.data)

      return response.data
    } catch (err) {
      console.error('❌ Booking error:', err)
      
      if (axios.isAxiosError(err)) {
        // ✅ LOG VALIDATION ERRORS
        console.error('❌ Validation errors:', err.response?.data?.errors)
        console.error('❌ Error message:', err.response?.data?.message)
        console.error('❌ Full response:', err.response?.data)
        
        const errorMessage = err.response?.data?.message || 'Failed to create booking'
        const validationErrors = err.response?.data?.errors
        
        // Combine error message with validation details
        let fullErrorMessage = errorMessage
        if (validationErrors && typeof validationErrors === 'object') {
          const errorDetails = Object.entries(validationErrors)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('\n')
          fullErrorMessage = `${errorMessage}\n\n${errorDetails}`
        }
        
        setError(fullErrorMessage)
        throw new Error(fullErrorMessage)
      }
      
      setError('An unexpected error occurred')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { createBooking, isLoading, error }
}

/**
 * Hook to fetch user's bookings (requires auth)
 */
export function useMyBookings(status?: string) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  const queryString = status ? `?status=${status}` : ''

  const { data, error, isLoading, mutate } = useSWR<BookingResponse>(
    token ? `${API_BASE}/bookings${queryString}` : null,
    async (url) => {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return response.data
    },
    {
      revalidateOnFocus: true,
    }
  )

  return {
    bookings: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

/**
 * Hook to confirm a booking
 */
export function useConfirmBooking() {
  const confirmBooking = async (bookingId: number | string) => {
    try {
      const response = await axios.post<ApiResponse<Booking>>(
        `${API_BASE}/bookings/${bookingId}/confirm`
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Failed to confirm booking'
        )
      }
      throw error
    }
  }

  return { confirmBooking }
}

/**
 * Hook to cancel a booking
 */
export function useCancelBooking() {
  const cancelBooking = async (
    bookingId: number | string,
    reason?: string
  ) => {
    try {
      const response = await axios.post<ApiResponse<Booking>>(
        `${API_BASE}/bookings/${bookingId}/cancel`,
        { reason }
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Failed to cancel booking'
        )
      }
      throw error
    }
  }

  return { cancelBooking }
}

/**
 * Hook to initialize payment
 */
export function useInitializePayment() {
  const initializePayment = async (paymentData: {
    booking_id: number | string
    amount: number
    phone_number: string
    payment_method: 'mobile_money' | 'card' | 'cash'
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE}/payments`,
        paymentData
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Failed to initialize payment'
        )
      }
      throw error
    }
  }

  return { initializePayment }
}

/**
 * Hook to check payment status
 */
export function usePaymentStatus(paymentId: string | number) {
  const { data, error, isLoading, mutate } = useSWR(
    paymentId ? `${API_BASE}/payments/${paymentId}/status` : null,
    fetcher,
    {
      refreshInterval: 5000, // Poll every 5 seconds
      revalidateOnFocus: true,
    }
  )

  return {
    payment: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}

// ==================== USER HOOKS ====================

/**
 * Hook to fetch current user profile
 */
export function useUserProfile() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

  const { data, error, isLoading, mutate } = useSWR<AuthResponse>(
    token ? `${API_BASE}/auth/profile` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

  return {
    user: data?.user || null,
    isLoading,
    isError: error,
    mutate,
  }
}

// ==================== SEAT HOOKS ====================

/**
 * Hook to fetch seats for a trip
 */
export function useTripSeats(tripId: string | number | null) {
  const { data, error, isLoading, mutate } = useSWR<any>(
    tripId ? `${API_BASE}/seats/trip/${tripId}` : null,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  )

  return {
    seats: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

// ==================== PASSENGER HOOKS ====================

/**
 * Hook to lookup passenger by phone number
 */
export function useLookupPassenger(phone: string | null) {
  const { data, error, isLoading, mutate } = useSWR<any>(
    phone ? `${API_BASE}/passengers/lookup?phone=${encodeURIComponent(phone)}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  )

  return {
    passenger: data?.data || null,
    exists: !!data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}

// ==================== FARE HOOKS ====================

/**
 * ✅ FIXED: Hook to fetch fares for a route - properly handles API response
 */
export function useRouteFares(routeId: string | number) {
  const { data, error, isLoading, mutate } = useSWR<any>(
    routeId ? `${API_BASE}/routes/${routeId}/fares` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

  // ✅ Ensure fares is ALWAYS an array
  let fares: any[] = []
  
  if (data) {
    console.log('🎫 Raw fares API response:', data); // DEBUG
    
    // Handle Laravel API response: { success: true, data: { fares: [...], route: {...} } }
    if (data.success && data.data) {
      const innerData = data.data
      
      // ✅ FIX: Check for nested fares array first (your actual structure)
      if (innerData.fares && Array.isArray(innerData.fares)) {
        fares = innerData.fares
      } 
      // Fallback: Direct array
      else if (Array.isArray(innerData)) {
        fares = innerData
      } 
      // Fallback: Single fare object
      else if (typeof innerData === 'object' && !innerData.route) {
        // Only wrap if it's not the route object
        fares = [innerData]
      }
    } 
    // Direct array response
    else if (Array.isArray(data)) {
      fares = data
    }
    // Nested data.data structure
    else if (data.data) {
      if (data.data.fares && Array.isArray(data.data.fares)) {
        fares = data.data.fares
      } else if (Array.isArray(data.data)) {
        fares = data.data
      }
    }
  }

  console.log(`✅ useRouteFares returning ${fares.length} fares for route ${routeId}`, fares);

  return {
    fares,
    isLoading,
    isError: error,
    mutate,
  }
}

// ==================== PROMO CODE HOOKS ====================

/**
 * Hook to validate promo code
 */
export function useValidatePromoCode() {
  const validatePromo = async (code: string, amount: number, context?: any) => {
    try {
      const response = await axios.post(`${API_BASE}/promo-codes/validate`, {
        code,
        amount,
        ...context,
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Failed to validate promo code'
        )
      }
      throw error
    }
  }

  return { validatePromo }
}

// ==================== BOOKING SUMMARY HOOKS ====================

/**
 * Hook to fetch booking summary statistics
 */
export function useBookingSummary() {
  const { data, error, isLoading, mutate } = useSWR<any>(
    `${API_BASE}/bookings/summary`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  )

  return {
    summary: data?.data || null,
    isLoading,
    isError: error,
    mutate,
  }
}






























// // src/lib/hooks.ts

// import { useState } from 'react'
// import useSWR from 'swr'
// import axios from 'axios'
// import { Trip, Booking, ApiResponse, Route, RouteSearchParams, RouteWithTrips } from './types'

// // API base URL (calls Next.js API routes)
// const API_BASE = '/api'

// // Fetcher function for SWR with proper typing
// const fetcher = async (url: string) => {
//   const response = await axios.get(url)
//   return response.data
// }

// /**
//  * Transform API trip data to include frontend-friendly fields
//  */
// function transformTrip(apiTrip: any): Trip {
//   // Handle nested route object if present
//   const origin = apiTrip.route?.origin || apiTrip.origin || '';
//   const destination = apiTrip.route?.destination || apiTrip.destination || '';

//   return {
//     ...apiTrip,
//     id: apiTrip.id,
//     // Map API fields to frontend fields
//     price: apiTrip.fare || apiTrip.price || 0,
//     availableSeats: parseInt(apiTrip.remaining_seats || apiTrip.available_seats || apiTrip.availableSeats || 0),
//     title: apiTrip.title || (origin && destination ? `${origin} to ${destination}` : 'Bus Trip'),
//     description: apiTrip.description || (origin && destination ? `Bus trip from ${origin} to ${destination}` : ''),
//     image: apiTrip.image || apiTrip.thumbnail || '/bus-placeholder.png',
//     // Optional fields with defaults
//     departureDate: apiTrip.trip_date || apiTrip.departureDate || apiTrip.date,
//     departureTime: apiTrip.departure_time_12h || apiTrip.departure_time,
//     arrivalTime: apiTrip.arrival_time_12h || apiTrip.arrival_time,
//     returnDate: apiTrip.returnDate || undefined,
//     features: apiTrip.features || [],
//     // Nested objects
//     bus: apiTrip.bus ? {
//       registrationNumber: apiTrip.bus.registration_number,
//       type: apiTrip.bus.bus_type?.name || 'Standard',
//       capacity: apiTrip.bus.capacity
//     } : undefined,
//     route: apiTrip.route ? {
//       origin: apiTrip.route.origin,
//       destination: apiTrip.route.destination,
//       name: apiTrip.route.name
//     } : undefined
//   }
// }

// /**
//  * Hook to fetch trips with optional filters
//  */
// export function useTrips(params?: Record<string, any>) {
//   // Construct query string from params
//   const queryString = params
//     ? '?' + new URLSearchParams(
//       Object.entries(params).reduce((acc, [key, val]) => {
//         if (val !== undefined && val !== null) {
//           acc[key] = String(val)
//         }
//         return acc
//       }, {} as Record<string, string>)
//     ).toString()
//     : ''

//   const { data, error, isLoading, mutate } = useSWR<ApiResponse<any[]>>(
//     `${API_BASE}/trips${queryString}`,
//     fetcher,
//     {
//       revalidateOnFocus: false,
//       revalidateOnReconnect: true,
//     }
//   )

//   // Transform API response to Trip[]
//   let trips: Trip[] = []

//   if (data) {
//     // Check for API error response
//     if ((data as any).success === false) {
//       console.error('useTrips - API returned error:', (data as any).message)
//       return { trips: [], isLoading: false, isError: (data as any).message || 'API Error', mutate }
//     }

//     const innerData = (data as any).data

//     if (innerData) {
//       // Check for 'trips' property (custom structure)
//       if (innerData.trips && Array.isArray(innerData.trips)) {
//         trips = innerData.trips.map(transformTrip)
//       }
//       // Check for Laravel pagination structure (data.data)
//       else if (innerData.data && Array.isArray(innerData.data)) {
//         trips = innerData.data.map(transformTrip)
//       } else if (Array.isArray(innerData)) {
//         trips = innerData.map(transformTrip)
//       } else {
//         console.error('useTrips - innerData is not an array or pagination object:', innerData)
//       }
//     } else if (Array.isArray(data)) {
//       trips = data.map(transformTrip)
//     } else {
//       console.error('useTrips - Unexpected data structure:', data)
//     }
//   }

//   return {
//     trips,
//     isLoading,
//     isError: error,
//     mutate,
//   }
// }

// /**
//  * Hook to fetch routes with optional filters
//  */
// export function useRoutes(params?: RouteSearchParams) {
//   // Construct query string from params
//   const queryString = params
//     ? '?' + new URLSearchParams(
//       Object.entries(params).reduce((acc, [key, val]) => {
//         if (val !== undefined && val !== null) {
//           acc[key] = String(val)
//         }
//         return acc
//       }, {} as Record<string, string>)
//     ).toString()
//     : ''

//   const { data, error, isLoading, mutate } = useSWR<ApiResponse<Route[]>>(
//     `${API_BASE}/routes${queryString}`,
//     fetcher,
//     {
//       revalidateOnFocus: false,
//       revalidateOnReconnect: true,
//     }
//   )

//   // Extract routes from response
//   let routes: Route[] = []

//   if (data) {
//     // Check for API error response
//     if ((data as any).success === false) {
//       console.error('useRoutes - API returned error:', (data as any).message)
//       return { routes: [], isLoading: false, isError: (data as any).message || 'API Error', mutate }
//     }

//     const innerData = (data as any).data

//     if (Array.isArray(innerData)) {
//       routes = innerData
//     } else if (innerData?.data && Array.isArray(innerData.data)) {
//       routes = innerData.data
//     } else {
//       console.error('useRoutes - Unexpected data structure:', data)
//     }
//   }

//   return {
//     routes,
//     isLoading,
//     isError: error,
//     mutate,
//   }
// }

// /**
//  * Hook to fetch trips for a specific route
//  */
// export function useRouteTrips(routeId: string | number, params?: { date?: string; date_filter?: string; min_seats?: number }) {
//   // Construct query string from params
//   const queryString = params
//     ? '?' + new URLSearchParams(
//       Object.entries(params).reduce((acc, [key, val]) => {
//         if (val !== undefined && val !== null) {
//           acc[key] = String(val)
//         }
//         return acc
//       }, {} as Record<string, string>)
//     ).toString()
//     : ''

//   const { data, error, isLoading, mutate } = useSWR<ApiResponse<RouteWithTrips>>(
//     routeId ? `${API_BASE}/routes/${routeId}/trips${queryString}` : null,
//     fetcher,
//     {
//       revalidateOnFocus: false,
//     }
//   )

//   // Extract route and trips from response
//   let route: Route | undefined = undefined
//   let trips: Trip[] = []

//   if (data && (data as any).success !== false) {
//     const innerData = (data as any).data
//     if (innerData) {
//       route = innerData.route
//       if (Array.isArray(innerData.trips)) {
//         trips = innerData.trips.map(transformTrip)
//       }
//     }
//   }

//   return {
//     route,
//     trips,
//     isLoading,
//     isError: error,
//     mutate,
//   }
// }

// /**
//  * Hook to fetch a single trip by ID
//  */
// export function useTrip(id: string | number) {
//   const { data, error, isLoading, mutate } = useSWR<ApiResponse<any>>(
//     id ? `${API_BASE}/trips/${id}` : null,
//     fetcher,
//     {
//       revalidateOnFocus: false,
//     }
//   )

//   // Transform single trip
//   const trip: Trip | undefined = data?.data ? transformTrip(data.data) : undefined

//   return {
//     trip,
//     isLoading,
//     isError: error,
//     mutate,
//   }
// }

// /**
//  * Hook to fetch available seats for a trip
//  */
// export function useAvailableSeats(tripId: string | number) {
//   const { data, error, isLoading, mutate } = useSWR(
//     tripId ? `${API_BASE}/trips/${tripId}/seats` : null,
//     fetcher
//   )

//   return {
//     seats: data?.data,
//     isLoading,
//     isError: error,
//     mutate,
//   }
// }

// /**
//  * Hook to create a booking
//  */
// export function useCreateBooking() {
//   const [isLoading, setIsLoading] = useState(false)

//   const createBooking = async (bookingData: any) => {
//     setIsLoading(true)
//     try {
//       const response = await axios.post<ApiResponse<Booking>>(
//         `${API_BASE}/bookings`,
//         bookingData
//       )
//       return response.data
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         throw new Error(
//           error.response?.data?.message || 'Failed to create booking'
//         )
//       }
//       throw error
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return { createBooking, isLoading }
// }

// /**
//  * Hook to fetch user's bookings (requires auth)
//  */
// export function useMyBookings(status?: string) {
//   const queryString = status ? `?status=${status}` : ''

//   const { data, error, isLoading, mutate } = useSWR<ApiResponse<Booking[]>>(
//     `${API_BASE}/my-bookings${queryString}`,
//     fetcher,
//     {
//       revalidateOnFocus: true,
//     }
//   )

//   return {
//     bookings: data?.data || [],
//     isLoading,
//     isError: error,
//     mutate,
//   }
// }

// /**
//  * Hook to confirm a booking
//  */
// export function useConfirmBooking() {
//   const confirmBooking = async (bookingId: number | string) => {
//     try {
//       const response = await axios.post<ApiResponse<Booking>>(
//         `${API_BASE}/bookings/${bookingId}/confirm`
//       )
//       return response.data
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         throw new Error(
//           error.response?.data?.message || 'Failed to confirm booking'
//         )
//       }
//       throw error
//     }
//   }

//   return { confirmBooking }
// }

// /**
//  * Hook to cancel a booking
//  */
// export function useCancelBooking() {
//   const cancelBooking = async (
//     bookingId: number | string,
//     reason?: string
//   ) => {
//     try {
//       const response = await axios.post<ApiResponse<Booking>>(
//         `${API_BASE}/bookings/${bookingId}/cancel`,
//         { reason }
//       )
//       return response.data
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         throw new Error(
//           error.response?.data?.message || 'Failed to cancel booking'
//         )
//       }
//       throw error
//     }
//   }

//   return { cancelBooking }
// }

// /**
//  * Hook to initialize payment
//  */
// export function useInitializePayment() {
//   const initializePayment = async (paymentData: {
//     booking_id: number | string
//     amount: number
//     phone_number: string
//     payment_method: 'mobile_money' | 'card' | 'cash'
//   }) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE}/payments`,
//         paymentData
//       )
//       return response.data
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         throw new Error(
//           error.response?.data?.message || 'Failed to initialize payment'
//         )
//       }
//       throw error
//     }
//   }

//   return { initializePayment }
// }

// /**
//  * Hook to check payment status
//  */
// export function usePaymentStatus(paymentId: string | number) {
//   const { data, error, isLoading, mutate } = useSWR(
//     paymentId ? `${API_BASE}/payments/${paymentId}/status` : null,
//     fetcher,
//     {
//       refreshInterval: 5000, // Poll every 5 seconds
//       revalidateOnFocus: true,
//     }
//   )

//   return {
//     payment: data?.data,
//     isLoading,
//     isError: error,
//     mutate,
//   }
// }

// // ==================== SEAT HOOKS ====================

// /**
//  * Hook to fetch seats for a trip
//  */
// export function useTripSeats(tripId: string | number | null) {
//   const { data, error, isLoading, mutate } = useSWR<any>(
//     tripId ? `${API_BASE}/seats/trip/${tripId}` : null,
//     fetcher,
//     {
//       revalidateOnFocus: true,
//     }
//   )

//   return {
//     seats: data?.data || [],
//     isLoading,
//     isError: error,
//     mutate,
//   }
// }

// // ==================== PASSENGER HOOKS ====================

// /**
//  * Hook to lookup passenger by phone number
//  */
// export function useLookupPassenger(phone: string | null) {
//   const { data, error, isLoading, mutate } = useSWR<any>(
//     phone ? `${API_BASE}/passengers/lookup?phone=${encodeURIComponent(phone)}` : null,
//     fetcher,
//     {
//       revalidateOnFocus: false,
//       revalidateOnReconnect: false,
//       shouldRetryOnError: false,
//     }
//   )

//   return {
//     passenger: data?.data || null,
//     exists: !!data?.data,
//     isLoading,
//     isError: error,
//     mutate,
//   }
// }

// // ==================== PROMO CODE HOOKS ====================

// /**
//  * Hook to validate promo code
//  */
// export function useValidatePromoCode() {
//   const validatePromo = async (code: string, amount: number, context?: any) => {
//     try {
//       const response = await axios.post(`${API_BASE}/promo-codes/validate`, {
//         code,
//         amount,
//         ...context,
//       })
//       return response.data
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         throw new Error(
//           error.response?.data?.message || 'Failed to validate promo code'
//         )
//       }
//       throw error
//     }
//   }

//   return { validatePromo }
// }

// // ==================== BOOKING SUMMARY HOOKS ====================

// /**
//  * Hook to fetch booking summary statistics
//  */
// export function useBookingSummary() {
//   const { data, error, isLoading, mutate } = useSWR<any>(
//     `${API_BASE}/bookings/summary`,
//     fetcher,
//     {
//       revalidateOnFocus: true,
//     }
//   )

//   return {
//     summary: data?.data || null,
//     isLoading,
//     isError: error,
//     mutate,
//   }
// }














