import { RouteResult } from "./actions";

export type RouterState = RouteResult & {
  previous?: RouteResult;
};
