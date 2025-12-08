// src/app/api/trips/[id]/seats/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'https://summit.mellonhardware.com/api';

// GET /api/trips/[id]/seats - Get available seats for a trip
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await axios.get(
      `${LARAVEL_API_URL}/trips/${id}/seats`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("response in /api/trips/[id]/seats/route.ts", response.data)

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as import('axios').AxiosError<{
        message?: string;
        errors?: Record<string, string[]>;
      }>;
      return NextResponse.json(
        {
          success: false,
          message: axiosError.response?.data?.message || 'Failed to fetch seats',
          errors: axiosError.response?.data?.errors
        },
        { status: axiosError.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}