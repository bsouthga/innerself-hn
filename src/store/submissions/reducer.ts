import { Action } from '../actions';
import { SubmissionState, Requesting } from './state';
import {
  TOP_SUBMISSION_SUCCESS,
  TOP_SUBMISSION_FAILURE,
  TOP_SUBMISSION_REQUEST,
  CLEAR_TOP_SUBMISSION,
  GET_ITEM_FAILURE,
  GET_ITEM_REQUEST,
  GET_ITEM_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  TOGGLE_EXPAND_ITEM
} from './actions';

const setRequestStatus = (
  state: SubmissionState,
  key: string | number,
  status: boolean
) => {
  return {
    ...state,
    requesting: {
      ...state.requesting,
      [key]: status
    }
  };
};

/**
 * Main reducer for app
 */
export function submissions(
  state: SubmissionState = {
    requesting: {},
    expanded: {},
    items: {}
  },
  action: Action
): SubmissionState {
  switch (action.type) {
    case CLEAR_TOP_SUBMISSION: {
      return {
        ...state,
        items: {}
      };
    }
    case TOP_SUBMISSION_REQUEST: {
      return setRequestStatus(state, action.payload.id, true);
    }
    case TOP_SUBMISSION_SUCCESS: {
      const id = action.payload.id;
      return {
        ...setRequestStatus(state, id, false),
        items: {
          ...state.items,
          [id]: action.payload.submissions
        }
      };
    }
    case TOP_SUBMISSION_FAILURE: {
      return {
        ...setRequestStatus(state, action.payload.id, false),
        error: action.payload.error
      };
    }
    case GET_USER_REQUEST:
    case GET_ITEM_REQUEST: {
      return setRequestStatus(state, action.payload.id, true);
    }
    case GET_USER_SUCCESS:
    case GET_USER_FAILURE:
    case GET_ITEM_SUCCESS:
    case GET_ITEM_FAILURE: {
      return setRequestStatus(state, action.payload.id, false);
    }
    case TOGGLE_EXPAND_ITEM: {
      const { id } = action.payload;
      return {
        ...state,
        expanded: {
          ...state.expanded,
          [id]: !state.expanded[id]
        }
      };
    }
  }

  return state;
}
