/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from '../models/Account';
import type { TransactionDetailed } from '../models/TransactionDetailed';
import type { TransactionList } from '../models/TransactionList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TransactionsService {
    /**
     * Get all transactions with filters
     * @param perPage Items per page
     * @param type Filter by transaction type
     * @param status Filter by status
     * @param accountId Filter by account ID
     * @param paymentMethod Filter by payment method
     * @param startDate Filter from date (YYYY-MM-DD)
     * @param endDate Filter to date (YYYY-MM-DD)
     * @returns any Transactions retrieved successfully
     * @throws ApiError
     */
    public static b50E29E364179Ebde24Ac5Fc59Cd442(
        perPage: number = 20,
        type?: 'credit' | 'debit' | 'transfer' | 'refund' | 'expense' | 'income' | 'booking_payment' | 'penalty' | 'system_adjustment',
        status?: 'pending' | 'completed' | 'reversed' | 'failed',
        accountId?: number,
        paymentMethod?: string,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            current_page?: number;
            data?: Array<TransactionList>;
            total?: number;
        };
        summary?: {
            total_amount?: number;
            total_count?: number;
            completed_amount?: number;
        };
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions',
            query: {
                'per_page': perPage,
                'type': type,
                'status': status,
                'account_id': accountId,
                'payment_method': paymentMethod,
                'start_date': startDate,
                'end_date': endDate,
            },
            errors: {
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get single transaction details
     * @param id
     * @returns any Transaction retrieved successfully
     * @throws ApiError
     */
    public static e35076645E40D84080Bf253C06A689(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: TransactionDetailed;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Transaction not found`,
            },
        });
    }
    /**
     * Get transactions for a specific account
     * @param accountId
     * @returns any Account transactions retrieved successfully
     * @throws ApiError
     */
    public static c31Ad60944Bec744205Dae4746B7(
        accountId: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            current_page?: number;
            data?: Array<TransactionList>;
            total?: number;
        };
        account?: Account;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/accounts/{accountId}/transactions',
            path: {
                'accountId': accountId,
            },
            errors: {
                404: `Account not found`,
            },
        });
    }
    /**
     * Get daily transaction summary
     * @param date Date for summary (YYYY-MM-DD)
     * @returns any Daily transaction summary retrieved
     * @throws ApiError
     */
    public static ff976A1B16Bf004Bf686855B970534F4(
        date?: string,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            date?: string;
            summary?: Array<{
                type?: string;
                count?: number;
                total_amount?: number;
            }>;
            daily_total?: number;
        };
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions/daily-summary',
            query: {
                'date': date,
            },
            errors: {
                500: `Internal server error`,
            },
        });
    }
    /**
     * Reverse a transaction
     * @param id
     * @returns any Transaction reversed successfully
     * @throws ApiError
     */
    public static d7388933Af77789C6248D99365E5(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: TransactionList;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/transactions/{id}/reverse',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request`,
                404: `Transaction not found`,
                500: `Internal server error`,
            },
        });
    }
}
