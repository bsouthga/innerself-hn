import { set } from '../util';
import { LOCATION_CHANGE_SUCCESS, RouterAction, RouteResult } from './actions';
import { getCurrentRouteResult } from './current';

export const router = (
  state: RouteResult = getCurrentRouteResult(),
  { type, payload }: RouterAction
) => {
  switch (type) {
    case LOCATION_CHANGE_SUCCESS: {
      return set(payload, {
        previous: set(state, { previous: undefined })
      });
    }
    default:
      return state;
  }
};
