import { State } from "../state";

export const getRouter = (state: State) => state.router;
export const getQuery = (state: State) => getRouter(state).query || {};
export const getPath = (state: State) => getRouter(state).path;
