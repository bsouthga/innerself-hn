import { SubmissionAction } from './submissions';
import { RouterAction } from './router';
import { DbAction } from './db';

/**
 * union of all application actions
 */
export type Action = InitAction | SubmissionAction | RouterAction | DbAction;

/**
 * base init action
 */

export const INIT = 'INIT';
export type INIT = typeof INIT;

export type InitAction = {
  type: INIT;
};

export const init = (): InitAction => ({ type: INIT });
