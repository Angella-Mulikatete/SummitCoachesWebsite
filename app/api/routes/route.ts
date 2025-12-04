// src/app/api/routes/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://admin.summitcoachesug.com/api/v1';

// GET /api/routes - Get all routes with optional filters
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        // Build query parameters
        const params = {
            company_id: searchParams.get('company_id'),
            active: searchParams.get('active'),
            search: searchParams.get('search'),
            date_filter: searchParams.get('date_filter'),
            min_seats: searchParams.get('min_seats'),
            origin: searchParams.get('origin'),
            destination: searchParams.get('destination'),
        };

        // Remove null/undefined values
        const cleanParams = Object.fromEntries(
            Object.entries(params).filter(([_, v]) => v != null)
        );

        const response = await axios.get(`${LARAVEL_API_URL}/routes`, {
            params: cleanParams,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        console.log("Routes Response data:", response.data);

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.response?.data?.message || 'Failed to fetch routes',
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
