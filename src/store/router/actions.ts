import * as paths from './paths';

export type RouterAction = LocationChangeRequest | LocationChangeSuccess;

export const LOCATION_CHANGE_SUCCESS = 'LOCATION_CHANGE_SUCCESS';
export type LOCATION_CHANGE_SUCCESS = typeof LOCATION_CHANGE_SUCCESS;

export const LOCATION_CHANGE_REQUEST = 'LOCATION_CHANGE_REQUEST';
export type LOCATION_CHANGE_REQUEST = typeof LOCATION_CHANGE_REQUEST;

/**
 * typecheck the routes
 */
type PathKey = keyof typeof paths;
export type RoutePath = (typeof paths)[PathKey];
export interface Query { [key: string]: string }

export interface RouteResult {
  path: RoutePath;
  query?: Query;
}

interface LocationChangeRequest {
  type: LOCATION_CHANGE_REQUEST;
  payload: RouteResult;
}

interface LocationChangeSuccess {
  type: LOCATION_CHANGE_SUCCESS;
  payload: RouteResult;
}

/**
 * navigate to a route
 *
 * @param path route to navigate to
 * @param query optional query params
 */
export const push = (
  path: RoutePath,
  query?: { [key: string]: string }
): LocationChangeRequest => ({
  type: LOCATION_CHANGE_REQUEST,
  payload: {
    path,
    query
  }
});
