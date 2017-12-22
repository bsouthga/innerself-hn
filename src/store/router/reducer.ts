import { Action } from '../actions';
import { set } from '../util';
import { LOCATION_CHANGE_SUCCESS, RouteResult } from './actions';
import { getCurrentRouteResult } from './current';

export const router = (
  state: RouteResult = getCurrentRouteResult(),
  action: Action
) => {
  switch (action.type) {
    case LOCATION_CHANGE_SUCCESS: {
      return set(action.payload, {
        previous: set(state, { previous: undefined })
      });
    }
    default:
      return state;
  }
};
