import { DbState } from "./db";
import { RouterState } from "./router";
import { SubmissionState } from "./submissions";

export interface State {
  submissions: SubmissionState;
  router: RouterState;
  db: DbState;
}
