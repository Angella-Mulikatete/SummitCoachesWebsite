// app/api/my-bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://admin.summitcoachesug.com/api/v1';

// GET /api/my-bookings - Get current user's bookings
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get('status');

        const queryString = status ? `?status=${status}` : '';

        const response = await axios.get(`${LARAVEL_API_URL}/my-bookings${queryString}`, {
            headers: {
                'Accept': 'application/json',
            },
        });

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                error.response?.data || {
                    success: false,
                    message: 'Failed to fetch bookings',
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
