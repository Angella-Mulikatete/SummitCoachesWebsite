import useSWR from "swr"
import { SeatLayout, Seat } from "@/lib/types"
import { API_ENDPOINTS, api } from "@/lib/api"

export function useBusSeats(busId?: number) {
    const { data, error, isLoading } = useSWR<{ success: boolean; data: Seat[] }>(
        busId ? API_ENDPOINTS.seatsByBus(busId) : null,
        (url: string) => api.get<{ success: boolean; data: Seat[] }>(url)
    )

    console.log("useBusSeats Hook - BusID:", busId);
    console.log("useBusSeats Hook - Data:", data);
    console.log("useBusSeats Hook - Error:", error);

    return {
        seats: data?.data || [],
        isLoading,
        error,
    }
}

export function useTripBookedSeats(tripId: string) {
    const { data, error, isLoading } = useSWR<{ success: boolean; data: any[] }>(
        tripId ? API_ENDPOINTS.tripSeats(tripId) : null,
        (url: string) => api.get<{ success: boolean; data: any[] }>(url)
    )

    return {
        bookedSeats: data?.data || [],
        isLoading,
        error,
    }
}

export function useBusSeatMap(busId?: number) {
    const { data, error, isLoading } = useSWR<{ success: boolean; data: any }>(
        busId ? API_ENDPOINTS.busSeatMap(busId) : null,
        (url: string) => api.get<{ success: boolean; data: any }>(url)
    )
    console.log("data in use-seat-layout", data)

    return {
        seatMap: data?.data,
        isLoading,
        error,
    }
}
