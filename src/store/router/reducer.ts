import { RouterAction, RouteResult, LOCATION_CHANGE_SUCCESS } from './actions';
import { getCurrentRouteResult } from './current';
import { set } from '../util';

export function router(
  state: RouteResult = getCurrentRouteResult(),
  action: RouterAction
) {
  switch (action.type) {
    case LOCATION_CHANGE_SUCCESS: {
      return set(action.payload, {
        previous: set(state, { previous: undefined })
      });
    }
    default:
      return state;
  }
}
