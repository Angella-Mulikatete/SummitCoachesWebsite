/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ExpensesService {
    /**
     * Get all expenses
     * @returns any Success
     * @throws ApiError
     */
    public static getExpenses(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/expenses',
        });
    }
    /**
     * Create a new expense
     * @returns any Created
     * @throws ApiError
     */
    public static createExpense(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/expenses',
        });
    }
    /**
     * Get a specific expense
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static getExpenseById(
        id: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/expenses/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update an expense
     * @param expense
     * @returns any Updated
     * @throws ApiError
     */
    public static updateExpense(
        expense: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/expenses/{expense}',
            path: {
                'expense': expense,
            },
        });
    }
    /**
     * Delete a single expense
     * @param expense
     * @returns any Deleted
     * @throws ApiError
     */
    public static deleteExpense(
        expense: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/expenses/{expense}',
            path: {
                'expense': expense,
            },
        });
    }
}
