/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Transaction = {
    id?: number;
    reference?: string;
    type?: Transaction.type;
    amount?: number;
    currency?: string;
    payment_method?: string;
    narration?: string;
    transaction_date?: string;
    status?: Transaction.status;
};
export namespace Transaction {
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

