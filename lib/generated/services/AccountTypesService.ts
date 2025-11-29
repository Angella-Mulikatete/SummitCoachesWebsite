/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccountTypesService {
    /**
     * Get all active account types (public)
     * Retrieve a list of all active account types available for public access.
     * @returns any List of active account types retrieved successfully.
     * @throws ApiError
     */
    public static bdec068B64728Ed4B04787F35F4F72Fa(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account-types',
        });
    }
    /**
     * Get a specific account type by ID
     * Retrieve details of a specific account type by its ID.
     * @param id Account Type ID
     * @returns any Account type found successfully.
     * @throws ApiError
     */
    public static d48Bb2Ae6Ac070052Ee60B3A4B6(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account-types/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Account type not found.`,
            },
        });
    }
    /**
     * Create a new account type (Admin only)
     * @param requestBody
     * @returns any Account type created successfully.
     * @throws ApiError
     */
    public static bce99C47Be9Ad7657De26232D0Eb9A4D(
        requestBody: {
            name: string;
            description?: string;
            is_system?: boolean;
            is_active?: boolean;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/account-types',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation failed.`,
            },
        });
    }
    /**
     * Update an existing account type (Admin only)
     * @param id Account Type ID
     * @param requestBody
     * @returns any Account type updated successfully.
     * @throws ApiError
     */
    public static f8Fe4137C5E5553341Ce28B346078Bf7(
        id: number,
        requestBody: {
            name?: string;
            description?: string;
            is_active?: boolean;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/account-types/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Account type not found.`,
            },
        });
    }
    /**
     * Delete an account type (Admin only)
     * Admins can delete a specific account type record by ID.
     * @param id Account Type ID
     * @returns any Deleted successfully.
     * @throws ApiError
     */
    public static f0Fa5248Bb687A42De4272287763310(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/account-types/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Account type not found.`,
            },
        });
    }
    /**
     * Toggle account type active status (Admin only)
     * Admins can activate or deactivate an account type record.
     * @param id Account Type ID
     * @returns any Account type status toggled successfully.
     * @throws ApiError
     */
    public static a0401747Be7136A2D4C78B149A1B(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/account-types/{id}/status',
            path: {
                'id': id,
            },
            errors: {
                404: `Account type not found.`,
            },
        });
    }
    /**
     * Bulk delete multiple account types (Admin only)
     * @param requestBody
     * @returns any Account types deleted successfully.
     * @throws ApiError
     */
    public static a22B89D966D18E69186C6D3Dfadb541B(
        requestBody: {
            ids: Array<number>;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/account-types/bulk-delete',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request or missing IDs.`,
            },
        });
    }
}
