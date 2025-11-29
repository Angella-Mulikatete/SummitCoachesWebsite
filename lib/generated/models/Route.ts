/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Route = {
    id?: number;
    name?: string;
    code?: string;
    company_name?: string;
    origin?: string;
    destination?: string;
    direction?: Route.direction;
    distance_km?: number;
    duration_minutes?: number;
    base_fare?: number;
    active?: boolean;
};
export namespace Route {
    export enum direction {
        DEPARTURE = 'departure',
        RETURN = 'return',
        BOTH = 'both',
    }
}

