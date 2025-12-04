// app/api/passengers/lookup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://admin.summitcoachesug.com/api/v1';

// GET /api/passengers/lookup - Lookup passenger by phone
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const phone = searchParams.get('phone');

        if (!phone) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Phone number is required'
                },
                { status: 422 }
            );
        }

        const response = await axios.get(`${LARAVEL_API_URL}/passengers/lookup`, {
            params: { phone },
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
                    message: 'Failed to lookup passenger',
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
