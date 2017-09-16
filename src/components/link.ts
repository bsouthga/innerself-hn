import html from 'innerself';
import { dispatch, push, Query, RoutePath } from '../store';
import { queryToString } from '../store/util';

const go = (path: RoutePath, query?: Query) =>
  dispatch(push(path, query), true);

export interface LinkProps {
  path: RoutePath;
  text?: string;
  query?: Query;
  className?: string;
}

/**
 * client side routing link
 */
export const Link = (props: LinkProps) => {
  const { path, text, query = {}, className = '' } = props;
  const queryString = queryToString(query);
  const url = path + (queryString ? `?${queryString}` : '');

  return html`
      <a href="/${url}" class="${className} client-link"
        onclick=${go(path, query)}>
        ${text || path}
      </a>
    `;
};
