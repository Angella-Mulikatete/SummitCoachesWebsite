/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Shift } from './Shift';
export type ShiftWithDetails = (Shift & {
    trips?: Array<{
        id?: number;
        trip_code?: string;
        trip_date?: string;
        departure_time?: string;
        route?: {
            id?: number;
            name?: string;
        };
        bus?: {
            id?: number;
            registration_number?: string;
        };
    }>;
    assignments?: Array<{
        id?: number;
        user?: {
            id?: number;
            name?: string;
            email?: string;
        };
    }>;
});

