import { compose } from '../util';
import { createRouterMiddleware } from './router';
import { State } from './types';
import { Action } from './actions';

const middleware = compose(createRouterMiddleware());

export default (reducer: (state: State, action: Action) => State) => (
  state: State,
  action: Action
) => reducer(state, action && middleware(action));
