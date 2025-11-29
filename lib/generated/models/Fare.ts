/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BusType } from './BusType';
import type { Route } from './Route';
export type Fare = {
    id?: number;
    route_id?: number;
    bus_type_id?: number | null;
    base_amount?: number;
    fare_type?: Fare.fare_type;
    is_peak?: boolean;
    is_default?: boolean;
    effective_from?: string | null;
    effective_to?: string | null;
    active?: boolean;
    route?: Route;
    bus_type?: BusType | null;
    rules_count?: number;
};
export namespace Fare {
    export enum fare_type {
        STANDARD = 'standard',
        DISCOUNT = 'discount',
        SPECIAL = 'special',
        HOLIDAY = 'holiday',
        PROMOTIONAL = 'promotional',
        STUDENT = 'student',
        SENIOR = 'senior',
        GROUP = 'group',
    }
}

