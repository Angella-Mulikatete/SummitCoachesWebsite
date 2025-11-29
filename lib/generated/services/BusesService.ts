/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BusesService {
    /**
     * Get all active buses
     * Returns a paginated list of all active buses with essential information including company, bus type, and seat layout.
     * @param companyId Filter by company ID
     * @param busTypeId Filter by bus type ID
     * @param perPage Number of records per page
     * @returns any Buses retrieved successfully
     * @throws ApiError
     */
    public static ab77D58343C2Af956153D48C763Fa0C1(
        companyId?: number,
        busTypeId?: number,
        perPage?: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            current_page?: number;
            data?: Array<{
                id?: number;
                registration_number?: string;
                capacity?: number;
                status?: string;
                company?: {
                    id?: number;
                    name?: string;
                };
                bus_type?: {
                    id?: number;
                    name?: string;
                };
                seat_layout?: {
                    id?: number;
                    layout_name?: string;
                    total_seats?: number;
                };
            }>;
            per_page?: number;
            total?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/buses',
            query: {
                'company_id': companyId,
                'bus_type_id': busTypeId,
                'per_page': perPage,
            },
            errors: {
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get bus details with seat layout
     * Returns complete details for a specific bus including company information, bus type, seat layout, and individual seats.
     * @param id Bus ID
     * @returns any Bus details retrieved successfully
     * @throws ApiError
     */
    public static d08A206832D0C63B3C13897531B06430(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            id?: number;
            registration_number?: string;
            capacity?: number;
            status?: string;
            active?: boolean;
            company?: {
                id?: number;
                name?: string;
                logo?: string;
            };
            bus_type?: {
                id?: number;
                name?: string;
                description?: string;
            };
            seat_layout?: {
                id?: number;
                layout_name?: string;
                total_seats?: number;
                rows?: number;
                columns?: number;
            };
            seats?: Array<{
                id?: number;
                seat_number?: string;
                row_label?: string;
                position_x?: number;
                position_y?: number;
                is_window?: boolean;
                is_reserved?: boolean;
                status?: string;
            }>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/buses/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Bus not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Search buses by registration number
     * Search for buses by registration number with partial matching. Returns buses with company, bus type, and seat layout information.
     * @param q Search term (registration number)
     * @returns any Search completed successfully
     * @throws ApiError
     */
    public static c69699B85Faf98B3C646853Cf94887(
        q: string,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<{
            id?: number;
            registration_number?: string;
            bus_type_id?: number;
            capacity?: number;
            status?: string;
            company?: {
                id?: number;
                name?: string;
            };
            bus_type?: {
                id?: number;
                name?: string;
            };
            seat_layout?: {
                id?: number;
                layout_name?: string;
                total_seats?: number;
            };
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/buses/search',
            query: {
                'q': q,
            },
            errors: {
                422: `Validation error`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get bus seat map for booking
     * Returns the seat layout and available seats for a specific bus. Used by the booking system to display available seats.
     * @param id Bus ID
     * @returns any Seat map retrieved successfully
     * @throws ApiError
     */
    public static e5D968A9038D0F493E2Eb(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            bus_id?: number;
            capacity?: number;
            layout?: {
                name?: string;
                rows?: number;
                columns?: number;
                layout_data?: Record<string, any>;
            };
            available_seats?: Array<{
                seat_id?: number;
                number?: string;
                row?: string;
                position?: {
                    'x'?: number;
                    'y'?: number;
                };
                is_window?: boolean;
                is_reserved?: boolean;
            }>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/buses/{id}/seat-map',
            path: {
                'id': id,
            },
            errors: {
                404: `Bus not found or no seat layout`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get all seats for a bus
     * Returns all seats for a specific bus including unavailable ones. Useful for admin/management purposes.
     * @param id Bus ID
     * @returns any All seats retrieved successfully
     * @throws ApiError
     */
    public static afeca012737Bc3Bc37D3715498Adffd(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            bus_id?: number;
            registration_number?: string;
            capacity?: number;
            layout?: {
                name?: string;
                rows?: number;
                columns?: number;
            };
            seats?: Array<{
                seat_id?: number;
                seat_number?: string;
                row_label?: string;
                position_x?: number;
                position_y?: number;
                is_window?: boolean;
                is_reserved?: boolean;
                status?: string;
                active?: boolean;
            }>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/buses/{id}/seats',
            path: {
                'id': id,
            },
            errors: {
                404: `Bus not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get all trips for a specific bus
     * Returns all current and upcoming trips for a specific bus. Optimized for agent applications.
     * @param id Bus ID
     * @returns any Bus trips retrieved successfully
     * @throws ApiError
     */
    public static ec67F7F756B345D4F6743F1C2Af8721E(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            bus?: {
                id?: number;
                registration_number?: string;
                capacity?: number;
            };
            trips?: Array<{
                trip_id?: number;
                route_name?: string;
                origin?: string;
                destination?: string;
                trip_date?: string;
                departure_time?: string;
                status?: string;
                shift_name?: string;
            }>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/buses/{id}/trips',
            path: {
                'id': id,
            },
            errors: {
                404: `Bus not found or no trips`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Quick bus status check
     * Lightweight endpoint to check bus availability and basic status information.
     * @param id Bus ID
     * @returns any Bus status retrieved successfully
     * @throws ApiError
     */
    public static f31D4072C538D98F70D6Fd7Ef3287D9(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            id?: number;
            registration_number?: string;
            active?: boolean;
            status?: string;
            capacity?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/buses/{id}/status',
            path: {
                'id': id,
            },
            errors: {
                404: `Bus not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get available buses for scheduling
     * Returns buses that are available for scheduling on a specific date. Useful for trip planning and assignment.
     * @param date Date to check availability (YYYY-MM-DD format)
     * @param routeId Optional route ID for route-specific bus compatibility
     * @returns any Available buses retrieved successfully
     * @throws ApiError
     */
    public static c26Fb4C6A4E7904C5193C88D6B1Bc069(
        date: string,
        routeId?: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<{
            id?: number;
            registration_number?: string;
            bus_type_id?: number;
            capacity?: number;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/buses/available',
            query: {
                'date': date,
                'route_id': routeId,
            },
            errors: {
                422: `Validation error`,
                500: `Internal server error`,
            },
        });
    }
}
