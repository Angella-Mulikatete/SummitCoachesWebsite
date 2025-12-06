import useSWR from "swr"
import { SeatLayout } from "@/lib/types"
import { API_ENDPOINTS, api } from "@/lib/api"


export function useSeatLayout(layoutId: number | null) {
    const { data, error, isLoading } = useSWR<{ success: boolean; data: SeatLayout }>(
        layoutId ? API_ENDPOINTS.seatLayout(layoutId) : null
    )

    return {
        seatLayout: data?.data,
        isLoading,
        error,
    }
}

export function useSeatLayouts() {
    const { data, error, isLoading } = useSWR<{ success: boolean; data: SeatLayout[] }>(
        API_ENDPOINTS.seatLayouts
    )

    return {
        seatLayouts: data?.data || [],
        isLoading,
        error,
    }
}

export function useBusSeats(busId?: number) {
    const { data, error, isLoading } = useSWR<{ success: boolean; data: any[] }>(
        busId ? API_ENDPOINTS.seatsByBus(busId) : null,
        (url: string) => api.get<{ success: boolean; data: any[] }>(url)
    )

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

    return {
        seatMap: data?.data,
        isLoading,
        error,
    }
}
