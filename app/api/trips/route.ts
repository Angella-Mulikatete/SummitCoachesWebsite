// // src/app/api/trips/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import axios from 'axios';

// const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://admin.summitcoachesug.com/api/v1';

// // GET /api/trips - Get all trips or search with query params
// export async function GET(request: NextRequest) {
//   try {
//     const searchParams = request.nextUrl.searchParams;

//     // Build query parameters
//     // Default to 'today' date filter if no specific date is requested, to hide past trips
//     const hasDateParams = searchParams.has('date') || searchParams.has('date_filter');
//     const params = {
//       origin: searchParams.get('origin'),
//       destination: searchParams.get('destination'),
//       date: searchParams.get('date'),
//       date_filter: searchParams.get('date_filter') || (!hasDateParams ? 'today' : undefined),
//       page: searchParams.get('page'),
//       per_page: searchParams.get('per_page'),
//     };

//     // Remove null/undefined values
//     const cleanParams = Object.fromEntries(
//       Object.entries(params).filter(([_, v]) => v != null)
//     );

//     const response = await axios.get(`${LARAVEL_API_URL}/trips`, {
//       params: cleanParams,
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//     });

//     console.log("Trip Response data:", response.data);

//     return NextResponse.json(response.data, { status: 200 });
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: error.response?.data?.message || 'Failed to fetch trips',
//           errors: error.response?.data?.errors
//         },
//         { status: error.response?.status || 500 }
//       );
//     }

//     return NextResponse.json(
//       { success: false, message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// // POST /api/trips - Create a new trip (admin only)
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const token = request.headers.get('authorization');

//     const response = await axios.post(
//       `${LARAVEL_API_URL}/trips`,
//       body,
//       {
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           ...(token && { 'Authorization': token }),
//         },
//       }
//     );

//     return NextResponse.json(response.data, { status: 201 });
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: error.response?.data?.message || 'Failed to create trip',
//           errors: error.response?.data?.errors
//         },
//         { status: error.response?.status || 500 }
//       );
//     }

//     return NextResponse.json(
//       { success: false, message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }






// src/app/api/trips/route.ts - FIXED VERSION

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://admin.summitcoachesug.com/api/v1';

// GET /api/trips - Get all trips or search with query params
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Extract parameters
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const routeId = searchParams.get('route_id');
    const specificDate = searchParams.get('trip_date') || searchParams.get('date');
    const page = searchParams.get('page');
    const perPage = searchParams.get('per_page');

    // Build params - DON'T send trip_date unless user specifically requested a date
    const params: Record<string, string> = {};

    // ✅ FIX: Only send trip_date if user specifically requested it
    // Otherwise, let Laravel return all upcoming trips
    if (specificDate) {
      params.trip_date = specificDate;
    }
    // ❌ DON'T default to today - this filters OUT future trips!
    
    if (origin) params.origin = origin;
    if (destination) params.destination = destination;
    if (routeId) params.route_id = routeId;
    if (page) params.page = page;
    if (perPage) params.per_page = perPage;

    console.log("📡 Fetching trips with params:", params);

    const response = await axios.get(`${LARAVEL_API_URL}/trips`, {
      params,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log("✅ API Response:", {
      success: response.data.success,
      tripCount: response.data.data?.trips?.length || 0,
      message: response.data.message
    });

    // ✅ FILTER: On frontend, filter out past trips
    let trips = response.data.data?.trips || response.data.data || [];
    
    if (Array.isArray(trips) && !specificDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today
      
      trips = trips.filter((trip: any) => {
        const tripDate = new Date(trip.trip_date || trip.date);
        tripDate.setHours(0, 0, 0, 0);
        return tripDate >= today; // Only today and future
      });
      
      console.log(`🔍 Filtered to ${trips.length} upcoming trips`);
    }

    return NextResponse.json({
      ...response.data,
      data: {
        ...response.data.data,
        trips
      }
    }, { status: 200 });

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Laravel API Error:", error.response?.data);
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch trips',
          errors: error.response?.data?.errors
        },
        { status: error.response?.status || 500 }
      );
    }

    console.error("❌ Internal Error:", error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/trips - Create a new trip (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get('authorization');

    console.log("📝 Creating trip:", body);

    const response = await axios.post(
      `${LARAVEL_API_URL}/trips`,
      body,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': token }),
        },
      }
    );

    console.log("✅ Trip created:", response.data);

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Failed to create trip:", error.response?.data);
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to create trip',
          errors: error.response?.data?.errors
        },
        { status: error.response?.status || 500 }
      );
    }

    console.error("❌ Internal Error:", error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}