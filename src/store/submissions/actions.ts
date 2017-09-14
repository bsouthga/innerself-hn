import { dispatch } from '../index';
import { top, item } from '../api';
import { Item } from '../item';
import { insertEntities } from '../db';

/**
 * action union
 */
export type SubmissionAction =
  | TopSubmissionRequestAction
  | TopSubmissionSuccessAction
  | TopSubmissionFailureAction
  | GetItemRequestAction
  | GetItemSuccessAction
  | GetItemFailureAction
  | ToggleExpandItemAction;

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

export type TopSubmissionRequestAction = {
  type: TOP_SUBMISSION_REQUEST;
};
export type TopSubmissionFailureAction = {
  type: TOP_SUBMISSION_FAILURE;
  payload: {
    error: Error;
  };
};
export type TopSubmissionSuccessAction = {
  type: TOP_SUBMISSION_SUCCESS;
  payload: {
    submissions: number[];
  };
};

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
export const topSubmissionsRequest = (): TopSubmissionRequestAction => ({
  type: TOP_SUBMISSION_REQUEST
});

/**
 * top Submissions success event
 */
export const topSubmissionsSuccess = (
  submissions: Item[]
): TopSubmissionSuccessAction => {
  dispatch(insertEntities(submissions));
  return {
    type: TOP_SUBMISSION_SUCCESS,
    payload: { submissions: submissions.map(s => s.id) }
  };
};

export const topSubmissionsFailure = (
  error: Error
): TopSubmissionFailureAction => ({
  type: TOP_SUBMISSION_FAILURE,
  payload: { error }
});

export function getTopSubmissions() {
  top()
    .then(Submissions => dispatch(topSubmissionsSuccess(Submissions)))
    .catch(err => {
      console.error(err);
      dispatch(topSubmissionsFailure(err));
    });

  return topSubmissionsRequest();
}

export const GET_ITEM_REQUEST = 'GET_ITEM_REQUEST';
export type GET_ITEM_REQUEST = typeof GET_ITEM_REQUEST;

export const GET_ITEM_SUCCESS = 'GET_ITEM_SUCCESS';
export type GET_ITEM_SUCCESS = typeof GET_ITEM_SUCCESS;

export const GET_ITEM_FAILURE = 'GET_ITEM_FAILURE';
export type GET_ITEM_FAILURE = typeof GET_ITEM_FAILURE;

type GetItemSuccessAction = {
  type: GET_ITEM_SUCCESS;
  payload: {
    id: number;
  };
};

type GetItemRequestAction = {
  type: GET_ITEM_REQUEST;
  payload: {
    id: number;
  };
};

type GetItemFailureAction = {
  type: GET_ITEM_FAILURE;
  payload: {
    error: Error;
    id: number;
  };
};

export const getItemRequest = (id: number): GetItemRequestAction => ({
  type: GET_ITEM_REQUEST,
  payload: { id }
});

export const getItemSuccess = (item: Item) => {
  dispatch({
    type: GET_ITEM_SUCCESS,
    payload: { id: item.id }
  });
  return insertEntities([item]);
};

export const getItemFailure = (
  error: Error,
  id: number
): GetItemFailureAction => ({
  type: GET_ITEM_FAILURE,
  payload: {
    error,
    id
  }
});

export function getItem(_id: number | string) {
  const id = Number(_id);
  item(id)
    .then(item => dispatch(getItemSuccess(item)))
    .catch(err => dispatch(getItemFailure(err, id)));

  return getItemRequest(id);
}

export const TOGGLE_EXPAND_ITEM = 'TOGGLE_EXPAND_ITEM';
export type TOGGLE_EXPAND_ITEM = typeof TOGGLE_EXPAND_ITEM;

export type ToggleExpandItemAction = {
  type: TOGGLE_EXPAND_ITEM;
  payload: {
    id: number;
  };
};

export const toggleExpandItem = (
  _id: number | string
): ToggleExpandItemAction => {
  const id = Number(_id);
  return {
    type: TOGGLE_EXPAND_ITEM,
    payload: { id }
  };
};
