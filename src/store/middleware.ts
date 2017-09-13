import { compose } from './util';
import { router } from './router';
import { State } from './types';
import { Action } from './actions';

const middleware = compose(router);

export default (reducer: (state: State, action: Action) => State) => (
  state: State,
  action: Action
) => reducer(state, action && middleware(action));
