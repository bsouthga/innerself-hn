import { initRouter, routerReducer, LOCATION_CHANGE_SUCCESS } from './router';
import { TOP_STORIES_SUCCESS, TOP_STORIES_FAILURE } from './actions';
import { set } from './util';
import { State } from './types';
import { Action } from './actions';

const initialState: State = {
  router: initRouter()
};

/**
 * Main reducer for app
 */
export function reducer(state: State = initialState, action: Action) {
  if (!action) return state;
  switch (action.type) {
    case TOP_STORIES_SUCCESS:
    case TOP_STORIES_FAILURE: {
      return set(state, action.payload);
    }

    case LOCATION_CHANGE_SUCCESS: {
      return set(state, {
        router: routerReducer(state.router, action)
      });
    }
  }

  return state;
}
