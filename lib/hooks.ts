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
    image: apiTrip.image || apiTrip.thumbnail || '/placeholder-bus.jpg',
    // Optional fields with defaults
    departureDate: apiTrip.trip_date || apiTrip.departureDate || apiTrip.date,
    departureTime: apiTrip.departure_time_12h || apiTrip.departure_time,
    arrivalTime: apiTrip.arrival_time_12h || apiTrip.arrival_time,
    returnDate: apiTrip.returnDate || undefined,
    features: apiTrip.features || [],
    // Nested objects
    bus: apiTrip.bus ? {
      registrationNumber: apiTrip.bus.registration_number,
      type: apiTrip.bus.bus_type?.name || 'Standard',
      capacity: apiTrip.bus.capacity
    } : undefined,
    route: apiTrip.route ? {
      origin: apiTrip.route.origin,
      destination: apiTrip.route.destination,
      name: apiTrip.route.name
    } : undefined
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
