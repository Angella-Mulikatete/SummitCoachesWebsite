export interface Booking {
  id: number
  tripId: number
  guestName: string
  guestEmail: string
  seats: number
  totalPrice: number
  bookingDate: string
  status: 'pending' | 'confirmed' | 'cancelled'
}

export interface CreateBookingData {
  tripId: number
  guestName: string
  guestEmail: string
  seats: number
  totalPrice: number
}