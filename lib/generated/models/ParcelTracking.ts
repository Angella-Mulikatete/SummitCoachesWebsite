/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ParcelTracking = {
    id?: number;
    tracking_code?: string;
    description?: string;
    weight?: number;
    charge?: number;
    status?: ParcelTracking.status;
    sender_name?: string;
    sender_contact?: string;
    receiver_name?: string;
    receiver_contact?: string;
    pickup_location?: string;
    dropoff_location?: string;
    dispatched_at?: string | null;
    delivered_at?: string | null;
    trip?: {
        id?: number;
        trip_code?: string;
        route?: {
            name?: string;
            origin?: string;
            destination?: string;
        };
    };
    bus?: {
        id?: number;
        registration_number?: string;
    };
};
export namespace ParcelTracking {
    export enum status {
        PENDING = 'pending',
        IN_TRANSIT = 'in_transit',
        DELIVERED = 'delivered',
        CANCELLED = 'cancelled',
    }
}

