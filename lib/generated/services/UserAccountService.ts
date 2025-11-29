/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserAccountService {
    /**
     * Get authenticated user profile
     * @returns any Profile retrieved successfully
     * @throws ApiError
     */
    public static bd0250Ee34235B4Fc170A8F1E28F4Bd5(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/profile',
        });
    }
    /**
     * Update authenticated user profile (PUT)
     * Update the profile information of the currently authenticated user. Only the provided fields will be updated. Email, role, status, and password cannot be changed through this endpoint. Supports partial updates - send only the fields you want to change.
     * @param requestBody Profile data to update. All fields are optional - only send fields you want to update.
     * @returns any Profile updated successfully
     * @throws ApiError
     */
    public static updateProfilePut(
        requestBody: {
            /**
             * Full name of the user
             */
            name?: string;
            /**
             * Phone number (accepts: 0700123456, +256700123456, or 256700123456)
             */
            phone?: string;
            /**
             * Gender (must be exactly: male, female, or other - lowercase)
             */
            gender?: 'male' | 'female' | 'other';
            /**
             * Physical address (optional)
             */
            address?: string | null;
            /**
             * Type of identification document (optional)
             */
            id_type?: 'NIN' | 'Passport' | 'DriverLicense' | null;
            /**
             * Identification number (optional, will be converted to uppercase)
             */
            id_number?: string | null;
            /**
             * Profile photo URL (optional, must be a valid URL)
             */
            profile_photo?: string | null;
            /**
             * Emergency contact phone number (optional)
             */
            emergency_contact?: string | null;
        },
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
        /**
         * Updated user profile data
         */
        data?: {
            id?: number;
            name?: string;
            email?: string;
            phone?: string;
            gender?: string;
            address?: string;
            id_type?: string;
            id_number?: string;
            profile_photo?: string;
            emergency_contact?: string;
            updated_at?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/auth/profile/update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthenticated - No valid token provided`,
                422: `Validation error - Invalid input data or duplicate phone/ID number`,
                500: `Server error - Failed to update profile`,
            },
        });
    }
    /**
     * Update authenticated user profile (POST)
     * Update the profile information of the currently authenticated user. Only the provided fields will be updated. Email, role, status, and password cannot be changed through this endpoint. Supports partial updates - send only the fields you want to change.
     * @param requestBody Profile data to update. All fields are optional - only send fields you want to update.
     * @returns any Profile updated successfully
     * @throws ApiError
     */
    public static updateProfilePost(
        requestBody: {
            /**
             * Full name of the user
             */
            name?: string;
            /**
             * Phone number (accepts: 0700123456, +256700123456, or 256700123456)
             */
            phone?: string;
            /**
             * Gender (must be exactly: male, female, or other - lowercase)
             */
            gender?: 'male' | 'female' | 'other';
            /**
             * Physical address (optional)
             */
            address?: string | null;
            /**
             * Type of identification document (optional)
             */
            id_type?: 'NIN' | 'Passport' | 'DriverLicense' | null;
            /**
             * Identification number (optional, will be converted to uppercase)
             */
            id_number?: string | null;
            /**
             * Profile photo URL (optional, must be a valid URL)
             */
            profile_photo?: string | null;
            /**
             * Emergency contact phone number (optional)
             */
            emergency_contact?: string | null;
        },
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
        /**
         * Updated user profile data
         */
        data?: {
            id?: number;
            name?: string;
            email?: string;
            phone?: string;
            gender?: string;
            address?: string;
            id_type?: string;
            id_number?: string;
            profile_photo?: string;
            emergency_contact?: string;
            updated_at?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/profile/update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthenticated - No valid token provided`,
                422: `Validation error - Invalid input data or duplicate phone/ID number`,
                500: `Server error - Failed to update profile`,
            },
        });
    }
    /**
     * Update authenticated user profile (PATCH - Partial Update)
     * Partially update the profile information of the currently authenticated user. Only the provided fields will be updated. Email, role, status, and password cannot be changed through this endpoint. This is the recommended method for partial updates where you only want to change specific fields.
     * @param requestBody Profile data to update. All fields are optional - only send fields you want to update.
     * @returns any Profile updated successfully
     * @throws ApiError
     */
    public static updateProfilePatch(
        requestBody: {
            /**
             * Full name of the user
             */
            name?: string;
            /**
             * Phone number (accepts: 0700123456, +256700123456, or 256700123456)
             */
            phone?: string;
            /**
             * Gender (must be exactly: male, female, or other - lowercase)
             */
            gender?: 'male' | 'female' | 'other';
            /**
             * Physical address (optional)
             */
            address?: string | null;
            /**
             * Type of identification document (optional)
             */
            id_type?: 'NIN' | 'Passport' | 'DriverLicense' | null;
            /**
             * Identification number (optional, will be converted to uppercase)
             */
            id_number?: string | null;
            /**
             * Profile photo URL (optional, must be a valid URL)
             */
            profile_photo?: string | null;
            /**
             * Emergency contact phone number (optional)
             */
            emergency_contact?: string | null;
        },
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
        /**
         * Updated user profile data
         */
        data?: {
            id?: number;
            name?: string;
            email?: string;
            phone?: string;
            gender?: string;
            address?: string;
            id_type?: string;
            id_number?: string;
            profile_photo?: string;
            emergency_contact?: string;
            updated_at?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/auth/profile/update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthenticated - No valid token provided`,
                422: `Validation error - Invalid input data or duplicate phone/ID number`,
                500: `Server error - Failed to update profile`,
            },
        });
    }
    /**
     * Update profile photo
     * @param formData
     * @returns any Photo updated successfully
     * @throws ApiError
     */
    public static c2Dbced0416A8A2A8Dc3455F3C24D65(
        formData?: {
            profile_photo?: Blob;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/photo/update',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Change user password
     * @param requestBody
     * @returns any Password changed successfully
     * @throws ApiError
     */
    public static fda315B75D254Df9Dab2508Ff66665B5(
        requestBody: {
            old_password: string;
            new_password: string;
            new_password_confirmation: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/password/change',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
