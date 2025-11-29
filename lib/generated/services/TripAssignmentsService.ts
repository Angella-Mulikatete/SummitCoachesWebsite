/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TripAssignmentsService {
    /**
     * Get all staff assigned to a trip
     * Returns all assigned staff (driver, conductor, inspector, etc.) for a specific trip.
     * @param tripId Trip ID
     * @returns any Trip staff retrieved successfully
     * @throws ApiError
     */
    public static dfbde65Ba1Bd44D0F38893980Da03Cb8(
        tripId: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: Record<string, any>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trips/{tripId}/staff',
            path: {
                'tripId': tripId,
            },
            errors: {
                404: `Trip not found`,
            },
        });
    }
}
