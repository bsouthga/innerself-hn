import { requestItems, requestTop, requestUser } from '../api';
import { insertEntities, insertUser } from '../db';
import { Item, User } from '../hn-types';
import { dispatch } from '../index';

export type TopRequestType = 'job' | 'ask' | 'top' | 'new' | 'show';

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
 *
 */

/**
 * use string constants instead of enums for better minification...
 */
export const TOP_SUBMISSION_REQUEST = 'TOP_SUBMISSION_REQUEST';
export type TOP_SUBMISSION_REQUEST = typeof TOP_SUBMISSION_REQUEST;

export const TOP_SUBMISSION_SUCCESS = 'TOP_SUBMISSION_SUCCESS';
export type TOP_SUBMISSION_SUCCESS = typeof TOP_SUBMISSION_SUCCESS;

export const TOP_SUBMISSION_FAILURE = 'TOP_SUBMISSION_FAILURE';
export type TOP_SUBMISSION_FAILURE = typeof TOP_SUBMISSION_FAILURE;

export const CLEAR_TOP_SUBMISSION = 'CLEAR_TOP_SUBMISSION';
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
    submissions: number[];
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
export const topSubmissionsRequest = (
  id: TopRequestType
): TopSubmissionRequestAction => ({
  type: TOP_SUBMISSION_REQUEST,
  payload: {
    id
  }
});

/**
 * top Submissions success event
 */
export const topSubmissionsSuccess = (
  id: TopRequestType,
  submissions: Item[]
): TopSubmissionSuccessAction => {
  dispatch(insertEntities(submissions));
  return {
    type: TOP_SUBMISSION_SUCCESS,
    payload: { id, submissions: submissions.map(s => s.id) }
  };
};

export const clearTopSumissions = (): ClearTopSubmissionAction => ({
  type: CLEAR_TOP_SUBMISSION
});

export const topSubmissionsFailure = (
  id: TopRequestType,
  error: Error
): TopSubmissionFailureAction => ({
  type: TOP_SUBMISSION_FAILURE,
  payload: { id, error }
});

export function getTopSubmissions(type: TopRequestType) {
  requestTop(type)
    .then(Submissions => dispatch(topSubmissionsSuccess(type, Submissions)))
    .catch(err => {
      console.error(err);
      dispatch(topSubmissionsFailure(type, err));
    });

  return topSubmissionsRequest(type);
}

export const GET_ITEM_REQUEST = 'GET_ITEM_REQUEST';
export type GET_ITEM_REQUEST = typeof GET_ITEM_REQUEST;

export const GET_ITEM_SUCCESS = 'GET_ITEM_SUCCESS';
export type GET_ITEM_SUCCESS = typeof GET_ITEM_SUCCESS;

export const GET_ITEM_FAILURE = 'GET_ITEM_FAILURE';
export type GET_ITEM_FAILURE = typeof GET_ITEM_FAILURE;

interface GetItemSuccessAction {
  type: GET_ITEM_SUCCESS;
  payload: {
    ids: number[];
  };
}

interface GetItemRequestAction {
  type: GET_ITEM_REQUEST;
  payload: {
    ids: number[];
  };
}

interface GetItemFailureAction {
  type: GET_ITEM_FAILURE;
  payload: {
    error: Error;
    ids: number[];
  };
}

export const getItemsRequest = (ids: number[]): GetItemRequestAction => ({
  type: GET_ITEM_REQUEST,
  payload: { ids }
});

export const getItemsSuccess = (items: Item[]) => {
  dispatch({
    type: GET_ITEM_SUCCESS,
    payload: { ids: items.map(({ id }) => id) }
  });
  return insertEntities(items);
};

export const getItemsFailure = (
  error: Error,
  ids: number[]
): GetItemFailureAction => ({
  type: GET_ITEM_FAILURE,
  payload: {
    error,
    ids
  }
});

export function getItems(inputIds: Array<number | string>) {
  const ids = inputIds.map(Number);
  requestItems(ids)
    .then(items => dispatch(getItemsSuccess(items)))
    .catch(err => dispatch(getItemsFailure(err, ids)));

  return getItemsRequest(ids);
}

export const TOGGLE_EXPAND_ITEM = 'TOGGLE_EXPAND_ITEM';
export type TOGGLE_EXPAND_ITEM = typeof TOGGLE_EXPAND_ITEM;

export interface ToggleExpandItemAction {
  type: TOGGLE_EXPAND_ITEM;
  payload: {
    id: number;
  };
}

export const toggleExpandItem = (
  inputId: number | string
): ToggleExpandItemAction => {
  const id = Number(inputId);
  return {
    type: TOGGLE_EXPAND_ITEM,
    payload: { id }
  };
};

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export type GET_USER_REQUEST = typeof GET_USER_REQUEST;

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export type GET_USER_SUCCESS = typeof GET_USER_SUCCESS;

export const GET_USER_FAILURE = 'GET_USER_FAILURE';
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

export const getUserRequest = (id: string): GetUserRequestAction => ({
  type: GET_USER_REQUEST,
  payload: { id }
});

export const getUserSuccess = (user: User) => {
  dispatch({
    type: GET_USER_SUCCESS,
    payload: { id: user.id }
  });
  return insertUser(user);
};

export const getUserFailure = (
  error: Error,
  id: string
): GetUserFailureAction => ({
  type: GET_USER_FAILURE,
  payload: {
    error,
    id
  }
});

export function getUser(id: string) {
  requestUser(id)
    .then(item => dispatch(getUserSuccess(item)))
    .catch(err => dispatch(getUserFailure(err, id)));

  return getUserRequest(id);
}
