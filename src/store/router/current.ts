import { queryFromString } from '../util';
import { RoutePath, RouteResult } from './actions';
import { ASK, COMMENTS, HOME, ITEM, NEW, SHOW, USER } from './paths';

const pathList: RoutePath[] = [NEW, COMMENTS, HOME, ITEM, SHOW, ASK, USER];

/**
 * create initial route result for state
 */
export const getCurrentRouteResult = (): RouteResult => {
  const pathname = location.pathname.slice(1);
  const valid = pathList.indexOf(pathname as RoutePath) !== -1;
  const query = queryFromString(location.search);
  const path = valid ? pathname as RoutePath : HOME;

  if (!valid) {
    history.pushState({}, 'Innerself News', '/');
  }

  return { path, query };
};
