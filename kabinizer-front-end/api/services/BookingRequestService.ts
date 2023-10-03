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
     * @returns BookingRequest Success
     * @throws ApiError
     */
    public static postApiBookingRequest(
        requestBody: CreateBookingRequestDto,
    ): CancelablePromise<BookingRequest> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/BookingRequest',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param bookingRequestId
     * @returns boolean Success
     * @throws ApiError
     */
    public static deleteApiBookingRequest(
        bookingRequestId: string,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/BookingRequest',
            query: {
                'bookingRequestId': bookingRequestId,
            },
        });
    }

}
