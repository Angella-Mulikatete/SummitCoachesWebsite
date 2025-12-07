// app/api/seats/trip/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'https://admin.summitcoachesug.com/api/v1';

// GET /api/seats/trip/[id] - Get seats for a specific trip
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Get trip details first to find the bus ID
        const tripResponse = await axios.get(`${LARAVEL_API_URL}/trips/${id}`, {
            headers: {
                'Accept': 'application/json',
            },
        });

        const trip = tripResponse.data.data;
        const busId = trip.bus_id;

        if (!busId) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'No bus assigned to this trip'
                },
                { status: 404 }
            );
        }

        // Get seats for the bus
        const seatsResponse = await axios.get(`${LARAVEL_API_URL}/seats/bus/${busId}`, {
            headers: {
                'Accept': 'application/json',
            },
        });

        return NextResponse.json(seatsResponse.data, { status: 200 });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Seat fetch error:', error.response?.data);
            return NextResponse.json(
                error.response?.data || {
                    success: false,
                    message: 'Failed to fetch seats',
                },
                { status: error.response?.status || 500 }
            );
        }

        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
