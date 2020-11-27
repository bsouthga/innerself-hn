import { ActionTypes } from '../action-types';
import { Action } from '../actions';
import { set } from '../util';
import { RouteResult } from './actions';
import { getCurrentRouteResult } from './current';

export const router = (
  state: RouteResult = getCurrentRouteResult(),
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.LOCATION_CHANGE_SUCCESS: {
      return set(action.payload, {
        previous: set(state, { previous: undefined }),
      });
    }
    default:
      return state;
  }
};
