/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Seat = {
    id?: number;
    seat_number?: string;
    seat_type?: Seat.seat_type;
    bus_id?: number;
    active?: boolean;
};
export namespace Seat {
    export enum seat_type {
        STANDARD = 'standard',
        VIP = 'vip',
        PRIORITY = 'priority',
    }
}

