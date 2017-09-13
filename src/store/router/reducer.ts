import { RouterAction, RouteResult, LOCATION_CHANGE_SUCCESS } from './actions';

export function routerReducer(state: RouteResult, action: RouterAction) {
  switch (action.type) {
    case LOCATION_CHANGE_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
}
