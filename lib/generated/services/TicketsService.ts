/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Ticket } from '../models/Ticket';
import type { TicketDetailed } from '../models/TicketDetailed';
import type { TicketList } from '../models/TicketList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TicketsService {
    /**
     * Get all tickets with filters
     * @param perPage Items per page
     * @param status Filter by status
     * @param paymentStatus Filter by payment status
     * @param tripId Filter by trip ID
     * @param passengerId Filter by passenger ID
     * @param travelDate Filter by travel date (YYYY-MM-DD)
     * @returns any Tickets retrieved successfully
     * @throws ApiError
     */
    public static abb903Edea59Ceb366F9F029C26991(
        perPage: number = 15,
        status?: 'active' | 'used' | 'cancelled' | 'expired',
        paymentStatus?: 'pending' | 'paid' | 'refunded' | 'cancelled',
        tripId?: number,
        passengerId?: number,
        travelDate?: string,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            current_page?: number;
            data?: Array<TicketList>;
            total?: number;
        };
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tickets',
            query: {
                'per_page': perPage,
                'status': status,
                'payment_status': paymentStatus,
                'trip_id': tripId,
                'passenger_id': passengerId,
                'travel_date': travelDate,
            },
            errors: {
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get single ticket details
     * @param id
     * @returns any Ticket retrieved successfully
     * @throws ApiError
     */
    public static c431B84Bf9E4919256Db5Db1D(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: TicketDetailed;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tickets/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Ticket not found`,
            },
        });
    }
    /**
     * Verify ticket for boarding
     * @param ticketNumber
     * @returns any Ticket verification completed
     * @throws ApiError
     */
    public static aa82Ee859Fa62Ac7Cabae200E5F5472(
        ticketNumber: string,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            ticket?: Ticket;
            is_valid?: boolean;
            verification_message?: string;
        };
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tickets/verify/{ticketNumber}',
            path: {
                'ticketNumber': ticketNumber,
            },
            errors: {
                404: `Ticket not found`,
            },
        });
    }
    /**
     * Mark ticket as used (boarding)
     * @param id
     * @returns any Ticket marked as used successfully
     * @throws ApiError
     */
    public static c873E24F7D4Fab2B912C6Dbd813221D9(
        id: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: Ticket;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tickets/{id}/mark-used',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request`,
                404: `Ticket not found`,
            },
        });
    }
    /**
     * Revoke ticket
     * @param id
     * @param requestBody
     * @returns any Ticket revoked successfully
     * @throws ApiError
     */
    public static d93A654B804Fd2201F90303341Fd3E4(
        id: number,
        requestBody: {
            reason: string;
        },
    ): CancelablePromise<{
        success?: boolean;
        data?: Ticket;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tickets/{id}/revoke',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                404: `Ticket not found`,
            },
        });
    }
    /**
     * Get tickets for a specific passenger
     * @param passengerId
     * @returns any Passenger tickets retrieved successfully
     * @throws ApiError
     */
    public static e0184D9Af07A1648D8D322D1E9Cf(
        passengerId: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            current_page?: number;
            data?: Array<TicketList>;
            total?: number;
        };
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/passengers/{passengerId}/tickets',
            path: {
                'passengerId': passengerId,
            },
            errors: {
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get tickets for a specific trip
     * @param tripId
     * @returns any Trip tickets retrieved successfully
     * @throws ApiError
     */
    public static f39F021Ec5C20Fed5134079Ae1312428(
        tripId: number,
    ): CancelablePromise<{
        success?: boolean;
        data?: Array<TicketList>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trips/{tripId}/tickets',
            path: {
                'tripId': tripId,
            },
            errors: {
                500: `Internal server error`,
            },
        });
    }
}
