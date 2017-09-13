import { compose } from '../util';
import { router } from './router';
import { State, Action } from '../types';

const middleware = compose(router);

export default (reducer: (state: State, action: Action) => State) => (
  state: State,
  action: Action
) => reducer(state, action && middleware(action));
