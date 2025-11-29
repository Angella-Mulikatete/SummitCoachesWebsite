/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Fare } from '../models/Fare';
import type { FareType } from '../models/FareType';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FaresService {
    /**
     * List all fare options
     * Retrieve all fares with optional filtering. Returns optimized response without timestamps for better performance.
     * @param routeId Filter by route ID
     * @param busTypeId Filter by bus type ID
     * @param fareType Filter by fare type
     * @param active Filter active fares (default: true)
     * @param isDefault Filter default fares
     * @returns any Fares retrieved successfully
     * @throws ApiError
     */
    public static getAllFares(
        routeId?: number,
        busTypeId?: number,
        fareType?: 'standard' | 'discount' | 'special' | 'holiday' | 'promotional' | 'student' | 'senior' | 'group',
        active: boolean = true,
        isDefault?: boolean,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<Fare>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fares',
            query: {
                'route_id': routeId,
                'bus_type_id': busTypeId,
                'fare_type': fareType,
                'active': active,
                'is_default': isDefault,
            },
            errors: {
                500: `Server error`,
            },
        });
    }
    /**
     * Get fare details
     * Retrieve detailed information for a specific fare including route, bus type, and pricing rules.
     * @param id Fare ID
     * @returns any Fare retrieved successfully
     * @throws ApiError
     */
    public static getFareById(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: Fare;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fares/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Fare not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Get fares for a route
     * Retrieve all fares for a specific route with optional bus type filtering.
     * @param routeId Route ID
     * @param busTypeId Filter by bus type ID
     * @param active Filter active fares (default: true)
     * @returns any Fares retrieved successfully
     * @throws ApiError
     */
    public static getFaresByRoute(
        routeId: number,
        busTypeId?: number,
        active: boolean = true,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<Fare>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes/{route_id}/fares',
            path: {
                'route_id': routeId,
            },
            query: {
                'bus_type_id': busTypeId,
                'active': active,
            },
            errors: {
                404: `Route not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Get default fare for a route
     * Retrieve the default fare for a specific route with optional bus type filtering.
     * @param routeId Route ID
     * @param busTypeId Filter by bus type ID
     * @returns any Default fare retrieved successfully
     * @throws ApiError
     */
    public static getDefaultFareByRoute(
        routeId: number,
        busTypeId?: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: Fare;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes/{route_id}/default-fare',
            path: {
                'route_id': routeId,
            },
            query: {
                'bus_type_id': busTypeId,
            },
            errors: {
                404: `No default fare found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Get fares by bus type
     * Retrieve all fares for a specific bus type with optional route filtering.
     * @param busTypeId Bus Type ID
     * @param routeId Filter by route ID
     * @returns any Fares retrieved successfully
     * @throws ApiError
     */
    public static getFaresByBusType(
        busTypeId: number,
        routeId?: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<Fare>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fares/bus-type/{bus_type_id}',
            path: {
                'bus_type_id': busTypeId,
            },
            query: {
                'route_id': routeId,
            },
            errors: {
                404: `No fares found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Get fare types with counts
     * Retrieve all fare types with active fare counts for analytics and filtering purposes.
     * @returns any Fare types retrieved successfully
     * @throws ApiError
     */
    public static getFareTypes(): CancelablePromise<{
        success?: boolean;
        data?: Array<FareType>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fares/types',
            errors: {
                500: `Server error`,
            },
        });
    }
}
