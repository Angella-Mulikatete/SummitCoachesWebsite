// src/app/api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'https://admin.summitcoachesug.com/api/v1'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('🔐 Login request:', body)

    const response = await axios.post(`${LARAVEL_API_URL}/auth/login`, body, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })

    console.log('✅ Login response:', response.data)

    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    console.error('❌ Login error:', error)
    
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Login failed',
          errors: error.response?.data?.errors,
        },
        { status: error.response?.status || 500 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}