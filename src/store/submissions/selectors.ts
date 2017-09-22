import { State } from '../state';
import { TopRequestType } from './actions';

export const getSubmissions = (state: State) => state.submissions;
export const getFailed = (state: State) => getSubmissions(state).failed;
export const getRequesting = (state: State) => getSubmissions(state).requesting;
export const getExpanded = (state: State) => getSubmissions(state).expanded;
export const getItemsByType = (state: State, type: TopRequestType) =>
  getSubmissions(state).items[type];
