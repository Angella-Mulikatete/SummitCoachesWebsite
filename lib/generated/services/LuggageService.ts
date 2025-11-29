/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LuggageService {
    /**
     * List all luggage records with filters and pagination
     * @param status
     * @param isWithPassenger
     * @param search
     * @param sortBy
     * @param sortOrder
     * @param perPage
     * @returns any Luggages retrieved successfully
     * @throws ApiError
     */
    public static b6Be2A006Ac7F6C2E54A0E692D22Dbfa(
        status?: string,
        isWithPassenger?: boolean,
        search?: string,
        sortBy?: string,
        sortOrder?: 'asc' | 'desc',
        perPage?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/luggages',
            query: {
                'status': status,
                'is_with_passenger': isWithPassenger,
                'search': search,
                'sort_by': sortBy,
                'sort_order': sortOrder,
                'per_page': perPage,
            },
            errors: {
                500: `Server error`,
            },
        });
    }
    /**
     * Create a new luggage record
     * @param requestBody
     * @returns any Luggage created successfully
     * @throws ApiError
     */
    public static f12362F8E1Aa6Ee663Ffd67Abb1371Ec(
        requestBody: {
            luggage_type_id: number;
            passenger_id?: number;
            booking_id?: number;
            trip_id?: number;
            bus_id?: number;
            description?: string;
            weight: number;
            charge: number;
            status?: string;
            is_with_passenger?: boolean;
            sender_name?: string;
            sender_contact?: string;
            receiver_name?: string;
            receiver_contact?: string;
            pickup_location?: string;
            dropoff_location?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/luggages',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation failed`,
            },
        });
    }
    /**
     * Get a specific luggage by ID
     * @param id
     * @returns any Luggage retrieved successfully
     * @throws ApiError
     */
    public static d8548B96C5B87134Cd1D5C655434Be93(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/luggages/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Luggage not found`,
            },
        });
    }
    /**
     * Update an existing luggage record
     * @param id
     * @param requestBody
     * @returns any Luggage updated successfully
     * @throws ApiError
     */
    public static b508D55B335Edeab4479D7Ca7Dc531Fc(
        id: number,
        requestBody: {
            luggage_type_id?: number;
            passenger_id?: number;
            booking_id?: number;
            trip_id?: number;
            bus_id?: number;
            description?: string;
            weight?: number;
            charge?: number;
            status?: string;
            is_with_passenger?: boolean;
            sender_name?: string;
            sender_contact?: string;
            receiver_name?: string;
            receiver_contact?: string;
            pickup_location?: string;
            dropoff_location?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/luggages/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Luggage not found`,
                422: `Validation failed`,
            },
        });
    }
    /**
     * Delete a luggage record
     * @param id
     * @returns any Luggage deleted successfully
     * @throws ApiError
     */
    public static b43F6629E84Ed903F540Df526(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/luggages/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Luggage not found`,
            },
        });
    }
    /**
     * Bulk delete luggage records
     * @param requestBody
     * @returns any Luggages deleted successfully
     * @throws ApiError
     */
    public static cb356C6014B8720Cf7B412C07Cb(
        requestBody: {
            ids: Array<number>;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/luggages/bulk-delete',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation failed`,
            },
        });
    }
    /**
     * Mark luggage as dispatched
     * @param id
     * @returns any Luggage marked as dispatched
     * @throws ApiError
     */
    public static e2C730532F916A3E8A3C263(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/luggages/{id}/dispatch',
            path: {
                'id': id,
            },
            errors: {
                404: `Luggage not found`,
            },
        });
    }
    /**
     * Mark luggage as delivered
     * @param id
     * @returns any Luggage marked as delivered
     * @throws ApiError
     */
    public static a69Fb4B3B778Bf4E397Bbf6A79787(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/luggages/{id}/deliver',
            path: {
                'id': id,
            },
            errors: {
                404: `Luggage not found`,
            },
        });
    }
    /**
     * Track luggage by tracking code
     * @param trackingCode
     * @returns any Luggage found
     * @throws ApiError
     */
    public static c24A3618A829240C7D7F8D8Bad8Fef7(
        trackingCode: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/luggages/track/{tracking_code}',
            path: {
                'tracking_code': trackingCode,
            },
            errors: {
                404: `Luggage not found`,
            },
        });
    }
}
