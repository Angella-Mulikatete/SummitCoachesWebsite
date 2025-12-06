import useSWR from "swr"
import { LuggageType } from "@/lib/types"
import { API_ENDPOINTS } from "@/lib/api"

interface LuggageTypesResponse {
    success: boolean
    data: {
        data: LuggageType[]
    }
}

export function useLuggageTypes() {
    const { data, error, isLoading } = useSWR<LuggageTypesResponse>(
        API_ENDPOINTS.luggageTypes
    )

    return {
        luggageTypes: data?.data?.data || [],
        isLoading,
        error,
    }
}
