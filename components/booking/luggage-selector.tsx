import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Loader2, Package } from "lucide-react"
import { useLuggageTypes } from "@/hooks/use-luggage-types"
import { motion, AnimatePresence } from "framer-motion"
import { LuggageType, SelectedLuggage } from "@/lib/types"

interface LuggageSelectorProps {
    luggage: SelectedLuggage[]
    onLuggageChange: (luggage: SelectedLuggage[]) => void
}

export function LuggageSelector({ luggage, onLuggageChange }: LuggageSelectorProps) {
    const { luggageTypes, isLoading } = useLuggageTypes()
    const [showForm, setShowForm] = useState(false)
    const [selectedType, setSelectedType] = useState<LuggageType | null>(null)
    const [quantity, setQuantity] = useState("1")
    const [weight, setWeight] = useState("")

    const handleTypeSelect = (typeId: string) => {
        const type = luggageTypes.find((t) => t.id === Number(typeId))
        setSelectedType(type || null)
        setWeight("")
    }

    const calculateCharge = (type: LuggageType, qty: number, wt: number) => {
        const baseTotal = type.base_charge * qty
        const weightCharge = type.charge_per_kg ? type.charge_per_kg * wt : 0
        return baseTotal + weightCharge
    }

    const handleAddLuggage = () => {
        if (!selectedType) return

        const qty = Number.parseInt(quantity) || 1
        const wt = Number.parseFloat(weight) || 0

        // Validate max weight if specified
        if (selectedType.max_weight && wt > selectedType.max_weight) {
            alert(`Maximum weight for ${selectedType.name} is ${selectedType.max_weight} kg`)
            return
        }

        const totalCharge = calculateCharge(selectedType, qty, wt)

        const newItem: SelectedLuggage = {
            id: `${selectedType.id}-${Date.now()}`,
            type_id: selectedType.id,
            type_name: selectedType.name,
            quantity: qty,
            weight: wt,
            total_charge: totalCharge,
            base_charge: selectedType.base_charge,
            charge_per_kg: selectedType.charge_per_kg || 0,
        }

        onLuggageChange([...luggage, newItem])

        // Reset form
        setSelectedType(null)
        setQuantity("1")
        setWeight("")
        setShowForm(false)
    }

    const handleRemoveLuggage = (id: string) => {
        onLuggageChange(luggage.filter((item) => item.id !== id))
    }

    const totalLuggageCharge = luggage.reduce((sum, item) => sum + item.total_charge, 0)

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-4 text-secondary-light">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm">Loading luggage types...</span>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-3 flex items-center justify-between">
                <Label className="text-sm font-medium text-secondary-light">
                    Luggage ({luggage.length})
                </Label>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowForm(!showForm)}
                    className="h-8 text-xs"
                >
                    <Plus className="mr-1 h-3 w-3" />
                    Add Luggage
                </Button>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 space-y-3 rounded-lg border border-border bg-muted/30 p-4"
                    >
                        <div>
                            <Label htmlFor="luggage-type" className="text-xs font-medium">
                                Luggage Type
                            </Label>
                            <Select
                                value={selectedType?.id.toString() || ""}
                                onValueChange={handleTypeSelect}
                            >
                                <SelectTrigger id="luggage-type" className="mt-1 h-9">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {luggageTypes.map((type) => (
                                        <SelectItem key={type.id} value={type.id.toString()}>
                                            <div className="flex items-center justify-between gap-4">
                                                <span>{type.name}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    UGX {type.base_charge.toLocaleString()}
                                                    {type.charge_per_kg && ` + ${type.charge_per_kg}/kg`}
                                                </span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {selectedType?.description && (
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {selectedType.description}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="quantity" className="text-xs font-medium">
                                    Quantity
                                </Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="mt-1 h-9 text-sm"
                                />
                            </div>
                            <div>
                                <Label htmlFor="weight" className="text-xs font-medium">
                                    Weight (kg)
                                    {selectedType?.max_weight && (
                                        <span className="ml-1 text-muted-foreground">
                                            (max {selectedType.max_weight})
                                        </span>
                                    )}
                                </Label>
                                <Input
                                    id="weight"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max={selectedType?.max_weight || undefined}
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="mt-1 h-9 text-sm"
                                    disabled={!selectedType}
                                />
                            </div>
                        </div>

                        {selectedType && weight && (
                            <div className="rounded bg-primary/5 p-2 text-center">
                                <p className="text-xs text-secondary-light">Estimated Cost</p>
                                <p className="text-lg font-bold text-primary">
                                    UGX{" "}
                                    {calculateCharge(
                                        selectedType,
                                        Number.parseInt(quantity) || 1,
                                        Number.parseFloat(weight) || 0
                                    ).toLocaleString()}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                onClick={handleAddLuggage}
                                disabled={!selectedType || !weight}
                                className="flex-1"
                            >
                                Add to Booking
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    setShowForm(false)
                                    setSelectedType(null)
                                    setQuantity("1")
                                    setWeight("")
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Selected Luggage List */}
            {luggage.length > 0 && (
                <div className="space-y-2">
                    {luggage.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex items-start justify-between rounded-lg border border-border bg-white p-3 text-sm"
                        >
                            <div className="flex items-start gap-2">
                                <div className="mt-0.5 rounded bg-primary/10 p-1.5">
                                    <Package className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-secondary">{item.type_name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {item.quantity} {item.quantity > 1 ? "items" : "item"} · {item.weight} kg
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Base: UGX {(item.base_charge * item.quantity).toLocaleString()}
                                        {item.charge_per_kg > 0 &&
                                            ` + Weight: UGX ${(item.charge_per_kg * item.weight).toLocaleString()}`}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-right">
                                    <p className="font-semibold text-secondary">
                                        UGX {item.total_charge.toLocaleString()}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveLuggage(item.id)}
                                    className="h-7 w-7 p-0"
                                >
                                    <Trash2 className="h-3 w-3 text-destructive" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}

                    <div className="flex items-center justify-between rounded-lg bg-primary/5 p-3">
                        <span className="text-sm font-medium text-secondary">Total Luggage Cost</span>
                        <span className="text-lg font-bold text-primary">
                            UGX {totalLuggageCharge.toLocaleString()}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
