/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Luggage = {
    id?: number;
    tracking_code?: string;
    description?: string;
    weight?: number;
    charge?: number;
    status?: Luggage.status;
    is_with_passenger?: boolean;
};
export namespace Luggage {
    export enum status {
        PENDING = 'pending',
        IN_TRANSIT = 'in_transit',
        DELIVERED = 'delivered',
        CANCELLED = 'cancelled',
    }
}

