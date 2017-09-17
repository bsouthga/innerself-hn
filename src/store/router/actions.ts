import { createAction } from '../util';
import * as paths from './paths';

export type RouterAction = LocationChangeRequest | LocationChangeSuccess;

/**
 * uses 21-30
 */

export const LOCATION_CHANGE_SUCCESS = 21;
export type LOCATION_CHANGE_SUCCESS = typeof LOCATION_CHANGE_SUCCESS;

export const LOCATION_CHANGE_REQUEST = 22;
export type LOCATION_CHANGE_REQUEST = typeof LOCATION_CHANGE_REQUEST;

/**
 * typecheck the routes
 */
export type PathKey = keyof typeof paths;
export type RoutePath = (typeof paths)[PathKey];
export interface Query {
  [key: string]: string;
}

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
export const push = (path: RoutePath, query?: { [key: string]: string }) =>
  createAction(LOCATION_CHANGE_REQUEST, {
    path,
    query
  }) as LocationChangeRequest;
