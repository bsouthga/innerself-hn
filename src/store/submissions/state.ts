import { TopRequestType } from './actions';

export interface Requesting {
  [key: string]: boolean | void;
}

export interface SubmissionState {
  failed: { [key: string]: number };
  items: { [K in TopRequestType]?: number[] };
  error?: Error;
  /**
   * currently requesting
   */
  requesting: Requesting;
  expanded: { [key: string]: boolean };
}
