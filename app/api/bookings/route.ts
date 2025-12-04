// src/app/api/bookings/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://admin.summitcoachesug.com/api/v1';

// GET /api/bookings - Get user's bookings (requires auth)
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization');

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const response = await axios.get(`${LARAVEL_API_URL}/bookings/my`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch bookings',
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

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { trip_id, passenger_name, passenger_phone, passenger_email, seat_numbers } = body;

    if (!trip_id || !passenger_name || !passenger_phone || !passenger_email || !seat_numbers) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
          errors: {
            trip_id: !trip_id ? ['Trip ID is required'] : [],
            passenger_name: !passenger_name ? ['Passenger name is required'] : [],
            passenger_phone: !passenger_phone ? ['Phone number is required'] : [],
            passenger_email: !passenger_email ? ['Email is required'] : [],
            seat_numbers: !seat_numbers ? ['Seat numbers are required'] : [],
          }
        },
        { status: 422 }
      );
    }

    const response = await axios.post(
      `${LARAVEL_API_URL}/bookings`,
      body,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to create booking',
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