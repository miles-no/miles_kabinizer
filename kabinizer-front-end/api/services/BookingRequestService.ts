/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookingRequestDto } from "../models/BookingRequestDto";
import type { CreateBookingRequestDto } from "../models/CreateBookingRequestDto";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class BookingRequestService {
  /**
   * @param id
   * @returns BookingRequestDto Success
   * @throws ApiError
   */
  public static getApiBookingRequest(
    id: string,
  ): CancelablePromise<BookingRequestDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/BookingRequest/{id}",
      path: {
        id: id,
      },
      errors: {
        404: `Not Found`,
      },
    });
  }

  /**
   * @returns BookingRequestDto Success
   * @throws ApiError
   */
  public static getApiBookingRequest1(): CancelablePromise<
    Array<BookingRequestDto>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/BookingRequest",
      errors: {
        404: `Not Found`,
      },
    });
  }

  /**
   * @param requestBody
   * @returns BookingRequestDto Success
   * @throws ApiError
   */
  public static postApiBookingRequest(
    requestBody: Array<CreateBookingRequestDto>,
  ): CancelablePromise<BookingRequestDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/BookingRequest",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad Request`,
      },
    });
  }

  /**
   * @param requestBody
   * @returns string Success
   * @throws ApiError
   */
  public static deleteApiBookingRequest(
    requestBody: Array<string>,
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/BookingRequest",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad Request`,
      },
    });
  }

  /**
   * @param userId
   * @returns BookingRequestDto Success
   * @throws ApiError
   */
  public static getApiBookingRequestUser(
    userId: string,
  ): CancelablePromise<Array<BookingRequestDto>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/BookingRequest/user/{userId}",
      path: {
        userId: userId,
      },
      errors: {
        404: `Not Found`,
      },
    });
  }

  /**
   * @param periodId
   * @returns BookingRequestDto Success
   * @throws ApiError
   */
  public static getApiBookingRequestPeriod(
    periodId: string,
  ): CancelablePromise<Array<BookingRequestDto>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/BookingRequest/period/{periodId}",
      path: {
        periodId: periodId,
      },
      errors: {
        404: `Not Found`,
      },
    });
  }

  /**
   * @returns any Success
   * @throws ApiError
   */
  public static getApiBookingRequestExport(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/BookingRequest/export",
    });
  }
}
