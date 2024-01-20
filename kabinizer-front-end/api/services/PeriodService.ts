/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Period } from '../models/Period';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PeriodService {

    /**
     * @returns Period Success
     * @throws ApiError
     */
    public static getApiPeriod(): CancelablePromise<Array<Period>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Period',
        });
    }

}
