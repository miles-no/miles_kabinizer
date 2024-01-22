/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DrawPeriod } from './DrawPeriod';

export type CreateDrawDto = {
    deadlineStart?: string;
    deadlineEnd?: string;
    title?: string | null;
    drawPeriods?: Array<DrawPeriod> | null;
    isSpecial?: boolean;
};

