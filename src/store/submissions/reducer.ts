import { Action } from '../actions';
import { now, set } from '../util';
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
import { SubmissionState } from './state';

const getIds = (payload: {
  id?: string | number;
  ids?: Array<string | number>;
}) => {
  const { id, ids } = payload;
  const idList = ids || (typeof id !== 'undefined' && [id]) || [];
  return idList;
};

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
  const idList = getIds(action.payload);
  if (!idList.length) return state;
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
export const submissions = (
  state: SubmissionState = {
    requesting: {},
    expanded: {},
    items: {},
    failed: {}
  },
  action: Action
): SubmissionState => {
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
    case GET_ITEM_FAILURE:
    case GET_USER_FAILURE:
    case TOP_SUBMISSION_FAILURE: {
      const idList = getIds(action.payload);
      if (!idList) return state;
      return set(setRequestStatus(state, action, false), {
        failed: idList.reduce(
          (out, id) =>
            set(state, {
              [id]: now()
            }),
          state.failed
        )
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
};
