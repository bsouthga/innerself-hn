import { Action } from './actions';
import { Reducer } from './reducer';
import { createRouterMiddleware } from './router';
import { State } from './state';
import { compose } from './util';

const middleware = compose(createRouterMiddleware());

export default (reducer: Reducer) => (state: State, action?: Action) =>
  reducer(state, action && middleware(action));
