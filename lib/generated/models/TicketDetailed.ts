/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Ticket } from './Ticket';
export type TicketDetailed = (Ticket & {
    passenger?: {
        id?: number;
        user?: {
            id?: number;
            name?: string;
            phone?: string;
            email?: string;
        };
    };
    trip?: {
        id?: number;
        trip_code?: string;
        route?: {
            id?: number;
            name?: string;
            origin?: string;
            destination?: string;
            distance_km?: number;
            duration_minutes?: number;
        };
        bus?: {
            id?: number;
            bus_type?: {
                id?: number;
                name?: string;
                description?: string;
            };
        };
        shift?: {
            id?: number;
            name?: string;
            start_time?: string;
            end_time?: string;
        };
    };
    booking?: {
        id?: number;
        reference?: string;
        booking_type?: string;
        seat?: {
            id?: number;
            seat_number?: string;
            seat_type?: string;
        };
    } | null;
    fare?: {
        id?: number;
        base_amount?: number;
        fare_type?: string;
        is_peak?: boolean;
    } | null;
    creator?: {
        id?: number;
        name?: string;
    } | null;
});

