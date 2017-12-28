import { ActionTypes } from '../action-types';
import { requestItems, requestTop, requestUser } from '../api';
import { insertEntities } from '../db';
import { Item, User } from '../hn-types';
import { dispatch } from '../index';
import { paths } from '../router';
import { createAction, num } from '../util';

export type TopRequestType =
  | typeof paths.HOME
  | typeof paths.ASK
  | typeof paths.NEW
  | typeof paths.SHOW;

/**
 * action union
 */
export type SubmissionAction =
  | TopSubmissionRequestAction
  | TopSubmissionSuccessAction
  | TopSubmissionFailureAction
  | ClearTopSubmissionAction
  | GetItemRequestAction
  | GetItemSuccessAction
  | GetItemFailureAction
  | ToggleExpandItemAction
  | GetUserRequestAction
  | GetUserFailureAction
  | GetUserSuccessAction;

/**
 *
 *
 * action types
 *
 * uses numbers 1-20
 *
 *
 */

export interface TopSubmissionRequestAction {
  type: ActionTypes.TOP_SUBMISSION_REQUEST;
  payload: {
    id: TopRequestType;
  };
}
export interface TopSubmissionFailureAction {
  type: ActionTypes.TOP_SUBMISSION_FAILURE;
  payload: {
    id: TopRequestType;
    error: Error;
  };
}
export interface TopSubmissionSuccessAction {
  type: ActionTypes.TOP_SUBMISSION_SUCCESS;
  payload: {
    id: TopRequestType;
    submissions: Array<number | string>;
  };
}
export interface ClearTopSubmissionAction {
  type: ActionTypes.CLEAR_TOP_SUBMISSION;
}

/**
 *
 *
 * action creators
 *
 *
 */

/**
 * initiate a top Submissions request
 */
export const topSubmissionsRequest = (id: TopRequestType) =>
  createAction(ActionTypes.TOP_SUBMISSION_REQUEST, {
    id
  }) as TopSubmissionRequestAction;

/**
 * top Submissions success event
 */
export const topSubmissionsSuccess = (
  id: TopRequestType,
  submissions: Array<number | string>
) =>
  createAction(ActionTypes.TOP_SUBMISSION_SUCCESS, {
    id,
    submissions
  }) as TopSubmissionSuccessAction;

export const clearTopSumissions = (): ClearTopSubmissionAction =>
  createAction(ActionTypes.CLEAR_TOP_SUBMISSION, {});

export const topSubmissionsFailure = (id: TopRequestType, error: Error) =>
  createAction(ActionTypes.TOP_SUBMISSION_FAILURE, {
    id,
    error
  }) as TopSubmissionFailureAction;

export const getTopSubmissions = (type: TopRequestType) => {
  requestTop(type)
    .then(sub => dispatch(topSubmissionsSuccess(type, sub)))
    .catch(err => dispatch(topSubmissionsFailure(type, err)));

  return topSubmissionsRequest(type);
};

interface GetItemSuccessAction {
  type: ActionTypes.GET_ITEM_SUCCESS;
  payload: {
    ids: Array<number | string>;
  };
}

interface GetItemRequestAction {
  type: ActionTypes.GET_ITEM_REQUEST;
  payload: {
    ids: Array<number | string>;
  };
}

interface GetItemFailureAction {
  type: ActionTypes.GET_ITEM_FAILURE;
  payload: {
    error: Error;
    ids: Array<number | string>;
  };
}

export const getItemsRequest = (ids: Array<number | string>) =>
  createAction(ActionTypes.GET_ITEM_REQUEST, { ids });

export const getItemsSuccess = (items: Item[]) => {
  dispatch(
    createAction(ActionTypes.GET_ITEM_SUCCESS, {
      ids: items.map(({ id }) => id)
    })
  );
  return insertEntities(items);
};

export const getItemsFailure = (
  error: Error,
  ids: Array<number | string>
): GetItemFailureAction =>
  createAction(ActionTypes.GET_ITEM_FAILURE, {
    error,
    ids
  });

export const getItems = (inputIds: Array<number | string>) => {
  const ids = inputIds.map(num);
  requestItems(ids)
    .then(items => dispatch(getItemsSuccess(items)))
    .catch(err => dispatch(getItemsFailure(err, ids)));

  return getItemsRequest(ids);
};

export interface ToggleExpandItemAction {
  type: ActionTypes.TOGGLE_EXPAND_ITEM;
  payload: {
    id: number;
  };
}

export const toggleExpandItem = (
  inputId: number | string
): ToggleExpandItemAction =>
  createAction(ActionTypes.TOGGLE_EXPAND_ITEM, { id: num(inputId) });

interface GetUserSuccessAction {
  type: ActionTypes.GET_USER_SUCCESS;
  payload: {
    id: string;
  };
}

interface GetUserRequestAction {
  type: ActionTypes.GET_USER_REQUEST;
  payload: {
    id: string;
  };
}

interface GetUserFailureAction {
  type: ActionTypes.GET_USER_FAILURE;
  payload: {
    error: Error;
    id: string;
  };
}

export const getUserRequest = (id: string): GetUserRequestAction =>
  createAction(ActionTypes.GET_USER_REQUEST, { id });

export const getUserSuccess = (user: User) => {
  dispatch(createAction(ActionTypes.GET_USER_SUCCESS, { id: user.id }));
  return insertEntities([user]);
};

export const getUserFailure = (
  error: Error,
  id: string
): GetUserFailureAction =>
  createAction(ActionTypes.GET_USER_FAILURE, {
    error,
    id
  });

export const getUser = (id: string) => {
  requestUser(id)
    .then(item => dispatch(getUserSuccess(item)))
    .catch(err => dispatch(getUserFailure(err, id)));

  return getUserRequest(id);
};
