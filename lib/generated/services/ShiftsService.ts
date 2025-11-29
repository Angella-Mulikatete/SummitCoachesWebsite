/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DriverShift } from '../models/DriverShift';
import type { Shift } from '../models/Shift';
import type { ShiftWithDetails } from '../models/ShiftWithDetails';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ShiftsService {
    /**
     * List all shifts
     * @param page Page number
     * @param perPage Items per page
     * @param active Filter by active status
     * @param search Search by shift name
     * @returns any Shifts retrieved successfully
     * @throws ApiError
     */
    public static e275E0Aeeecac3D9Aa2Bd5367Cda019(
        page: number = 1,
        perPage: number = 20,
        active?: boolean,
        search?: string,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            shifts?: Array<Shift>;
            pagination?: {
                total?: number;
                per_page?: number;
                current_page?: number;
                last_page?: number;
            };
        };
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/shifts',
            query: {
                'page': page,
                'per_page': perPage,
                'active': active,
                'search': search,
            },
            errors: {
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get shift details with assignments
     * @param id Shift ID
     * @returns any Shift details retrieved successfully
     * @throws ApiError
     */
    public static caef1F162B521038A285606B5Ae096Ab(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: ShiftWithDetails;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/shifts/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Shift not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get upcoming shifts for a driver
     * @param driverId Driver ID
     * @param daysAhead Number of days ahead to look for shifts
     * @returns any Driver shifts retrieved successfully
     * @throws ApiError
     */
    public static bdff4Df0Cb6D5A5B5576A384023Ce(
        driverId: number,
        daysAhead: number = 7,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            shifts?: Array<DriverShift>;
            driver?: {
                id?: number;
                name?: string;
            };
            meta?: {
                total_upcoming?: number;
            };
        };
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/drivers/{driverId}/shifts',
            path: {
                'driverId': driverId,
            },
            query: {
                'days_ahead': daysAhead,
            },
            errors: {
                404: `Driver not found`,
                500: `Internal server error`,
            },
        });
    }
}
