/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Booking } from './Booking';
import type { BookingParcel } from './BookingParcel';
import type { BookingTicket } from './BookingTicket';
import type { Luggage } from './Luggage';
import type { Transaction } from './Transaction';
export type BookingDetailed = (Booking & {
    passenger?: {
        user?: {
            name?: string;
            phone?: string;
            email?: string;
        };
    };
    trip?: {
        route?: {
            name?: string;
            origin?: string;
            destination?: string;
        };
        bus?: {
            bus_type?: {
                name?: string;
            };
        };
    };
    seat?: {
        seat_number?: string;
        seat_type?: string;
    };
    fare?: {
        base_amount?: number;
        fare_type?: string;
    };
    clerk?: {
        name?: string;
        email?: string;
    };
    luggages?: Array<Luggage>;
    parcels?: Array<BookingParcel>;
    tickets?: Array<BookingTicket>;
    transactions?: Array<Transaction>;
});

