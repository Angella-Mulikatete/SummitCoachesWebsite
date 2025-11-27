// src/lib/hooks.ts

import useSWR from 'swr'
import axios from 'axios'
import { Trip, Booking, ApiResponse } from './types'

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
  return {
    ...apiTrip,
    // Map API fields to frontend fields
    price: apiTrip.fare || apiTrip.price || 0,
    availableSeats: apiTrip.available_seats || apiTrip.availableSeats || 0,
    title: apiTrip.title || `${apiTrip.origin} to ${apiTrip.destination}`,
    description: apiTrip.description || `Bus trip from ${apiTrip.origin} to ${apiTrip.destination}`,
    image: apiTrip.image || apiTrip.thumbnail || '/placeholder-bus.jpg',
    // Optional fields with defaults
    departureDate: apiTrip.departureDate || apiTrip.date,
    returnDate: apiTrip.returnDate || undefined,
    features: apiTrip.features || [],
  }
}

/**
 * Hook to fetch trips with optional filters
 */
export function useTrips(params?: Record<string, any>) {
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

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<any[]>>(
    `${API_BASE}/trips${queryString}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )

  // Transform API response to Trip[]
  const trips: Trip[] = data?.data ? data.data.map(transformTrip) : []

  return {
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

/**
 * Hook to create a booking
 */
export function useCreateBooking() {
  const createBooking = async (bookingData: {
    trip_id: number | string
    passenger_name: string
    passenger_email: string
    passenger_phone: string
    seat_numbers: string[]
    passenger_id_number?: string
  }) => {
    try {
      const response = await axios.post<ApiResponse<Booking>>(
        `${API_BASE}/bookings`,
        bookingData
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Failed to create booking'
        )
      }
      throw error
    }
  }

  return { createBooking }
}

/**
 * Hook to fetch user's bookings (requires auth)
 */
export function useMyBookings() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Booking[]>>(
    token ? `${API_BASE}/bookings` : null,
    async (url: string) => {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
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





// import useSWR from 'swr'
// import { api, API_ENDPOINTS } from './api'
// import { Trip } from './types'

// // Fetcher function for SWR - calls /app/api/ routes
// const fetcher = (url: string) => api.get(url)

// export function useTrips(params?: Record<string, any>) {
//     // Construct query string from params
//     const queryString = params
//         ? '?' + new URLSearchParams(Object.entries(params).reduce((acc, [key, val]) => {
//             if (val) acc[key] = String(val);
//             return acc;
//         }, {} as Record<string, string>)).toString()
//         : ''

//     const { data, error, isLoading, mutate } = useSWR(
//         `${API_ENDPOINTS.trips}${queryString}`,
//         fetcher
//     )

//     return {
//         trips: ((data as any)?.data || []) as Trip[],
//         isLoading,
//         isError: error,
//         mutate
//     }
// }

// export function useTrip(id: string) {
//     const { data, error, isLoading } = useSWR(
//         id ? API_ENDPOINTS.tripDetails(id) : null,
//         fetcher
//     )

//     return {
//         trip: data as Trip,
//         isLoading,
//         isError: error
//     }
// }

// export function useCreateBooking() {
//     const createBooking = async (data: any) => {
//         return api.post(API_ENDPOINTS.bookings, data)
//     }

//     return { createBooking }
// }
