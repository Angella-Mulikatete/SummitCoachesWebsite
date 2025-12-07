// // src/app/api/bookings/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import axios from 'axios';

// const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://admin.summitcoachesug.com/api/v1';

// // GET /api/bookings - Get user's bookings (requires auth)
// export async function GET(request: NextRequest) {
//   try {
//     const token = request.headers.get('authorization');

//     if (!token) {
//       return NextResponse.json(
//         { success: false, message: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     const response = await axios.get(`${LARAVEL_API_URL}/bookings/my`, {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': token,
//       },
//     });

//     return NextResponse.json(response.data, { status: 200 });
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: error.response?.data?.message || 'Failed to fetch bookings',
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

// // POST /api/bookings - Create a new booking
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     console.log('Creating booking:', body);

//     const response = await axios.post(
//       `${LARAVEL_API_URL}/bookings/create`,
//       body,
//       {
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     console.log('Booking created:', response.data);

//     return NextResponse.json(response.data, { status: response.status });
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('Booking creation error:', error.response?.data);
//       return NextResponse.json(
//         error.response?.data || {
//           success: false,
//           message: 'Failed to create booking',
//         },
//         { status: error.response?.status || 500 }
//       );
//     }

//     console.error('Unexpected error creating booking:', error);
//     return NextResponse.json(
//       { success: false, message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }


// src/app/api/bookings/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'https://admin.summitcoachesug.com/api/v1';

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Get auth token from headers if available
        const authToken = request.headers.get('Authorization');
        
        const headers: any = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        
        if (authToken) {
            headers['Authorization'] = authToken;
        }

        console.log(' Frontend API - Sending booking to Laravel:');
        console.log('URL:', `${LARAVEL_API_URL}/bookings/create`);
        console.log('Headers:', headers);
        console.log('Payload:', JSON.stringify(body, null, 2));


        const response = await axios.post(
            `${LARAVEL_API_URL}/bookings/create`,
            body,
            { headers }
        );

        console.log('Booking created successfully:', response.data);

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Booking creation error:', error);
        
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.response?.data?.message || 'Failed to create booking',
                    errors: error.response?.data?.errors || {}
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

// GET /api/bookings - Get user's bookings (if needed)
export async function GET(request: NextRequest) {
    try {
        const authToken = request.headers.get('Authorization');
        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get('status');

        if (!authToken) {
            return NextResponse.json(
                { success: false, message: 'Authentication required' },
                { status: 401 }
            );
        }

        const queryParams = status ? { status } : {};

        const response = await axios.get(
            `${LARAVEL_API_URL}/bookings`,
            {
                params: queryParams,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': authToken,
                },
            }
        );

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