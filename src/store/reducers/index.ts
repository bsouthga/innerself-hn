import { TOP_STORIES_SUCCESS, TOP_STORIES_FAILURE } from '../actions/';
import { set } from '../util';
import { State, Action } from '../types';

/**
 * Main reducer for app
 */
export function reducer(state: State = {}, action: Action) {
  if (!action) return state;
  switch (action.type) {
    case TOP_STORIES_SUCCESS:
    case TOP_STORIES_FAILURE: {
      return set(state, action.payload);
    }
  }

  return state;
}
