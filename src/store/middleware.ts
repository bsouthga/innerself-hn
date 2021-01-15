import { Action } from "./actions";
import { Reducer } from "./reducer";
import { createRouterMiddleware } from "./router";
import { State } from "./state";
import { compose, createPruneMiddleware } from "./util";

const middleware = compose(createRouterMiddleware(), createPruneMiddleware());

export default (reducer: Reducer) => (state: State, action?: Action) =>
  reducer(state, action && middleware(action));
