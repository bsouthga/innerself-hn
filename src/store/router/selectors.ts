import { State } from '../state';

export const getQuery = (state: State) => state.router.query || {};
export const getPath = (state: State) => state.router.path;
