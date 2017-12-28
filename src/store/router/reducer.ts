import { ActionTypes } from '../action-types';
import { set } from '../util';
import { RouterAction, RouteResult } from './actions';
import { getCurrentRouteResult } from './current';

export const router = (
  state: RouteResult = getCurrentRouteResult(),
  { type, payload }: RouterAction
) => {
  switch (type) {
    case ActionTypes.LOCATION_CHANGE_SUCCESS: {
      return set(payload, {
        previous: set(state, { previous: undefined })
      });
    }
    default:
      return state;
  }
};
