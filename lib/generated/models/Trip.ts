/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Trip = {
    id?: number;
    trip_code?: string;
    trip_date?: string;
    departure_time?: string;
    arrival_time?: string;
    status?: Trip.status;
    active?: boolean;
    available_seats?: number;
    bus_id?: number;
    route_id?: number;
    shift_id?: number;
    created_at?: string;
    updated_at?: string;
};
export namespace Trip {
    export enum status {
        SCHEDULED = 'scheduled',
        DEPARTED = 'departed',
        ARRIVED = 'arrived',
        CANCELLED = 'cancelled',
    }
}

