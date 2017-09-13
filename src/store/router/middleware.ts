import { Action } from '../actions';
import { LOCATION_CHANGE_REQUEST, LOCATION_CHANGE_SUCCESS } from './actions'; // router actions

export function routerMiddleware(action: Action): Action {
  switch (action.type) {
    case LOCATION_CHANGE_REQUEST: {
      history.pushState({}, 'Innerself News', action.payload.path);
      return {
        type: LOCATION_CHANGE_SUCCESS,
        payload: action.payload
      };
    }
  }
  return action;
}
