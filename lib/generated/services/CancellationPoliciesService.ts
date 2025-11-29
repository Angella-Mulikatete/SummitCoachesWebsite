/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CancellationPoliciesService {
    /**
     * List all cancellation policies
     * Retrieve all cancellation policies with their company, route, and bus-type associations.
     * @param status Filter by policy status
     * @returns any List of policies retrieved successfully
     * @throws ApiError
     */
    public static a7B2A45F3D764Fe2A1F6804109523Ea(
        status?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/policies',
            query: {
                'status': status,
            },
        });
    }
}
