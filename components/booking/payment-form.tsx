'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Banknote, Smartphone, Tag, Check, X, Loader2 } from 'lucide-react'
import { useValidatePromoCode } from '@/lib/hooks'
import { PaymentMethod } from '@/lib/types'

interface PaymentFormProps {
    totalAmount: number
    onPaymentData: (data: PaymentFormData) => void
    tripId?: number
}

export interface PaymentFormData {
    payment_method: PaymentMethod
    payment_status: 'pending' | 'paid'
    promo_code?: string
    discount_amount?: number
    final_amount: number
}

export default function PaymentForm({ totalAmount, onPaymentData, tripId }: PaymentFormProps) {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash')
    const [promoCode, setPromoCode] = useState('')
    const [appliedPromo, setAppliedPromo] = useState<any>(null)
    const [promoError, setPromoError] = useState('')
    const [isValidating, setIsValidating] = useState(false)

    const { validatePromo } = useValidatePromoCode()

    const paymentMethods = [
        { value: 'cash', label: 'Cash', icon: Banknote, description: 'Pay with cash at the station' },
        { value: 'mobile_money', label: 'Mobile Money', icon: Smartphone, description: 'MTN or Airtel Money' },
        { value: 'card', label: 'Card', icon: CreditCard, description: 'Credit or Debit card' },
    ] as const

    const handleApplyPromo = async () => {
        if (!promoCode.trim()) return

        setIsValidating(true)
        setPromoError('')

        try {
            const result = await validatePromo(promoCode, totalAmount, {
                trip_id: tripId,
            })

            if (result.success) {
                setAppliedPromo(result.data)
                updatePaymentData(paymentMethod, result.data)
            } else {
                setPromoError(result.message || 'Invalid promo code')
                setAppliedPromo(null)
            }
        } catch (error: any) {
            setPromoError(error.message || 'Failed to validate promo code')
            setAppliedPromo(null)
        } finally {
            setIsValidating(false)
        }
    }

    const handleRemovePromo = () => {
        setAppliedPromo(null)
        setPromoCode('')
        setPromoError('')
        updatePaymentData(paymentMethod, null)
    }

    const updatePaymentData = (method: PaymentMethod, promoData: any = appliedPromo) => {
        const discountAmount = promoData?.discount_amount || 0
        const finalAmount = Math.max(0, totalAmount - discountAmount)

        onPaymentData({
            payment_method: method,
            payment_status: method === 'cash' ? 'pending' : 'pending',
            promo_code: promoData?.code,
            discount_amount: discountAmount,
            final_amount: finalAmount,
        })
    }

    const handlePaymentMethodChange = (method: PaymentMethod) => {
        setPaymentMethod(method)
        updatePaymentData(method)
    }

    const discountAmount = appliedPromo?.discount_amount || 0
    const finalAmount = Math.max(0, totalAmount - discountAmount)

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Payment Details</h3>
                <p className="text-sm text-slate-600">Choose your payment method and apply promo code</p>
            </div>

            {/* Payment Methods */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                    Payment Method
                </label>
                <div className="grid gap-3">
                    {paymentMethods.map((method) => {
                        const Icon = method.icon
                        const isSelected = paymentMethod === method.value

                        return (
                            <button
                                key={method.value}
                                type="button"
                                onClick={() => handlePaymentMethodChange(method.value)}
                                className={`
                  p-4 rounded-lg border-2 transition-all text-left
                  ${isSelected
                                        ? 'border-primary bg-primary/5'
                                        : 'border-slate-200 hover:border-slate-300'
                                    }
                `}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`
                    p-2 rounded-lg
                    ${isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}
                  `}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-slate-800">{method.label}</div>
                                        <div className="text-sm text-slate-500">{method.description}</div>
                                    </div>
                                    {isSelected && (
                                        <Check className="h-5 w-5 text-primary" />
                                    )}
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Promo Code */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                    Promo Code (Optional)
                </label>

                {!appliedPromo ? (
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                                placeholder="Enter promo code"
                                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent uppercase"
                            />
                        </div>
                        <button
                            onClick={handleApplyPromo}
                            disabled={isValidating || !promoCode.trim()}
                            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isValidating ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Checking
                                </>
                            ) : (
                                'Apply'
                            )}
                        </button>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-50 border-2 border-green-200 rounded-lg p-4"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Tag className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-green-800">
                                        {appliedPromo.code} Applied!
                                    </p>
                                    <p className="text-sm text-green-700 mt-1">
                                        {appliedPromo.description || `Discount: UGX ${discountAmount.toLocaleString()}`}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleRemovePromo}
                                className="text-green-600 hover:text-green-700 p-1"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {promoError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 rounded-lg p-3"
                    >
                        <p className="text-sm text-red-700">{promoError}</p>
                    </motion.div>
                )}
            </div>

            {/* Price Summary */}
            <div className="bg-slate-50 rounded-lg p-6 space-y-3 border border-slate-200">
                <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>UGX {totalAmount.toLocaleString()}</span>
                </div>

                {appliedPromo && (
                    <div className="flex justify-between text-green-600 font-medium">
                        <span>Discount ({appliedPromo.code})</span>
                        <span>- UGX {discountAmount.toLocaleString()}</span>
                    </div>
                )}

                <div className="border-t border-slate-300 pt-3 flex justify-between items-center">
                    <span className="text-lg font-semibold text-slate-800">Total</span>
                    <span className="text-2xl font-bold text-primary">
                        UGX {finalAmount.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Payment Method Info */}
            {paymentMethod === 'mobile_money' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700">
                        📱 You'll receive a prompt on your phone to complete the payment
                    </p>
                </div>
            )}

            {paymentMethod === 'cash' && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-700">
                        💵 Please pay at the station before departure
                    </p>
                </div>
            )}
        </div>
    )
}
