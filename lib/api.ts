import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Trip {
  id: string;
  title: string;
  description: string;
  destination: string;
  duration: string;
  price: number;
  departureDate: string;
  returnDate: string;
  availableSeats: number;
  imageUrl: string;
  highlights: string[];
  included: string[];
}

export interface Booking {
  id: string;
  tripId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfPassengers: number;
  totalPrice: number;
  status: string;
  bookingDate: string;
  passengerDetails?: PassengerDetail[];
}

export interface PassengerDetail {
  name: string;
  age: number;
  email?: string;
  phone?: string;
}

export interface CreateBookingData {
  tripId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfPassengers: number;
  passengerDetails?: PassengerDetail[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

export interface ContentData {
  title: string;
  content: string;
}

export const tripApi = {
  getTrips: async (): Promise<Trip[]> => {
    const response = await api.get('/trips');
    return response.data;
  },

  getTripById: async (id: string): Promise<Trip> => {
    const response = await api.get(`/trips/${id}`);
    return response.data;
  },
};

export const bookingApi = {
  createBooking: async (data: CreateBookingData): Promise<Booking> => {
    const response = await api.post('/bookings', data);
    return response.data;
  },

  getBookingById: async (id: string): Promise<Booking> => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  getUserBookings: async (): Promise<Booking[]> => {
    const response = await api.get('/user/bookings');
    return response.data;
  },
};

export const contentApi = {
  getAbout: async (): Promise<ContentData> => {
    const response = await api.get('/content/about');
    return response.data;
  },

  getContact: async (): Promise<ContactInfo> => {
    const response = await api.get('/content/contact');
    return response.data;
  },

  getTerms: async (): Promise<ContentData> => {
    const response = await api.get('/content/terms');
    return response.data;
  },
};

export default api;
