import { Action } from '../actions';
import { LOCATION_CHANGE_REQUEST, LOCATION_CHANGE_SUCCESS } from './actions';
import { dispatch } from '../';
import { getCurrentRouteResult } from './current';

export const createRouterMiddleware = () => {
  /**
   * listen for back / forward and update state
   */
  window.addEventListener('popstate', () => {
    dispatch({
      type: LOCATION_CHANGE_SUCCESS,
      payload: getCurrentRouteResult()
    });
  });

  return (action: Action): Action => {
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
  };
};
