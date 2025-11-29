/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Location model
 */
export type Location = {
    id?: number;
    name?: string;
    code?: string;
    /**
     * Location type: city, town, village, etc.
     */
    type?: string;
    /**
     * ISO 3166-1 alpha-3 country code
     */
    country_code?: string;
    latitude?: number | null;
    longitude?: number | null;
    active?: boolean;
    region_name?: string | null;
    parent_name?: string | null;
    /**
     * Number of routes (only in popular endpoint)
     */
    route_count?: number;
};

