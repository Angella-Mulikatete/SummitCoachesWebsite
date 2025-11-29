/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LuggageTypesService {
    /**
     * List all luggage types
     * @param active
     * @returns any List retrieved successfully
     * @throws ApiError
     */
    public static ddf27427B419Eb84628Ca6D2894Fa(
        active?: boolean,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/luggage-types',
            query: {
                'active': active,
            },
        });
    }
    /**
     * Get a specific luggage type by ID
     * @param id
     * @returns any Luggage type retrieved successfully
     * @throws ApiError
     */
    public static c06B9302184084D74Ade4Ada1353F4C(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/luggage-types/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
}
