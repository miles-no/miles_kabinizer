/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDrawDto } from "../models/CreateDrawDto";
import type { Draw } from "../models/Draw";
import type { DrawEntity } from "../models/DrawEntity";

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
   * @returns DrawEntity Success
   * @throws ApiError
   */
  public static postApiDraw(
    requestBody: CreateDrawDto,
  ): CancelablePromise<DrawEntity> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/Draw",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns Draw Success
   * @throws ApiError
   */
  public static getApiDrawCurrent(): CancelablePromise<Array<Draw>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/Draw/current",
    });
  }

  /**
   * @returns Draw Success
   * @throws ApiError
   */
  public static getApiDrawUpcoming(): CancelablePromise<Array<Draw>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/Draw/upcoming",
    });
  }

  /**
   * @returns Draw Success
   * @throws ApiError
   */
  public static getApiDrawPast(): CancelablePromise<Array<Draw>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/Draw/past",
    });
  }

  /**
   * @param drawId
   * @returns DrawEntity Success
   * @throws ApiError
   */
  public static getApiDraw1(drawId: string): CancelablePromise<DrawEntity> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/Draw/{drawId}",
      path: {
        drawId: drawId,
      },
    });
  }

  /**
   * @param drawId
   * @returns any Success
   * @throws ApiError
   */
  public static deleteApiDraw(drawId: string): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/Draw/{drawId}",
      path: {
        drawId: drawId,
      },
    });
  }
}
