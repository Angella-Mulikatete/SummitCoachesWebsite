import { useState } from "react"
import { DiscountValidationResponse } from "@/lib/types"
import { API_ENDPOINTS } from "@/lib/api"

export function useDiscountValidation() {
    const [isValidating, setIsValidating] = useState(false)
    const [discount, setDiscount] = useState<DiscountValidationResponse | null>(null)
    const [error, setError] = useState<string | null>(null)

    const validateDiscount = async (code: string, amount: number) => {
        setIsValidating(true)
        setError(null)

        try {
            const response = await fetch(API_ENDPOINTS.validateDiscount, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code, amount }),
            })

            const data: DiscountValidationResponse = await response.json()

            if (data.success) {
                setDiscount(data)
            } else {
                setError(data.message || "Invalid discount code")
                setDiscount(null)
            }

            return data
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to validate discount"
            setError(errorMessage)
            setDiscount(null)
            return { success: false, message: errorMessage }
        } finally {
            setIsValidating(false)
        }
    }

    const clearDiscount = () => {
        setDiscount(null)
        setError(null)
    }

    return {
        validateDiscount,
        clearDiscount,
        discount,
        isValidating,
        error,
    }
}
