// app/api/promo-codes/validate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://admin.summitcoachesug.com/api/v1';

// POST /api/promo-codes/validate - Validate promo code
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await axios.post(
            `${LARAVEL_API_URL}/promo-codes/validate`,
            body,
            {
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
                error.response?.data || {
                    success: false,
                    message: 'Failed to validate promo code',
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
