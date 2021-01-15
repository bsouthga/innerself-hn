import { ActionTypes } from "../action-types";
import { createAction } from "../util";
import * as paths from "./paths";

export type RouterAction = LocationChangeRequest | LocationChangeSuccess;

/**
 * typecheck the routes
 */
export type PathKey = keyof typeof paths;
export type RoutePath = typeof paths[PathKey];
export interface Query {
  [key: string]: string;
}

export interface RouteResult {
  path: RoutePath;
  query?: Query;
}

interface LocationChangeRequest {
  type: ActionTypes.LOCATION_CHANGE_REQUEST;
  payload: RouteResult;
}

interface LocationChangeSuccess {
  type: ActionTypes.LOCATION_CHANGE_SUCCESS;
  payload: RouteResult;
}

/**
 * navigate to a route
 *
 * @param path route to navigate to
 * @param query optional query params
 */
export const push = (path: RoutePath, query?: { [key: string]: string }) =>
  createAction(ActionTypes.LOCATION_CHANGE_REQUEST, {
    path,
    query,
  }) as LocationChangeRequest;
