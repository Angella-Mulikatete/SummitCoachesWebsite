/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Ticket = {
    id?: number;
    ticket_number?: string;
    seat_number?: string;
    amount_paid?: number;
    payment_method?: string | null;
    payment_status?: Ticket.payment_status;
    status?: Ticket.status;
    travel_date?: string;
    used_at?: string | null;
    revoked?: boolean;
    revoked_reason?: string | null;
    created_at?: string;
    updated_at?: string;
};
export namespace Ticket {
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

