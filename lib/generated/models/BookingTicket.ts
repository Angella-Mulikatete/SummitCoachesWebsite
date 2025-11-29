/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BookingTicket = {
    id?: number;
    ticket_number?: string;
    seat_number?: string;
    amount_paid?: number;
    payment_method?: BookingTicket.payment_method;
    payment_status?: BookingTicket.payment_status;
    travel_date?: string;
    status?: BookingTicket.status;
};
export namespace BookingTicket {
    export enum payment_method {
        CASH = 'cash',
        MOBILE_MONEY = 'mobile_money',
        CARD = 'card',
        BANK_TRANSFER = 'bank_transfer',
    }
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

