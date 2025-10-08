import { NextResponse } from "next/server"

// Mock data for development/testing when backend is not available
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get("endpoint")

  // Mock trips data
  if (endpoint === "trips") {
    return NextResponse.json({
      trips: [
        {
          id: "trip-1",
          routeId: "route-1",
          route: {
            id: "route-1",
            name: "Kampala - Mbarara Express",
            origin: "Kampala",
            destination: "Mbarara",
            distanceKm: 266,
            estimatedDuration: "4h 30m",
            stops: [
              { id: "stop-1", name: "Masaka", order: 1 },
              { id: "stop-2", name: "Lyantonde", order: 2 },
            ],
          },
          busId: "bus-1",
          bus: {
            id: "bus-1",
            plateNo: "UAH 123X",
            type: "Luxury",
            capacity: 40,
            amenities: ["WiFi", "Coffee", "Entertainment"],
          },
          departureTime: new Date(Date.now() + 86400000).toISOString(),
          arrivalTime: new Date(Date.now() + 86400000 + 16200000).toISOString(),
          status: "scheduled",
          availableSeats: 28,
          basePrice: 25000,
          seatMap: {
            rows: 10,
            columns: 4,
            seats: Array.from({ length: 40 }, (_, i) => ({
              seatNo: `${Math.floor(i / 4) + 1}${String.fromCharCode(65 + (i % 4))}`,
              row: Math.floor(i / 4),
              column: i % 4,
              class: i < 8 ? "vip" : "economy",
              isBooked: Math.random() > 0.7,
              price: i < 8 ? 35000 : 25000,
            })),
          },
        },
      ],
    })
  }

  // Mock booking confirmation
  if (endpoint === "booking") {
    return NextResponse.json({
      id: "booking-" + Date.now(),
      bookingReference: "SC" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      qrCode: "SC-BOOKING-" + Date.now(),
      trip: {
        id: "trip-1",
        route: {
          origin: "Kampala",
          destination: "Mbarara",
          distanceKm: 266,
        },
        bus: {
          type: "Luxury",
          plateNo: "UAH 123X",
        },
        departureTime: new Date(Date.now() + 86400000).toISOString(),
        arrivalTime: new Date(Date.now() + 86400000 + 16200000).toISOString(),
      },
      seats: [
        { seatNo: "1A", passengerName: "John Doe", price: 35000 },
        { seatNo: "1B", passengerName: "Jane Doe", price: 35000 },
      ],
      luggage: [{ id: "lug-1", description: "Large suitcase", weight: 20, price: 20000 }],
      grossAmount: 70000,
      discountAmount: 0,
      taxAmount: 12600,
      netAmount: 82600,
      paymentStatus: "pending",
      bookingStatus: "confirmed",
      createdAt: new Date().toISOString(),
    })
  }

  return NextResponse.json({ error: "Unknown endpoint" }, { status: 404 })
}
