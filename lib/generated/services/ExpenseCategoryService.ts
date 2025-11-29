/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ExpenseCategoryService {
    /**
     * Get all expense categories
     * @returns any Success
     * @throws ApiError
     */
    public static ed4Ff2E9F1Aa3D488Bdd1Ee72Af(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/expense-categories',
        });
    }
}
