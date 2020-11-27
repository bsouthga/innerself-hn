import { Action } from './actions';
import { State } from './state';
import { combineReducers } from './util';

import { db } from './db';
import { router } from './router';
import { submissions } from './submissions';

export type Reducer = (state: State, action?: Action) => State;

/**
 * Main reducer for app
 */
export const reducer = combineReducers<State>({
  router,
  submissions,
  db,
});
