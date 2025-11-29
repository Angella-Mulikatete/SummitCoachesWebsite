/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TransactionList = {
    id?: number;
    reference?: string;
    type?: TransactionList.type;
    amount?: number;
    currency?: string;
    status?: TransactionList.status;
    payment_method?: string | null;
    narration?: string;
    transaction_date?: string;
    created_at?: string;
    account?: {
        id?: number;
        name?: string;
        account_number?: string;
    };
    booking?: {
        id?: number;
        reference?: string;
    } | null;
};
export namespace TransactionList {
    export enum type {
        CREDIT = 'credit',
        DEBIT = 'debit',
        TRANSFER = 'transfer',
        REFUND = 'refund',
        EXPENSE = 'expense',
        INCOME = 'income',
        BOOKING_PAYMENT = 'booking_payment',
        PENALTY = 'penalty',
        SYSTEM_ADJUSTMENT = 'system_adjustment',
    }
    export enum status {
        PENDING = 'pending',
        COMPLETED = 'completed',
        REVERSED = 'reversed',
        FAILED = 'failed',
    }
}

