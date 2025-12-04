// src/app/api/payments/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://admin.summitcoachesug.com/api/v1';

// POST /api/payments - Initialize payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { booking_id, amount, phone_number, payment_method } = body;

    if (!booking_id || !amount || !phone_number || !payment_method) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
          errors: {
            booking_id: !booking_id ? ['Booking ID is required'] : [],
            amount: !amount ? ['Amount is required'] : [],
            phone_number: !phone_number ? ['Phone number is required'] : [],
            payment_method: !payment_method ? ['Payment method is required'] : [],
          }
        },
        { status: 422 }
      );
    }

    const response = await axios.post(
      `${LARAVEL_API_URL}/payments/initialize`,
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
          message: error.response?.data?.message || 'Failed to initialize payment',
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