/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TransactionList } from './TransactionList';
export type TransactionDetailed = (TransactionList & {
    related_account?: {
        id?: number;
        name?: string;
        account_number?: string;
    } | null;
    passenger?: {
        id?: number;
        user?: {
            id?: number;
            name?: string;
            phone?: string;
        };
    } | null;
    ticket?: {
        id?: number;
        ticket_number?: string;
    } | null;
    creator?: {
        id?: number;
        name?: string;
        email?: string;
    } | null;
    updater?: {
        id?: number;
        name?: string;
        email?: string;
    } | null;
});

