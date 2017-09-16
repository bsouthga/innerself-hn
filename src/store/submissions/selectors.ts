import { State } from '../state';
import { TopRequestType } from './actions';

export const getRequesting = (state: State) => state.submissions.requesting;
export const getExpanded = (state: State) => state.submissions.expanded;
export const getItemsByType = (state: State, type: TopRequestType) =>
  state.submissions.items[type];
