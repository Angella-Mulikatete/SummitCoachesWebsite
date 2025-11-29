/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Booking = {
    id?: number;
    reference?: string;
    trip_id?: number;
    passenger_id?: number;
    seat_id?: number;
    booking_type?: Booking.booking_type;
    passenger_type?: Booking.passenger_type;
    base_fare?: number;
    discount_amount?: number;
    total_amount?: number;
    luggage_count?: number;
    parcel_count?: number;
    luggage_charge?: number;
    parcel_charge?: number;
    grand_total?: number;
    payment_method?: Booking.payment_method;
    payment_status?: Booking.payment_status;
    status?: Booking.status;
    travel_date?: string;
    walkin_passenger_name?: string;
    walkin_passenger_phone?: string;
    walkin_passenger_email?: string;
    created_at?: string;
    updated_at?: string;
    passenger?: {
        user?: {
            name?: string;
            phone?: string;
        };
    };
    trip?: {
        id?: number;
        trip_code?: string;
        departure_time?: string;
    };
    seat?: {
        id?: number;
        seat_number?: string;
    };
    clerk?: {
        id?: number;
        name?: string;
    };
};
export namespace Booking {
    export enum booking_type {
        PASSENGER = 'passenger',
        LUGGAGE = 'luggage',
        PARCEL = 'parcel',
        MIXED = 'mixed',
    }
    export enum passenger_type {
        ADULT = 'adult',
        CHILD = 'child',
        SENIOR = 'senior',
        STUDENT = 'student',
        DISABLED = 'disabled',
    }
    export enum payment_method {
        CASH = 'cash',
        MOBILE_MONEY = 'mobile_money',
        CARD = 'card',
        BANK_TRANSFER = 'bank_transfer',
    }
    export enum payment_status {
        UNPAID = 'unpaid',
        PAID = 'paid',
    }
    export enum status {
        PENDING = 'pending',
        CONFIRMED = 'confirmed',
        CANCELLED = 'cancelled',
    }
}

