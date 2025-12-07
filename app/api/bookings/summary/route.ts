// app/api/bookings/summary/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://admin.summitcoachesug.com/api/v1';

// GET /api/bookings/summary - Get booking summary statistics
export async function GET(request: NextRequest) {
    try {
        const response = await axios.get(`${LARAVEL_API_URL}/bookings/summary`, {
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
                    message: 'Failed to fetch booking summary',
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
