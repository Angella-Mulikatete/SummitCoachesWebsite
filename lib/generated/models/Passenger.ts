/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Passenger = {
    id?: number;
    user_id?: number | null;
    passenger_type?: Passenger.passenger_type;
    is_verified?: boolean;
    loyalty_points?: number;
    walkin_name?: string | null;
    walkin_phone?: string | null;
    walkin_email?: string | null;
};
export namespace Passenger {
    export enum passenger_type {
        ADULT = 'adult',
        CHILD = 'child',
        SENIOR = 'senior',
        STUDENT = 'student',
        DISABLED = 'disabled',
    }
}

