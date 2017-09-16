import { set } from '../util';
import { LOCATION_CHANGE_SUCCESS, RouterAction, RouteResult } from './actions';
import { getCurrentRouteResult } from './current';

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
