/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompaniesService {
    /**
     * List all companies
     * Fetch all registered companies with essential details
     * @returns any Companies retrieved successfully
     * @throws ApiError
     */
    public static ed2Ae55723C6A9506353Eab8145498(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/companies',
        });
    }
    /**
     * Get details of a specific company
     * @param id
     * @returns any Company details retrieved successfully
     * @throws ApiError
     */
    public static de43B30Ed21F7C223D9Faba2342427(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/companies/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Company not found`,
            },
        });
    }
}
