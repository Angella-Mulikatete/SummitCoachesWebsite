"use client"

import { User, Package, Briefcase, Plus } from "lucide-react"
import { BookingType } from "@/lib/types"

interface BookingTypeSelectorProps {
  selectedType: BookingType
  onSelect: (type: BookingType) => void
}

export function BookingTypeSelector({ selectedType, onSelect }: BookingTypeSelectorProps) {
  const types: { id: BookingType; label: string; icon: any; description: string }[] = [
    {
      id: "passenger",
      label: "Passenger Only",
      icon: User,
      description: "Book a seat for yourself"
    },
    {
      id: "mixed",
      label: "Passenger + Luggage",
      icon: Briefcase,
      description: "Book a seat and extra luggage"
    },
    {
      id: "parcel",
      label: "Parcel Only",
      icon: Package,
      description: "Send a package without traveling"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {types.map((type) => {
        const Icon = type.icon
        const isSelected = selectedType === type.id

        return (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={`
              relative flex flex-col items-center p-6 rounded-xl border-2 transition-all
              ${isSelected 
                ? "border-primary bg-primary/5 text-primary" 
                : "border-slate-100 bg-white hover:border-slate-200 text-slate-600"}
            `}
          >
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors
              ${isSelected ? "bg-primary text-white" : "bg-slate-100 text-slate-500"}
            `}>
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">{type.label}</h3>
            <p className="text-xs text-center opacity-80">{type.description}</p>
          </button>
        )
      })}
    </div>
  )
}
