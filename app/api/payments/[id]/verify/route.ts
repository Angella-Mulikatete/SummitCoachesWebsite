// src/app/api/payments/[id]/verify/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'https://summit.mellonhardware.com/api';

// POST /api/payments/[id]/verify - Verify payment
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization');
    const body = await request.json();

    // Validate required field
    if (!body.transaction_id) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Transaction ID is required',
          errors: {
            transaction_id: ['Transaction ID is required']
          }
        },
        { status: 422 }
      );
    }

    const response = await axios.post(
      `${LARAVEL_API_URL}/payments/${params.id}/verify`,
      body,
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
          message: error.response?.data?.message || 'Failed to verify payment',
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