/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RolesService {
    /**
     * Get staff roles (excluding admin roles)
     * Fetches all staff roles.
     * @returns any List of staff roles retrieved successfully
     * @throws ApiError
     */
    public static a24C2586907Aea122Fa431141959801(): CancelablePromise<{
        success?: boolean;
        roles?: Array<{
            id?: number;
            name?: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/staff-roles',
        });
    }
}
