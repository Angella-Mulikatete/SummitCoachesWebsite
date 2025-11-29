/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TripsService {
    /**
     * Search and filter trips
     * Get available trips with filtering by route, date, and other criteria
     * @param routeId
     * @param tripDate
     * @param origin
     * @param destination
     * @param perPage
     * @returns any Trips retrieved successfully
     * @throws ApiError
     */
    public static ed65B907Bc4Ee55E575689B029B07(
        routeId?: number,
        tripDate?: string,
        origin?: string,
        destination?: string,
        perPage?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trips',
            query: {
                'route_id': routeId,
                'trip_date': tripDate,
                'origin': origin,
                'destination': destination,
                'per_page': perPage,
            },
        });
    }
    /**
     * Get trip details
     * Get detailed information about a specific trip
     * @param id
     * @returns any Trip details retrieved
     * @throws ApiError
     */
    public static d78Ac59A3Df1420C8B62A5D47B9Dc(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trips/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Trip not found`,
            },
        });
    }
    /**
     * Check seat availability
     * Get real-time seat availability for a trip
     * @param id
     * @returns any Seat availability retrieved
     * @throws ApiError
     */
    public static e09511B2880Bfda79155F604745(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trips/{id}/availability',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get seat layout
     * Get bus seat layout with availability status
     * @param id
     * @returns any Seat layout retrieved
     * @throws ApiError
     */
    public static eeb467Ecf00267071Efb77Ed0(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trips/{id}/seats',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get trip staff
     * Get staff assigned to this trip (drivers, conductors)
     * @param id
     * @returns any Staff retrieved
     * @throws ApiError
     */
    public static b09678C5C4779C53Ec29997Cbfbb877(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trips/{id}/staff',
            path: {
                'id': id,
            },
        });
    }
}
