/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UpdatePeriod } from "./UpdatePeriod";

export type UpdateDrawDto = {
  id?: string | null;
  start?: string;
  end?: string;
  title?: string | null;
  isSpecial?: boolean;
  periods?: Array<UpdatePeriod> | null;
};
