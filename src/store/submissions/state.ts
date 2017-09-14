import { TopRequestType } from './actions';

export type Requesting = {
  [key: string]: boolean | void;
};

export type SubmissionState = {
  items: { [K in TopRequestType]?: number[] };
  error?: Error;
  /**
   * currently requesting
   */
  requesting: Requesting;
  expanded: { [key: string]: boolean };
};
