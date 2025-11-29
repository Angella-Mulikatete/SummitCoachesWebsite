/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SeatsService {
    /**
     * List all seats with their bus and creator information (with optional filters)
     * Returns all seats including related bus details and creator information. Supports filtering by bus_id, active status, window seats, and seat status.
     * @param busId Filter by specific bus ID
     * @param active Filter by active status (true/false)
     * @param isWindow Filter by window seats (true/false)
     * @param status Filter by seat status (e.g., available, maintenance, reserved)
     * @param rowLabel Filter by row label (e.g., A, B, C)
     * @param perPage Number of records per page (default: 20)
     * @returns any Seats retrieved successfully with bus and creator relationships
     * @throws ApiError
     */
    public static ceccdaf31Bb12Ada4555B3E602D9Fe12(
        busId?: number,
        active?: boolean,
        isWindow?: boolean,
        status?: string,
        rowLabel?: string,
        perPage?: number,
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
        data?: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/seats',
            query: {
                'bus_id': busId,
                'active': active,
                'is_window': isWindow,
                'status': status,
                'row_label': rowLabel,
                'per_page': perPage,
            },
            errors: {
                500: `Server error`,
            },
        });
    }
    /**
     * Get a seat by ID
     * @param id
     * @returns any Seat retrieved successfully
     * @throws ApiError
     */
    public static a239E0C9261Bcfa381B626B30627Bc(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/seats/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Seat not found`,
            },
        });
    }
    /**
     * Get all seats for a specific bus
     * @param busId
     * @returns any Seats retrieved successfully
     * @throws ApiError
     */
    public static ced556Df70C02De143C3Efc5F2E0542A(
        busId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/seats/bus/{bus_id}',
            path: {
                'bus_id': busId,
            },
            errors: {
                404: `Bus not found or has no seats`,
            },
        });
    }
}
