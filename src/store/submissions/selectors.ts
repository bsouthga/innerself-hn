import { State } from '../state';

export const getRequesting = (state: State) => state.submissions.requesting;
export const getExpanded = (state: State) => state.submissions.expanded;
