/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateParcelRequest } from '../models/CreateParcelRequest';
import type { Parcel } from '../models/Parcel';
import type { ParcelDetailed } from '../models/ParcelDetailed';
import type { ParcelList } from '../models/ParcelList';
import type { ParcelTracking } from '../models/ParcelTracking';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ParcelsService {
    /**
     * Get all parcels with filters
     * @param perPage Items per page
     * @param status Filter by status
     * @param tripId Filter by trip ID
     * @param busId Filter by bus ID
     * @param search Search by tracking code or names
     * @returns any Parcels retrieved successfully
     * @throws ApiError
     */
    public static ac55F3242Be3E57B5Fb6F334E3F8F193(
        perPage: number = 15,
        status?: 'pending' | 'in_transit' | 'delivered' | 'cancelled',
        tripId?: number,
        busId?: number,
        search?: string,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            current_page?: number;
            data?: Array<ParcelList>;
            total?: number;
        };
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/parcels',
            query: {
                'per_page': perPage,
                'status': status,
                'trip_id': tripId,
                'bus_id': busId,
                'search': search,
            },
            errors: {
                500: `Internal server error`,
            },
        });
    }
    /**
     * Create a new parcel
     * @param requestBody
     * @returns any Parcel created successfully
     * @throws ApiError
     */
    public static bffbdbae34Db60Cd528Babe33384656B(
        requestBody: CreateParcelRequest,
    ): CancelablePromise<{
        success?: boolean;
        data?: Parcel;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/parcels',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get single parcel details
     * @param id
     * @returns any Parcel retrieved successfully
     * @throws ApiError
     */
    public static c586A417Fab6E5E832D3B317128Def7D(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: ParcelDetailed;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/parcels/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Parcel not found`,
            },
        });
    }
    /**
     * Update parcel status
     * @param id
     * @param requestBody
     * @returns any Parcel status updated successfully
     * @throws ApiError
     */
    public static d93E50228Dc042E277326398D4F70D09(
        id: number,
        requestBody: {
            status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
        },
    ): CancelablePromise<{
        success?: boolean;
        data?: Parcel;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/parcels/{id}/status',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Parcel not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Track parcel by tracking code
     * @param trackingCode
     * @returns any Parcel tracking information retrieved
     * @throws ApiError
     */
    public static bbf02Af402D4Cde6A5Fd3D69E022F90(
        trackingCode: string,
    ): CancelablePromise<{
        success?: boolean;
        data?: ParcelTracking;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/parcels/track/{trackingCode}',
            path: {
                'trackingCode': trackingCode,
            },
            errors: {
                404: `Parcel not found`,
            },
        });
    }
    /**
     * Get parcels for a specific trip
     * @param tripId
     * @returns any Trip parcels retrieved successfully
     * @throws ApiError
     */
    public static b40B4F183510Ebeb36Db1E215(
        tripId: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<ParcelList>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/trips/{tripId}/parcels',
            path: {
                'tripId': tripId,
            },
            errors: {
                500: `Internal server error`,
            },
        });
    }
}
