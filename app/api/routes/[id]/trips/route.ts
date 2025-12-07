// src/app/api/routes/[id]/trips/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'https://admin.summitcoachesug.com/api/v1';

// GET /api/routes/[id]/trips - Get trips for a route
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        // Build query parameters for filtering trips
        const searchParams = request.nextUrl.searchParams;
        const hasDateParams = searchParams.has('date') || searchParams.has('date_filter');

        const queryParams = {
            date: searchParams.get('date'),
            date_filter: searchParams.get('date_filter') || (!hasDateParams ? 'today' : undefined),
            min_seats: searchParams.get('min_seats'),
        };

        // Remove null/undefined values
        const cleanParams = Object.fromEntries(
            Object.entries(queryParams).filter(([_, v]) => v != null)
        );

        const response = await axios.get(
            `${LARAVEL_API_URL}/routes/${id}/trips`,
            {
                params: cleanParams,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.response?.data?.message || 'Failed to fetch route trips',
                    errors: error.response?.data?.errors
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
