// src/app/api/routes/[id]/fares/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://admin.summitcoachesug.com/api/v1';

// GET /api/routes/[id]/fares - Get fares for a route
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const searchParams = request.nextUrl.searchParams;
        const bus_type_id = searchParams.get('bus_type_id');

        const queryParams = bus_type_id ? { bus_type_id } : {};

        const response = await axios.get(
            `${LARAVEL_API_URL}/routes/${id}/fares`,
            {
                params: queryParams,
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
                    message: error.response?.data?.message || 'Failed to fetch route fares',
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
