/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DriverShift = {
    id?: number;
    name?: string;
    start_time_12h?: string;
    end_time_12h?: string;
    duration_formatted?: string;
    trips?: Array<{
        id?: number;
        trip_code?: string;
        trip_date?: string;
        departure_time?: string;
        route?: {
            id?: number;
            name?: string;
            origin?: string;
            destination?: string;
        };
        bus?: {
            id?: number;
            registration_number?: string;
        };
    }>;
};

