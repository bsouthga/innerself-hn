import { State } from './state';
import { Action } from './actions';
import { combineReducers } from './util';

/**
 * individual property reducers
 */
import { router } from './router';
import { submissions } from './submissions';
import { db } from './db';

export type Reducer = (state: State, action?: Action) => State;

/**
 * Main reducer for app
 */
export const reducer = combineReducers<State>({
  router,
  submissions,
  db
});
