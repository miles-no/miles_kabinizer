/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Period } from "./Period";

export type Draw = {
  id?: string;
  start?: string;
  end?: string;
  title?: string | null;
  periods?: Array<Period> | null;
  isSpecial?: boolean;
};
