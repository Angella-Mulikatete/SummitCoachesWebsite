import { create } from "zustand"
import type { Seat, SelectedLuggage, SeatLayoutSeat } from "@/lib/types"

// Temporary interface for UI Seat until we fully align with API
// The API SeatLayoutSeat uses 'number' for seat number, but frontend used 'seatNo' string
export interface UISeat {
  seatNo: string
  row: number
  column: number
  price: number
  class?: string
}

interface SeatStore {
  selectedSeats: UISeat[]
  luggage: SelectedLuggage[]
  passengerNames: Record<string, string>
  discountCode: string
  discountAmount: number
  toggleSeat: (seat: UISeat) => void
  clearSeats: () => void
  addLuggage: (item: SelectedLuggage) => void
  setLuggage: (items: SelectedLuggage[]) => void // Added to replace all luggage
  removeLuggage: (id: string) => void
  setPassengerName: (seatNo: string, name: string) => void
  setDiscountCode: (code: string) => void
  setDiscountAmount: (amount: number) => void
  reset: () => void
}

export const useSeatStore = create<SeatStore>((set) => ({
  selectedSeats: [],
  luggage: [],
  passengerNames: {},
  discountCode: "",
  discountAmount: 0,

  toggleSeat: (seat) =>
    set((state) => {
      const exists = state.selectedSeats.find((s) => s.seatNo === seat.seatNo)
      if (exists) {
        return {
          selectedSeats: state.selectedSeats.filter((s) => s.seatNo !== seat.seatNo),
        }
      }
      return {
        selectedSeats: [...state.selectedSeats, seat],
      }
    }),

  clearSeats: () => set({ selectedSeats: [] }),

  addLuggage: (item) =>
    set((state) => ({
      luggage: [...state.luggage, item],
    })),

  setLuggage: (items) => set({ luggage: items }),

  removeLuggage: (id) =>
    set((state) => ({
      luggage: state.luggage.filter((item) => item.id !== id),
    })),

  setPassengerName: (seatNo, name) =>
    set((state) => ({
      passengerNames: { ...state.passengerNames, [seatNo]: name },
    })),

  setDiscountCode: (code) => set({ discountCode: code }),

  setDiscountAmount: (amount) => set({ discountAmount: amount }),

  reset: () =>
    set({
      selectedSeats: [],
      luggage: [],
      passengerNames: {},
      discountCode: "",
      discountAmount: 0,
    }),
}))
