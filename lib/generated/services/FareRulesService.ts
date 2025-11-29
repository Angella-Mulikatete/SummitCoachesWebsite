/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FareRulesService {
    /**
     * List all fare rules
     * @returns any Fare rules retrieved successfully
     * @throws ApiError
     */
    public static db07F96B0Cb810D9581936E8910D970(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fare-rules',
            errors: {
                500: `Server error`,
            },
        });
    }
    /**
     * Get fare rule details by ID
     * @param id
     * @returns any Fare rule retrieved successfully
     * @throws ApiError
     */
    public static d763Dfdc2E4E04D67D2A0488A321F0(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fare-rules/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Fare rule not found`,
            },
        });
    }
}
