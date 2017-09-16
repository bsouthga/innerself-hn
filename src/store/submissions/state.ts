import { TopRequestType } from './actions';

export interface Requesting {
  [key: string]: boolean | void;
}

export interface SubmissionState {
  items: { [K in TopRequestType]?: number[] };
  error?: Error;
  /**
   * currently requesting
   */
  requesting: Requesting;
  expanded: { [key: string]: boolean };
}
