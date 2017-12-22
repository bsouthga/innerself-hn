import { Action } from './actions';
import { State } from './state';
import { combineReducers } from './util';

/**
 * individual property reducers
 */
import { db } from './db';
import { router } from './router';
import { submissions } from './submissions';

export type Reducer = (
  state: State | undefined,
  action: Action | undefined
) => State;

/**
 * Main reducer for app
 */
export const reducer = combineReducers<State>({
  router,
  submissions,
  db
});
