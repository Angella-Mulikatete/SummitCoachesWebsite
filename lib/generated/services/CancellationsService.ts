/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CancellationsService {
    /**
     * List all cancellations
     * Retrieve all cancellation records with related booking, trip, passenger, refund, and transaction details. Supports filtering by status or type.
     * @param status Filter by cancellation status
     * @param cancellationType Filter by cancellation type
     * @returns any Cancellations retrieved successfully
     * @throws ApiError
     */
    public static bea57B9A490D7762F95F2C5865329Ee8(
        status?: string,
        cancellationType?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cancellations',
            query: {
                'status': status,
                'cancellation_type': cancellationType,
            },
        });
    }
    /**
     * Create a new cancellation
     * Allows a passenger, agent, or admin to initiate a cancellation request for a booking.
     * @param requestBody
     * @returns any Cancellation created successfully
     * @throws ApiError
     */
    public static f59A2D4682Ab2Da7D9Afada56D7Bee46(
        requestBody: {
            booking_id: number;
            cancellation_type: 'passenger' | 'system' | 'admin';
            reason_type: string;
            reason?: string;
            refund_amount: number;
            penalty_amount: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cancellations',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation failed`,
            },
        });
    }
    /**
     * View a specific cancellation record
     * Retrieve full cancellation details, including related booking, trip, refund, transaction, and audit info.
     * @param id Cancellation ID
     * @returns any Cancellation details retrieved successfully
     * @throws ApiError
     */
    public static b0C4979602346552F96B95F23A36(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cancellations/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Cancellation not found`,
            },
        });
    }
    /**
     * Update a cancellation record
     * Update cancellation status, reason, or refund values. Only permitted for authorized users.
     * @param id Cancellation ID
     * @param requestBody
     * @returns any Cancellation updated successfully
     * @throws ApiError
     */
    public static dba6B065D0A85564207B4557208E(
        id: number,
        requestBody?: {
            status?: string;
            reason?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/cancellations/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Cancellation not found`,
            },
        });
    }
    /**
     * Process refund for an approved cancellation
     * Mark refund as issued for approved cancellations. Typically executed by finance/admin staff.
     * @returns any Refund processed successfully
     * @throws ApiError
     */
    public static cbb2C918A573D5A8A3B1E563De8Ce092(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cancellations/{id}/refund',
            errors: {
                400: `Invalid status or already refunded`,
            },
        });
    }
    /**
     * Calculate refund amount for a booking
     * Estimate refund and penalty amounts using the active cancellation policy or standard rules.
     * @param requestBody
     * @returns any Refund calculation returned successfully
     * @throws ApiError
     */
    public static b8Fc0C27Aafdb878582A1C5Bed94F(
        requestBody: {
            booking_id?: number;
            cancellation_type?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cancellations/calculate-refund',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
