export interface Trip {
  id: number
  title: string
  description: string
  destination: string
  price: number
  image: string
  departureDate: string
  returnDate: string
  availableSeats: number
  features: string[]
}

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