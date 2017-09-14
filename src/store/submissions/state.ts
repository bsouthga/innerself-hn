import { Item } from '../item';

export type Requesting = {
  top?: boolean;
  items?: { [key: string]: boolean | void };
};

export type SubmissionState = {
  items?: number[];
  error?: Error;
  /**
   * currently requesting
   */
  requesting: Requesting;
  expanded: { [key: string]: boolean };
};
