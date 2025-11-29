/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateParcelRequest = {
    booking_id?: number | null;
    trip_id: number;
    bus_id: number;
    description: string;
    weight?: number;
    charge: number;
    sender_name: string;
    sender_contact: string;
    receiver_name: string;
    receiver_contact: string;
    pickup_location: string;
    dropoff_location: string;
};

