/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccountsService {
    /**
     * Get logged-in user's account
     * Retrieve the active account for the authenticated booking clerk or user
     * @returns any Account retrieved successfully
     * @throws ApiError
     */
    public static getMyAccount(): CancelablePromise<{
        success?: boolean;
        message?: string;
        data?: {
            id?: number;
            account_number?: string;
            name?: string;
            opening_balance?: number;
            current_balance?: number;
            currency?: string;
            ownership?: 'system' | 'company' | 'user';
            is_active?: boolean;
            type?: {
                id?: number;
                name?: string;
            };
            user?: {
                id?: number;
                name?: string;
                email?: string;
            };
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account',
            errors: {
                401: `Unauthenticated`,
                404: `No active account found for user`,
            },
        });
    }
    /**
     * List all accounts with pagination
     * Retrieve paginated list of accounts with related type and user information. Returns empty array with helpful message when no accounts exist.
     * @param perPage Number of accounts per page (default: 15, max: 100)
     * @param page Page number to retrieve
     * @returns any Accounts retrieved successfully (or empty array if no accounts exist)
     * @throws ApiError
     */
    public static listAccounts(
        perPage: number = 15,
        page: number = 1,
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
        data?: Array<{
            id?: number;
            account_number?: string;
            name?: string;
            opening_balance?: number;
            current_balance?: number;
            currency?: string;
            ownership?: string;
            is_active?: boolean;
            created_at?: string;
            updated_at?: string;
            type?: {
                id?: number;
                name?: string;
            };
            user?: {
                id?: number;
                name?: string;
                email?: string;
            } | null;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/accounts',
            query: {
                'per_page': perPage,
                'page': page,
            },
            errors: {
                401: `Unauthenticated`,
            },
        });
    }
    /**
     * Get account details by ID
     * Retrieve detailed information for a specific account
     * @param id Account ID
     * @returns any Account details retrieved successfully
     * @throws ApiError
     */
    public static getAccountById(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
        data?: {
            id?: number;
            account_number?: string;
            name?: string;
            opening_balance?: number;
            current_balance?: number;
            currency?: string;
            ownership?: string;
            is_active?: boolean;
            created_at?: string;
            updated_at?: string;
            type?: {
                id?: number;
                name?: string;
            };
            user?: {
                id?: number;
                name?: string;
                email?: string;
            } | null;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/accounts/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthenticated`,
                404: `Account not found`,
            },
        });
    }
}
