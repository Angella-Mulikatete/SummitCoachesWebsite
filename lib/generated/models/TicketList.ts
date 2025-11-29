/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TicketList = {
    id?: number;
    ticket_number?: string;
    seat_number?: string;
    amount_paid?: number;
    payment_status?: TicketList.payment_status;
    status?: TicketList.status;
    travel_date?: string;
    created_at?: string;
    passenger?: {
        user?: {
            id?: number;
            name?: string;
            phone?: string;
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
        };
    };
};
export namespace TicketList {
    export enum payment_status {
        PENDING = 'pending',
        PAID = 'paid',
        REFUNDED = 'refunded',
        CANCELLED = 'cancelled',
    }
    export enum status {
        ACTIVE = 'active',
        USED = 'used',
        CANCELLED = 'cancelled',
        EXPIRED = 'expired',
    }
}

