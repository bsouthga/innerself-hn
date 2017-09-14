import { RouterState } from './router';
import { SubmissionState } from './submissions';
import { DbState } from './db';

export type State = {
  submissions: SubmissionState;
  router: RouterState;
  db: DbState;
};
