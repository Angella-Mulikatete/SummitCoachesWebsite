/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Country } from '../models/Country';
import type { Location } from '../models/Location';
import type { LocationType } from '../models/LocationType';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LocationsService {
    /**
     * Get all active locations
     * Retrieve all active locations with optional filtering
     * @param type
     * @param countryCode
     * @param search
     * @param limit
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getAllLocations(
        type?: 'city' | 'town' | 'village' | 'district' | 'region' | 'county' | 'subcounty' | 'parish',
        countryCode?: 'UGA' | 'KEN' | 'TZA' | 'RWA' | 'BDI' | 'SSD' | 'COD',
        search?: string,
        limit: number = 100,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<Location>;
        message?: string;
        count?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations',
            query: {
                'type': type,
                'country_code': countryCode,
                'search': search,
                'limit': limit,
            },
            errors: {
                500: `Server error`,
            },
        });
    }
    /**
     * Search locations
     * Search locations by name, code, type, region, or parent location
     * @param q
     * @param type
     * @param countryCode
     * @param limit
     * @returns any Successful operation
     * @throws ApiError
     */
    public static searchLocations(
        q: string,
        type?: 'city' | 'town' | 'village' | 'district' | 'region' | 'county' | 'subcounty' | 'parish',
        countryCode?: 'UGA' | 'KEN' | 'TZA' | 'RWA' | 'BDI' | 'SSD' | 'COD',
        limit: number = 20,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<Location>;
        message?: string;
        count?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations/search',
            query: {
                'q': q,
                'type': type,
                'country_code': countryCode,
                'limit': limit,
            },
            errors: {
                422: `Validation error`,
            },
        });
    }
    /**
     * Quick search locations for autocomplete
     * Quick search locations by name or code only (lightweight for autocomplete)
     * @param q
     * @param limit
     * @returns any Successful operation
     * @throws ApiError
     */
    public static quickSearchLocations(
        q: string,
        limit: number = 10,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<{
            id?: number;
            name?: string;
            code?: string;
            type?: string;
            country_code?: string;
            display_name?: string;
        }>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations/quick-search',
            query: {
                'q': q,
                'limit': limit,
            },
        });
    }
    /**
     * Get location types
     * Retrieve all available location types with counts
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getLocationTypes(): CancelablePromise<{
        success?: boolean;
        data?: Array<LocationType>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations/types',
        });
    }
    /**
     * Get popular locations
     * Retrieve most popular locations based on route counts
     * @param limit
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getPopularLocations(
        limit: number = 10,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<Location>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations/popular',
            query: {
                'limit': limit,
            },
        });
    }
    /**
     * Get location by ID
     * Retrieve detailed information for a specific location
     * @param id
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getLocationById(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: Location;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Location not found`,
            },
        });
    }
    /**
     * Get supported countries
     * Retrieve all supported countries with location counts
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getSupportedCountries(): CancelablePromise<{
        success?: boolean;
        data?: Array<Country>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations/countries',
        });
    }
}
