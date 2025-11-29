/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Parcel = {
    id?: number;
    tracking_code?: string;
    booking_id?: number | null;
    trip_id?: number;
    bus_id?: number;
    description?: string;
    weight?: number;
    charge?: number;
    status?: Parcel.status;
    sender_name?: string;
    sender_contact?: string;
    receiver_name?: string;
    receiver_contact?: string;
    pickup_location?: string;
    dropoff_location?: string;
    dispatched_at?: string | null;
    delivered_at?: string | null;
    created_at?: string;
    updated_at?: string;
};
export namespace Parcel {
    export enum status {
        PENDING = 'pending',
        IN_TRANSIT = 'in_transit',
        DELIVERED = 'delivered',
        CANCELLED = 'cancelled',
    }
}

