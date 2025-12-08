// src/app/api/trips/[id]/availability/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'https://summit.mellonhardware.com/api';

// GET /api/trips/[id]/availability - Get trip availability
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const response = await axios.get(
            `${LARAVEL_API_URL}/trips/${id}/availability`,
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
                {
                    success: false,
                    message: error.response?.data?.message || 'Failed to fetch trip availability',
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
