/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bus } from '../models/Bus';
import type { BusType } from '../models/BusType';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BusTypesService {
    /**
     * Get all active bus types
     * Returns optimized list of active bus types
     * @param active
     * @returns any Bus types retrieved successfully
     * @throws ApiError
     */
    public static getBusTypes(
        active: boolean = true,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<BusType>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bus-types',
            query: {
                'active': active,
            },
            errors: {
                500: `Server error`,
            },
        });
    }
    /**
     * Get bus type details
     * Returns detailed information about a specific bus type
     * @param id
     * @returns any Bus type retrieved successfully
     * @throws ApiError
     */
    public static getBusTypeById(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: BusType;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bus-types/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Bus type not found`,
            },
        });
    }
    /**
     * Get buses for bus type
     * Returns all active buses for a specific bus type
     * @param id
     * @param active
     * @returns any Buses retrieved successfully
     * @throws ApiError
     */
    public static getBusesByBusType(
        id: number,
        active: boolean = true,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<Bus>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bus-types/{id}/buses',
            path: {
                'id': id,
            },
            query: {
                'active': active,
            },
            errors: {
                404: `Bus type not found`,
            },
        });
    }
    /**
     * Get bus types statistics
     * Returns statistics about bus types including counts and active buses
     * @returns any Statistics retrieved successfully
     * @throws ApiError
     */
    public static getBusTypesStats(): CancelablePromise<{
        success?: boolean;
        data?: {
            total_bus_types?: number;
            active_bus_types?: number;
            total_buses?: number;
            active_buses?: number;
        };
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bus-types/stats/overview',
        });
    }
    /**
     * Get bus types for dropdown
     * Returns minimal bus type data for dropdown/select components
     * @returns any Bus types retrieved successfully
     * @throws ApiError
     */
    public static getBusTypesDropdown(): CancelablePromise<{
        success?: boolean;
        data?: Array<{
            id?: number;
            name?: string;
            code?: string;
        }>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bus-types/dropdown',
        });
    }
}
