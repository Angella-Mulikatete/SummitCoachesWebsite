/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SeatLayoutsService {
    /**
     * Get all active seat layouts (paginated)
     * @returns any List of seat layouts
     * @throws ApiError
     */
    public static a2548Db2034Cf75A20Ee0371727A669(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/seat-layouts',
        });
    }
    /**
     * Get details of a specific seat layout
     * @param id
     * @returns any Seat layout details
     * @throws ApiError
     */
    public static fc1Ddc20Fe44965A8645B7780C94A290(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/seat-layouts/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Seat layout not found`,
            },
        });
    }
}
