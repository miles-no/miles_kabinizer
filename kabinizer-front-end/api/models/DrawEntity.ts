/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PeriodEntity } from './PeriodEntity';

export type DrawEntity = {
    id?: string;
    deadlineStart?: string;
    deadlineEnd?: string;
    title?: string | null;
    isSpecial?: boolean;
    periods?: Array<PeriodEntity> | null;
};

