import { Action } from '../actions';
import { SubmissionState, Requesting } from './state';
import {
  TOP_SUBMISSION_SUCCESS,
  TOP_SUBMISSION_FAILURE,
  TOP_SUBMISSION_REQUEST,
  GET_ITEM_FAILURE,
  GET_ITEM_REQUEST,
  GET_ITEM_SUCCESS,
  TOGGLE_EXPAND_ITEM
} from './actions';

const setItemRequestStatus = (
  state: SubmissionState,
  id: number | number,
  status: boolean
) => {
  const items = {
    ...state.requesting.items,
    [id]: true
  } as Requesting['items'];

  return {
    ...state,
    requesting: {
      ...state.requesting,
      items
    }
  };
};

const setTopRequestStatus = (state: SubmissionState, status: boolean) => {
  return {
    ...state,
    requesting: {
      ...state.requesting,
      top: status
    }
  };
};

/**
 * Main reducer for app
 */
export function submissions(
  state: SubmissionState = {
    requesting: {},
    expanded: {}
  },
  action: Action
): SubmissionState {
  switch (action.type) {
    case TOP_SUBMISSION_REQUEST: {
      return setTopRequestStatus(state, true);
    }
    case TOP_SUBMISSION_SUCCESS: {
      return {
        ...setTopRequestStatus(state, false),
        items: action.payload.submissions
      };
    }
    case TOP_SUBMISSION_FAILURE: {
      return {
        ...setTopRequestStatus(state, false),
        error: action.payload.error
      };
    }
    case GET_ITEM_REQUEST: {
      return setItemRequestStatus(state, action.payload.id, true);
    }
    case GET_ITEM_SUCCESS:
    case GET_ITEM_FAILURE: {
      return setItemRequestStatus(state, action.payload.id, false);
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
