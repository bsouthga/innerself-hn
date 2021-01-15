import { ActionTypes } from "./action-types";
import { DbAction } from "./db";
import { RouterAction } from "./router";
import { SubmissionAction } from "./submissions";
import { createAction } from "./util";

/**
 * union of all application actions
 */
export type Action = InitAction | SubmissionAction | RouterAction | DbAction;

export interface InitAction {
  type: ActionTypes.INIT;
}

export const init = (): InitAction => createAction(ActionTypes.INIT, {});
