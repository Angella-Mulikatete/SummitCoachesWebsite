/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Parcel } from './Parcel';
export type ParcelDetailed = (Parcel & {
    booking?: {
        id?: number;
        reference?: string;
        passenger?: {
            user?: {
                id?: number;
                name?: string;
                phone?: string;
            };
        };
    } | null;
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
    bus?: {
        id?: number;
        registration_number?: string;
        bus_type?: string;
    };
    creator?: {
        id?: number;
        name?: string;
    } | null;
    updater?: {
        id?: number;
        name?: string;
    } | null;
});

