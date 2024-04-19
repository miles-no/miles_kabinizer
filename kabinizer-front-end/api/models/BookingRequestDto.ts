/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PeriodEntity } from "./PeriodEntity";
import type { UserEntity } from "./UserEntity";

export type BookingRequestDto = {
  id?: string;
  userId?: string;
  user?: UserEntity;
  period?: PeriodEntity;
  periodId?: string;
  createdDate?: string;
  createdBy?: string;
  updatedDate?: string | null;
  updatedBy?: string | null;
};
