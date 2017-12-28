import { ActionTypes } from '../action-types';
import { Action } from '../actions';
import { now, set } from '../util';
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
    case ActionTypes.CLEAR_TOP_SUBMISSION: {
      return set(state, {
        items: {}
      });
    }
    case ActionTypes.TOP_SUBMISSION_REQUEST: {
      return setRequestStatus(state, action, true);
    }
    case ActionTypes.TOP_SUBMISSION_SUCCESS: {
      const id = action.payload.id;
      return set(setRequestStatus(state, action, false), {
        items: set(state.items, {
          [id]: action.payload.submissions
        })
      });
    }
    case ActionTypes.GET_ITEM_FAILURE:
    case ActionTypes.GET_USER_FAILURE:
    case ActionTypes.TOP_SUBMISSION_FAILURE: {
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

    case ActionTypes.GET_USER_REQUEST:
    case ActionTypes.GET_ITEM_REQUEST: {
      return setRequestStatus(state, action, true);
    }
    case ActionTypes.GET_USER_SUCCESS:
    case ActionTypes.GET_USER_FAILURE:
    case ActionTypes.GET_ITEM_SUCCESS:
    case ActionTypes.GET_ITEM_FAILURE: {
      return setRequestStatus(state, action, false);
    }
    case ActionTypes.TOGGLE_EXPAND_ITEM: {
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
