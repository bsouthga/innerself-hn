import { dispatch } from "../";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { createAction, queryToString } from "../util";
import { getCurrentRouteResult } from "./current";

export const createRouterMiddleware = () => {
  /**
   * listen for back / forward and update state
   */
  window.addEventListener("popstate", () =>
    dispatch(
      createAction(ActionTypes.LOCATION_CHANGE_SUCCESS, getCurrentRouteResult())
    )
  );

  return (action: Action): Action => {
    switch (action.type) {
      case ActionTypes.LOCATION_CHANGE_REQUEST: {
        const { payload } = action;
        const { path, query } = payload;
        const queryString = query && queryToString(query);
        history.pushState(
          {},
          path,
          (path || "/") + (queryString ? "?" + queryString : "")
        );
        return createAction(ActionTypes.LOCATION_CHANGE_SUCCESS, payload);
      }
    }
    return action;
  };
};
