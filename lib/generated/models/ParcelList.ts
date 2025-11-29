/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ParcelList = {
    id?: number;
    tracking_code?: string;
    sender_name?: string;
    receiver_name?: string;
    description?: string;
    weight?: number;
    charge?: number;
    status?: ParcelList.status;
    pickup_location?: string;
    dropoff_location?: string;
    created_at?: string;
    trip?: {
        id?: number;
        trip_code?: string;
    };
    bus?: {
        id?: number;
        registration_number?: string;
    };
};
export namespace ParcelList {
    export enum status {
        PENDING = 'pending',
        IN_TRANSIT = 'in_transit',
        DELIVERED = 'delivered',
        CANCELLED = 'cancelled',
    }
}

