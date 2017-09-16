import { DbAction } from './db';
import { RouterAction } from './router';
import { SubmissionAction } from './submissions';

/**
 * union of all application actions
 */
export type Action = InitAction | SubmissionAction | RouterAction | DbAction;

/**
 * base init action
 */

export const INIT = 'INIT';
export type INIT = typeof INIT;

export interface InitAction {
  type: INIT;
}

export const init = (): InitAction => ({ type: INIT });
