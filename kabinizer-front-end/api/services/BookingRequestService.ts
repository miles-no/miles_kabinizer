/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookingRequest } from '../models/BookingRequest';
import type { CreateBookingRequestDto } from '../models/CreateBookingRequestDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BookingRequestService {

    /**
     * @returns BookingRequest Success
     * @throws ApiError
     */
    public static getApiBookingRequest(): CancelablePromise<Array<BookingRequest>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/BookingRequest',
        });
    }

    /**
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static postApiBookingRequest(
        requestBody: Array<CreateBookingRequestDto>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/BookingRequest',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns boolean Success
     * @throws ApiError
     */
    public static deleteApiBookingRequest(
        requestBody: Array<string>,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/BookingRequest',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static getApiBookingRequestExport(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/BookingRequest/export',
        });
    }

}
