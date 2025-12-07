"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"
import { Loader2, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { api, API_ENDPOINTS } from "@/lib/api"
import { ParcelType, CalculateParcelChargesResponse } from "@/lib/types"

interface LuggageParcelFormProps {
    type: 'luggage' | 'parcel'
    onUpdate: (items: any[], totalCost: number) => void
}

export function LuggageParcelForm({ type, onUpdate }: LuggageParcelFormProps) {
    const [items, setItems] = useState<any[]>([])

    // Fetch parcel/luggage types
    const { data: typesResponse, isLoading } = useSWR<{ data: ParcelType[] }>(
        type === 'parcel' ? API_ENDPOINTS.parcelTypes : API_ENDPOINTS.luggageTypes
    )

    const types = typesResponse?.data || []

    const addItem = () => {
        setItems([...items, { typeId: "", weight: "", description: "", cost: 0 }])
    }

    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index)
        setItems(newItems)
    }

    const updateItem = async (index: number, field: string, value: any) => {
        const newItems = [...items]
        newItems[index] = { ...newItems[index], [field]: value }

        // Calculate cost if we have type and weight
        if ((field === 'typeId' || field === 'weight') && newItems[index].typeId && newItems[index].weight) {
            const typeId = newItems[index].typeId
            const weight = parseFloat(newItems[index].weight)

            if (!isNaN(weight)) {
                try {
                    // Find selected type details
                    const selectedType = types.find(t => t.id.toString() === typeId.toString())
                    if (selectedType) {
                        // Simple client-side calc or API call
                        // For now using simple logic: base + (weight * per_kg)
                        // Or use the calculate API if available
                        const base = selectedType.base_charge
                        const extra = Math.max(0, weight - selectedType.min_weight) * selectedType.charge_per_kg
                        newItems[index].cost = base + extra

                        // If API exists for calc:
                        // const res = await api.post<CalculateParcelChargesResponse>(API_ENDPOINTS.calculateParcelCharges(typeId), { weight })
                        // newItems[index].cost = res.data.total_charge
                    }
                } catch (e) {
                    console.error(e)
                }
            }
        }

        setItems(newItems)
    }

    useEffect(() => {
        const total = items.reduce((acc, item) => acc + (item.cost || 0), 0)
        onUpdate(items, total)
    }, [items, onUpdate])

    if (isLoading) return <Loader2 className="animate-spin" />

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">Add {type === 'luggage' ? 'Luggage' : 'Parcels'}</h3>
                <Button onClick={addItem} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" /> Add Item
                </Button>
            </div>

            {items.length === 0 && (
                <p className="text-slate-500 text-sm text-center py-4 border-2 border-dashed rounded-lg">
                    No items added yet.
                </p>
            )}

            {items.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4 relative bg-slate-50">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeItem(index)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Type</Label>
                            <Select
                                value={item.typeId}
                                onValueChange={(val) => updateItem(index, 'typeId', val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {types.map((t) => (
                                        <SelectItem key={t.id} value={t.id.toString()}>
                                            {t.name} ({t.base_charge} UGX)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Weight (kg)</Label>
                            <Input
                                type="number"
                                value={item.weight}
                                onChange={(e) => updateItem(index, 'weight', e.target.value)}
                                placeholder="0"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label>Description</Label>
                            <Input
                                value={item.description}
                                onChange={(e) => updateItem(index, 'description', e.target.value)}
                                placeholder="Color, contents, etc."
                            />
                        </div>
                    </div>

                    {item.cost > 0 && (
                        <div className="flex justify-end pt-2 border-t">
                            <p className="text-sm font-medium">Cost: <span className="text-primary">{item.cost.toLocaleString()} UGX</span></p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
