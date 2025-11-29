/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * Register as staff member (For Testing)
     * Self-registration for Booking Clerks, Conductors, Cashiers, Inspectors, Receptionists, and Drivers. Account requires admin approval.
     * @param requestBody
     * @returns any Staff account created - pending approval
     * @throws ApiError
     */
    public static b0D9De5185E5Cc811554Ad1Ee4E06E6(
        requestBody: {
            name: string;
            email: string;
            password: string;
            password_confirmation: string;
            phone: string;
            /**
             * Role ID (3=Booking Clerk, 4=Conductor, 5=Cashier, 6=Inspector, 7=Receptionist, 8=Driver)
             */
            role_id: number;
            gender: 'male' | 'female' | 'other';
            address?: string | null;
            id_type?: 'NIN' | 'Passport' | 'DriverLicense' | null;
            id_number?: string | null;
            company_id?: number | null;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register-staff',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation error`,
            },
        });
    }
    /**
     * Generate a test email verification link
     * Generates a hash-based verification link for testing email verification.
     * @param requestBody
     * @returns any Verification link generated successfully
     * @throws ApiError
     */
    public static bf6492Bcd2691Dce8F8Cef2E1E0Af3F(
        requestBody: {
            user_id: number;
            email: string;
        },
    ): CancelablePromise<{
        success?: boolean;
        verification_link?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/test-verification-link',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request`,
                404: `User not found`,
            },
        });
    }
    /**
     * Approve a staff account
     * Only Super Admins and Admins can approve staff accounts
     * @param id ID of the staff account to approve
     * @returns any Staff account approved successfully
     * @throws ApiError
     */
    public static f9B376D9602D7A0837Ac183E38C0D1Ea(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/staff/{id}/approve',
            path: {
                'id': id,
            },
            errors: {
                403: `Unauthorized`,
                404: `Staff not found`,
            },
        });
    }
    /**
     * Login user
     * @param requestBody
     * @returns any Login successful
     * @throws ApiError
     */
    public static d66635C4992Aeaa6Aa44Ff653D0563(
        requestBody: {
            email: string;
            password: string;
            /**
             * 2FA code if enabled
             */
            code?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Incorrect password`,
                403: `Email not verified or 2FA required`,
                404: `Invalid email address`,
            },
        });
    }
    /**
     * Logout current user (invalidate token)
     * @returns any Logged out successfully
     * @throws ApiError
     */
    public static abf3B64A4Bc7838D56346F05A5153Af(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/logout',
        });
    }
    /**
     * Verify email via verification link
     * @param id
     * @param hash
     * @returns any Email verified successfully
     * @throws ApiError
     */
    public static b697947Dc6Ac5C217A243914905654C(
        id: number,
        hash: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/verify-email/{id}/{hash}',
            path: {
                'id': id,
                'hash': hash,
            },
            errors: {
                400: `Invalid verification link or already verified`,
            },
        });
    }
    /**
     * Resend verification email to user
     * @param requestBody
     * @returns any Verification email resent successfully
     * @throws ApiError
     */
    public static a54Cb277848C94D61Ba6729Ba556Af94(
        requestBody: {
            email: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/resend-verification',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Email already verified`,
                404: `User not found`,
            },
        });
    }
    /**
     * Enable 2FA authentication
     * @returns any 2FA enabled with QR code
     * @throws ApiError
     */
    public static a904Ed093Ad7F97370Ae66Fcb4782340(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/2fa/enable',
        });
    }
    /**
     * Disable Two-Factor Authentication
     * Disables 2FA for the authenticated user by clearing their Google Authenticator secret and updating their 2FA status. This requires the user to be authenticated via Sanctum token.
     * @returns any 2FA disabled successfully
     * @throws ApiError
     */
    public static disable2Fa(): CancelablePromise<{
        success?: boolean;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/2fa/disable',
            errors: {
                400: `2FA is already disabled`,
                401: `Unauthorized - User not authenticated`,
                500: `Server error - Failed to disable 2FA`,
            },
        });
    }
    /**
     * Verify 2FA code
     * @param requestBody
     * @returns any 2FA verification successful
     * @throws ApiError
     */
    public static cda9Fdb40Db08Ae1B469Ba3F067376B5(
        requestBody: {
            code: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/2fa/verify',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
