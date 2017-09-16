import { dispatch } from '../';
import { Action } from '../actions';
import { queryToString } from '../util';
import { LOCATION_CHANGE_REQUEST, LOCATION_CHANGE_SUCCESS } from './actions';
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
        const { path, query } = action.payload;
        const queryString = query && queryToString(query);
        history.pushState(
          {},
          path,
          (path || '/') + (queryString ? '?' + queryString : '')
        );
        return {
          type: LOCATION_CHANGE_SUCCESS,
          payload: action.payload
        };
      }
    }
    return action;
  };
};
