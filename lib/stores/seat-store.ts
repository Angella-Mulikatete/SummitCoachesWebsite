import { create } from "zustand"
import type { Seat, LuggageItem } from "@/lib/types"

interface SeatStore {
  selectedSeats: Seat[]
  luggage: LuggageItem[]
  passengerNames: Record<string, string>
  discountCode: string
  toggleSeat: (seat: Seat) => void
  clearSeats: () => void
  addLuggage: (item: LuggageItem) => void
  removeLuggage: (id: string) => void
  setPassengerName: (seatNo: string, name: string) => void
  setDiscountCode: (code: string) => void
  reset: () => void
}

export const useSeatStore = create<SeatStore>((set) => ({
  selectedSeats: [],
  luggage: [],
  passengerNames: {},
  discountCode: "",

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

  removeLuggage: (id) =>
    set((state) => ({
      luggage: state.luggage.filter((item) => item.id !== id),
    })),

  setPassengerName: (seatNo, name) =>
    set((state) => ({
      passengerNames: { ...state.passengerNames, [seatNo]: name },
    })),

  setDiscountCode: (code) => set({ discountCode: code }),

  reset: () =>
    set({
      selectedSeats: [],
      luggage: [],
      passengerNames: {},
      discountCode: "",
    }),
}))
