import { dispatch } from '../';
import { Action } from '../actions';
import { createAction, queryToString } from '../util';
import { LOCATION_CHANGE_REQUEST, LOCATION_CHANGE_SUCCESS } from './actions';
import { getCurrentRouteResult } from './current';

export const createRouterMiddleware = () => {
  /**
   * listen for back / forward and update state
   */
  window.addEventListener('popstate', () =>
    dispatch(createAction(LOCATION_CHANGE_SUCCESS, getCurrentRouteResult()))
  );

  return (action: Action): Action => {
    switch (action.type) {
      case LOCATION_CHANGE_REQUEST: {
        const { payload } = action;
        const { path, query } = payload;
        const queryString = query && queryToString(query);
        history.pushState(
          {},
          path,
          (path || '/') + (queryString ? '?' + queryString : '')
        );
        return createAction(LOCATION_CHANGE_SUCCESS, payload);
      }
    }
    return action;
  };
};
