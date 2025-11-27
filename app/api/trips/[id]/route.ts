// src/app/api/trips/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'https://summit.mellonhardware.com/api';

// GET /api/trips/[id] - Get specific trip
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await axios.get(`${LARAVEL_API_URL}/trips/${params.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { 
          success: false, 
          message: error.response?.data?.message || 'Trip not found',
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

// PUT /api/trips/[id] - Update trip (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const token = request.headers.get('authorization');

    const response = await axios.put(
      `${LARAVEL_API_URL}/trips/${params.id}`,
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
          message: error.response?.data?.message || 'Failed to update trip',
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

// DELETE /api/trips/[id] - Delete trip (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization');

    const response = await axios.delete(`${LARAVEL_API_URL}/trips/${params.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': token }),
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { 
          success: false, 
          message: error.response?.data?.message || 'Failed to delete trip',
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