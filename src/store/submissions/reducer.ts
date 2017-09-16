import { Action } from '../actions';
import { set } from '../util';
import {
  CLEAR_TOP_SUBMISSION,
  GET_ITEM_FAILURE,
  GET_ITEM_REQUEST,
  GET_ITEM_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  TOGGLE_EXPAND_ITEM,
  TOP_SUBMISSION_FAILURE,
  TOP_SUBMISSION_REQUEST,
  TOP_SUBMISSION_SUCCESS
} from './actions';
import { Requesting, SubmissionState } from './state';

const setRequestStatus = (
  state: SubmissionState,
  action: {
    payload: {
      id?: string | number;
      ids?: Array<string | number>;
    };
  },
  status: boolean
) => {
  const { id, ids } = action.payload;
  if (!id && !ids) return state;
  const idList = ids || (id && [id]) || [];
  return set(state, {
    requesting: set(
      state.requesting,
      idList.reduce((out, i) => set(out, { [i]: status }), {})
    )
  });
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
      return set(state, {
        items: {}
      });
    }
    case TOP_SUBMISSION_REQUEST: {
      return setRequestStatus(state, action, true);
    }
    case TOP_SUBMISSION_SUCCESS: {
      const id = action.payload.id;
      return set(setRequestStatus(state, action, false), {
        items: set(state.items, {
          [id]: action.payload.submissions
        })
      });
    }
    case TOP_SUBMISSION_FAILURE: {
      return set(setRequestStatus(state, action, false), {
        error: action.payload.error
      });
    }
    case GET_USER_REQUEST:
    case GET_ITEM_REQUEST: {
      return setRequestStatus(state, action, true);
    }
    case GET_USER_SUCCESS:
    case GET_USER_FAILURE:
    case GET_ITEM_SUCCESS:
    case GET_ITEM_FAILURE: {
      return setRequestStatus(state, action, false);
    }
    case TOGGLE_EXPAND_ITEM: {
      const { id } = action.payload;
      const { expanded } = state;
      return set(state, {
        expanded: set(expanded, {
          [id]: !expanded[id]
        })
      });
    }
  }

  return state;
}
