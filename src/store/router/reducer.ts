import { RouterAction, RouteResult, LOCATION_CHANGE_SUCCESS } from './actions';
import { getCurrentRouteResult } from './current';

export function router(
  state: RouteResult = getCurrentRouteResult(),
  action: RouterAction
) {
  switch (action.type) {
    case LOCATION_CHANGE_SUCCESS: {
      return {
        ...action.payload,
        previous: { ...state, previous: undefined }
      };
    }
    default:
      return state;
  }
}
