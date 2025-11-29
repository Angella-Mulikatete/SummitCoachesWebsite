/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Route } from '../models/Route';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RoutesService {
    /**
     * Get all routes with advanced filtering
     * High-performance endpoint with date filtering and trip availability
     * @param companyId Filter by company ID
     * @param active Filter active routes (default: true)
     * @param search Search in route name, code, origin, or destination
     * @param dateFilter Filter by trip date range: today, tomorrow, this_week, next_week, weekend, specific date (YYYY-MM-DD), or range (YYYY-MM-DD,YYYY-MM-DD)
     * @param hasTrips Only return routes that have available trips
     * @param minSeats Minimum available seats required
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getAllRoutes(
        companyId?: number,
        active: boolean = true,
        search?: string,
        dateFilter?: string,
        hasTrips?: boolean,
        minSeats?: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<{
            id?: number;
            name?: string;
            code?: string;
            direction?: string;
            company_name?: string;
            origin?: string;
            destination?: string;
            distance_km?: number;
            duration_minutes?: number;
            base_fare?: number;
            active?: boolean;
            next_trip_date?: string;
            available_trips_count?: number;
            min_fare?: number;
        }>;
        message?: string;
        /**
         * Applied filters summary
         */
        filters?: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes',
            query: {
                'company_id': companyId,
                'active': active,
                'search': search,
                'date_filter': dateFilter,
                'has_trips': hasTrips,
                'min_seats': minSeats,
            },
        });
    }
    /**
     * Get available date filters
     * Returns all available date filter options
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getDateFilters(): CancelablePromise<{
        success?: boolean;
        data?: {
            date_filters?: Array<{
                key?: string;
                label?: string;
                description?: string;
            }>;
            today?: string;
        };
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes/date-filters',
        });
    }
    /**
     * Get route details
     * Returns essential details for a specific route
     * @param id Route ID
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getRouteById(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: Route;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get trips for route
     * Returns upcoming trips for a route
     * @param id Route ID
     * @param date Filter by date (YYYY-MM-DD)
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getRouteTrips(
        id: number,
        date?: string,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            route?: Route;
            trips?: Array<{
                id?: number;
                trip_code?: string;
                trip_date?: string;
                departure_time?: string;
                arrival_time?: string;
                available_seats?: number;
                bus_type?: string;
                bus_registration?: string;
                fare?: number;
                status?: string;
            }>;
        };
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes/{id}/trips',
            path: {
                'id': id,
            },
            query: {
                'date': date,
            },
        });
    }
    /**
     * Search routes
     * High-performance route search
     * @param q Search term
     * @returns any Successful operation
     * @throws ApiError
     */
    public static searchRoutes(
        q: string,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<Route>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes/search',
            query: {
                'q': q,
            },
        });
    }
    /**
     * Get popular routes
     * Returns most popular routes based on recent bookings
     * @param limit Number of results (default: 10)
     * @param days Days to look back (default: 30)
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getPopularRoutes(
        limit: number = 10,
        days: number = 30,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<Route>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes/popular',
            query: {
                'limit': limit,
                'days': days,
            },
        });
    }
    /**
     * Get active routes
     * Returns all active routes with essential data only
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getActiveRoutes(): CancelablePromise<{
        success?: boolean;
        data?: Array<Route>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes/active',
        });
    }
    /**
     * Get featured routes
     * Returns featured routes with highest trip counts
     * @param limit Number of results (default: 6)
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getFeaturedRoutes(
        limit: number = 6,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<Route>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes/featured',
            query: {
                'limit': limit,
            },
        });
    }
    /**
     * Get fares for a route
     * Returns all fare options available for a specific route
     * @param id Route ID
     * @param busTypeId Filter fares by bus type
     * @param active Get only active fares
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getRouteFares(
        id: number,
        busTypeId?: number,
        active?: boolean,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            route?: Route;
            fares?: Array<{
                id?: number;
                base_amount?: number;
                fare_type?: string;
                bus_type_name?: string;
                is_peak?: boolean;
                active?: boolean;
            }>;
        };
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes/{id}/fares',
            path: {
                'id': id,
            },
            query: {
                'bus_type_id': busTypeId,
                'active': active,
            },
        });
    }
    /**
     * Get reverse route
     * Returns the reverse direction route if it exists
     * @param id Route ID
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getReverseRoute(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: Route;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes/{id}/reverse',
            path: {
                'id': id,
            },
            errors: {
                404: `Reverse route not found`,
            },
        });
    }
    /**
     * Get route statistics
     * Returns statistics for a route
     * @param id Route ID
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getRouteStats(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            route_id?: number;
            code?: string;
            name?: string;
            direction?: string;
            distance_km?: number;
            duration_minutes?: number;
            total_trips?: number;
            upcoming_trips?: number;
            completed_trips?: number;
            total_bookings?: number;
            average_occupancy_rate?: number;
        };
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes/{id}/stats',
            path: {
                'id': id,
            },
        });
    }
}
