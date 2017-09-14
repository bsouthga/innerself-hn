import { compose } from './util';
import { createRouterMiddleware } from './router';
import { State } from './state';
import { Action } from './actions';
import { Reducer } from './reducer';

const middleware = compose(createRouterMiddleware());

export default (reducer: Reducer) => (state: State, action?: Action) =>
  reducer(state, action && middleware(action));
