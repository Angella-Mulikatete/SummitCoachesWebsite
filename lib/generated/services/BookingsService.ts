/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Booking } from '../models/Booking';
import type { BookingDetailed } from '../models/BookingDetailed';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookingsService {
    /**
     * Get all bookings with pagination and filters
     * @param perPage Number of items per page
     * @param status Filter by booking status
     * @param paymentStatus Filter by payment status
     * @param bookingType Filter by booking type
     * @param tripId Filter by trip ID
     * @param passengerId Filter by passenger ID
     * @returns any Bookings retrieved successfully
     * @throws ApiError
     */
    public static b89B932C131E727A3720A01899Acd0A2(
        perPage: number = 15,
        status?: 'pending' | 'confirmed' | 'cancelled',
        paymentStatus?: 'unpaid' | 'paid',
        bookingType?: 'passenger' | 'luggage' | 'parcel' | 'mixed',
        tripId?: number,
        passengerId?: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            current_page?: number;
            data?: Array<Booking>;
            first_page_url?: string;
            from?: number;
            last_page?: number;
            last_page_url?: string;
            links?: Array<Record<string, any>>;
            next_page_url?: string;
            path?: string;
            per_page?: number;
            prev_page_url?: string;
            to?: number;
            total?: number;
        };
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bookings',
            query: {
                'per_page': perPage,
                'status': status,
                'payment_status': paymentStatus,
                'booking_type': bookingType,
                'trip_id': tripId,
                'passenger_id': passengerId,
            },
            errors: {
                500: `Internal server error`,
            },
        });
    }
    /**
     * Create a new booking
     * @param requestBody
     * @returns any Booking created successfully
     * @throws ApiError
     */
    public static aa028B063E31D6Efe9C093Aa88(
        requestBody: {
            trip_id: number;
            seat_id?: number | null;
            booking_type: 'passenger' | 'luggage' | 'parcel' | 'mixed';
            passenger_selection_mode: 'existing' | 'walkin';
            passenger_id?: number | null;
            walkin_passenger_name?: string;
            walkin_passenger_phone?: string;
            walkin_passenger_email?: string;
            passenger_type: 'adult' | 'child' | 'senior' | 'student' | 'disabled';
            luggage_count?: number;
            luggage_type_id?: number | null;
            luggage_charge?: number;
            parcel_count?: number;
            parcel_charge?: number;
            parcel_description?: string;
            payment_method: 'cash' | 'mobile_money' | 'card' | 'bank_transfer';
            payment_status: 'unpaid' | 'paid';
            status: 'pending' | 'confirmed' | 'cancelled';
        },
    ): CancelablePromise<{
        success?: boolean;
        data?: Booking;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bookings',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error or booking creation failed`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get single booking details
     * @param id Booking ID
     * @returns any Booking retrieved successfully
     * @throws ApiError
     */
    public static a7E24B15B1F9Fe6C357532B3C5200A3(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: BookingDetailed;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bookings/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Booking not found`,
            },
        });
    }
    /**
     * Update booking status or payment status
     * @param id Booking ID
     * @param requestBody
     * @returns any Booking updated successfully
     * @throws ApiError
     */
    public static af203837311Ea0Dd4Fca355623(
        id: number,
        requestBody: {
            status?: 'pending' | 'confirmed' | 'cancelled';
            payment_status?: 'unpaid' | 'paid';
            seat_id?: number;
        },
    ): CancelablePromise<{
        success?: boolean;
        data?: Booking;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/bookings/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Booking not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Cancel a booking
     * @param id Booking ID
     * @returns any Booking cancelled successfully
     * @throws ApiError
     */
    public static bc3Aca96Afaea31759C232E7B998E3(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bookings/{id}/cancel',
            path: {
                'id': id,
            },
            errors: {
                400: `Booking already cancelled`,
                404: `Booking not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get bookings for a specific passenger
     * @param passengerId Passenger ID
     * @returns any Passenger bookings retrieved successfully
     * @throws ApiError
     */
    public static db7B50Ad7F39Ec68D88D536D34190F(
        passengerId: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            current_page?: number;
            data?: Array<Booking>;
            total?: number;
        };
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/passengers/{passengerId}/bookings',
            path: {
                'passengerId': passengerId,
            },
            errors: {
                500: `Internal server error`,
            },
        });
    }
}
