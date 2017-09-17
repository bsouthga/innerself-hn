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

/**
 * use string constants instead of enums for better minification...
 */
export const TOP_SUBMISSION_REQUEST = 1;
export type TOP_SUBMISSION_REQUEST = typeof TOP_SUBMISSION_REQUEST;

export const TOP_SUBMISSION_SUCCESS = 2;
export type TOP_SUBMISSION_SUCCESS = typeof TOP_SUBMISSION_SUCCESS;

export const TOP_SUBMISSION_FAILURE = 3;
export type TOP_SUBMISSION_FAILURE = typeof TOP_SUBMISSION_FAILURE;

export const CLEAR_TOP_SUBMISSION = 4;
export type CLEAR_TOP_SUBMISSION = typeof CLEAR_TOP_SUBMISSION;

export interface TopSubmissionRequestAction {
  type: TOP_SUBMISSION_REQUEST;
  payload: {
    id: TopRequestType;
  };
}
export interface TopSubmissionFailureAction {
  type: TOP_SUBMISSION_FAILURE;
  payload: {
    id: TopRequestType;
    error: Error;
  };
}
export interface TopSubmissionSuccessAction {
  type: TOP_SUBMISSION_SUCCESS;
  payload: {
    id: TopRequestType;
    submissions: Array<number | string>;
  };
}
export interface ClearTopSubmissionAction {
  type: CLEAR_TOP_SUBMISSION;
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
  createAction(TOP_SUBMISSION_REQUEST, {
    id
  }) as TopSubmissionRequestAction;

/**
 * top Submissions success event
 */
export const topSubmissionsSuccess = (
  id: TopRequestType,
  submissions: Array<number | string>
) =>
  createAction(TOP_SUBMISSION_SUCCESS, {
    id,
    submissions
  }) as TopSubmissionSuccessAction;

export const clearTopSumissions = (): ClearTopSubmissionAction =>
  createAction(CLEAR_TOP_SUBMISSION, {});

export const topSubmissionsFailure = (id: TopRequestType, error: Error) =>
  createAction(TOP_SUBMISSION_FAILURE, {
    id,
    error
  }) as TopSubmissionFailureAction;

export const getTopSubmissions = (type: TopRequestType) => {
  requestTop(type)
    .then(sub => dispatch(topSubmissionsSuccess(type, sub)))
    .catch(err => dispatch(topSubmissionsFailure(type, err)));

  return topSubmissionsRequest(type);
};

export const GET_ITEM_REQUEST = 5;
export type GET_ITEM_REQUEST = typeof GET_ITEM_REQUEST;

export const GET_ITEM_SUCCESS = 6;
export type GET_ITEM_SUCCESS = typeof GET_ITEM_SUCCESS;

export const GET_ITEM_FAILURE = 7;
export type GET_ITEM_FAILURE = typeof GET_ITEM_FAILURE;

interface GetItemSuccessAction {
  type: GET_ITEM_SUCCESS;
  payload: {
    ids: Array<number | string>;
  };
}

interface GetItemRequestAction {
  type: GET_ITEM_REQUEST;
  payload: {
    ids: Array<number | string>;
  };
}

interface GetItemFailureAction {
  type: GET_ITEM_FAILURE;
  payload: {
    error: Error;
    ids: Array<number | string>;
  };
}

export const getItemsRequest = (ids: Array<number | string>) =>
  createAction(GET_ITEM_REQUEST, { ids });

export const getItemsSuccess = (items: Item[]) => {
  dispatch(createAction(GET_ITEM_SUCCESS, { ids: items.map(({ id }) => id) }));
  return insertEntities(items);
};

export const getItemsFailure = (
  error: Error,
  ids: Array<number | string>
): GetItemFailureAction =>
  createAction(GET_ITEM_FAILURE, {
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

export const TOGGLE_EXPAND_ITEM = 8;
export type TOGGLE_EXPAND_ITEM = typeof TOGGLE_EXPAND_ITEM;

export interface ToggleExpandItemAction {
  type: TOGGLE_EXPAND_ITEM;
  payload: {
    id: number;
  };
}

export const toggleExpandItem = (
  inputId: number | string
): ToggleExpandItemAction =>
  createAction(TOGGLE_EXPAND_ITEM, { id: num(inputId) });

export const GET_USER_REQUEST = 9;
export type GET_USER_REQUEST = typeof GET_USER_REQUEST;

export const GET_USER_SUCCESS = 10;
export type GET_USER_SUCCESS = typeof GET_USER_SUCCESS;

export const GET_USER_FAILURE = 11;
export type GET_USER_FAILURE = typeof GET_USER_FAILURE;

interface GetUserSuccessAction {
  type: GET_USER_SUCCESS;
  payload: {
    id: string;
  };
}

interface GetUserRequestAction {
  type: GET_USER_REQUEST;
  payload: {
    id: string;
  };
}

interface GetUserFailureAction {
  type: GET_USER_FAILURE;
  payload: {
    error: Error;
    id: string;
  };
}

export const getUserRequest = (id: string): GetUserRequestAction =>
  createAction(GET_USER_REQUEST, { id });

export const getUserSuccess = (user: User) => {
  dispatch(createAction(GET_USER_SUCCESS, { id: user.id }));
  return insertEntities([user]);
};

export const getUserFailure = (
  error: Error,
  id: string
): GetUserFailureAction =>
  createAction(GET_USER_FAILURE, {
    error,
    id
  });

export const getUser = (id: string) => {
  requestUser(id)
    .then(item => dispatch(getUserSuccess(item)))
    .catch(err => dispatch(getUserFailure(err, id)));

  return getUserRequest(id);
};
