/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Period } from "../models/Period";
import type { ReadPeriodDto } from "../models/ReadPeriodDto";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class PeriodService {
  /**
   * @param periodId
   * @returns ReadPeriodDto Success
   * @throws ApiError
   */
  public static getApiPeriod(
    periodId: string,
  ): CancelablePromise<ReadPeriodDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/Period/{periodId}",
      path: {
        periodId: periodId,
      },
      errors: {
        404: `Not Found`,
      },
    });
  }

  /**
   * @returns Period Success
   * @throws ApiError
   */
  public static getApiPeriod1(): CancelablePromise<Array<Period>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/Period",
      errors: {
        404: `Not Found`,
      },
    });
  }

  /**
   * @returns Period Success
   * @throws ApiError
   */
  public static getApiPeriodUpcoming(): CancelablePromise<Array<Period>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/Period/upcoming",
      errors: {
        404: `Not Found`,
      },
    });
  }

  /**
   * @returns Period Success
   * @throws ApiError
   */
  public static getApiPeriodPast(): CancelablePromise<Array<Period>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/Period/past",
      errors: {
        404: `Not Found`,
      },
    });
  }

  /**
   * @returns Period Success
   * @throws ApiError
   */
  public static getApiPeriodAll(): CancelablePromise<Array<Period>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/Period/all",
      errors: {
        404: `Not Found`,
      },
    });
  }
}
