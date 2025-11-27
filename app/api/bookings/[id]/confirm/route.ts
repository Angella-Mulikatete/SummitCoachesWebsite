// src/app/api/bookings/[id]/confirm/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'https://summit.mellonhardware.com/api';

// POST /api/bookings/[id]/confirm - Confirm a booking
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization');

    const response = await axios.post(
      `${LARAVEL_API_URL}/bookings/${params.id}/confirm`,
      {},
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': token }),
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { 
          success: false, 
          message: error.response?.data?.message || 'Failed to confirm booking',
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