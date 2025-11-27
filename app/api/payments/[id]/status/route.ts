// src/app/api/payments/[id]/status/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'https://summit.mellonhardware.com/api';

// GET /api/payments/[id]/status - Check payment status
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization');

    const response = await axios.get(
      `${LARAVEL_API_URL}/payments/${params.id}/status`,
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
          message: error.response?.data?.message || 'Failed to check payment status',
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