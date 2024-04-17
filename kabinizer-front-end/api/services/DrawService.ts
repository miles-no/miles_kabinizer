/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDrawDto } from "../models/CreateDrawDto";
import type { Draw } from "../models/Draw";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class DrawService {
  /**
   * @returns Draw Success
   * @throws ApiError
   */
  public static getApiDraw(): CancelablePromise<Array<Draw>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/Draw",
    });
  }

  /**
   * @param requestBody
   * @returns any Success
   * @throws ApiError
   */
  public static postApiDraw(
    requestBody: CreateDrawDto,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/Draw",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @param id
   * @returns any Success
   * @throws ApiError
   */
  public static deleteApiDraw(id: string): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/Draw",
      query: {
        id: id,
      },
    });
  }
}
