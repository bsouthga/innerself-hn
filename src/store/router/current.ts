import { RouteResult, RoutePath } from './actions';
import * as paths from './paths';
import { set, queryFromString } from '../../util';

const pathKeys = Object.keys(paths) as (keyof typeof paths)[];
const validPaths: string[] = pathKeys.map(k => paths[k]);

/**
 * create initial route result for state
 */
export function getCurrentRouteResult(): RouteResult {
  const pathname = window.location.pathname.slice(1);
  const valid = validPaths.indexOf(pathname) !== -1;
  const query = queryFromString(window.location.search);
  const path = valid ? pathname as RoutePath : paths.HOME;

  if (!valid) {
    history.pushState({}, 'Innerself News', '/');
  }

  return {
    path,
    query
  };
}
