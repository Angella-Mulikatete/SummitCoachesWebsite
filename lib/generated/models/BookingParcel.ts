/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BookingParcel = {
    id?: number;
    tracking_code?: string;
    description?: string;
    weight?: number;
    charge?: number;
    status?: BookingParcel.status;
    sender_name?: string;
    sender_contact?: string;
    receiver_name?: string;
    receiver_contact?: string;
};
export namespace BookingParcel {
    export enum status {
        PENDING = 'pending',
        IN_TRANSIT = 'in_transit',
        DELIVERED = 'delivered',
        CANCELLED = 'cancelled',
    }
}

