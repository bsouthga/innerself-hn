import html from 'innerself';
import { connect, dispatch, push, Query, RoutePath, State } from '../store';

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
  const { path, text, query, className = '' } = props;

  return html`
      <a class="${className}"
        onclick=${go(path, query)}>
        ${text || path}
      </a>
    `;
};
