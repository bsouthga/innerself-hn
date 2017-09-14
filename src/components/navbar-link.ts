import html from 'innerself';
import { connect, dispatch, push, RoutePath, State } from '../store';

const go = (path: RoutePath) => dispatch(push(path), true);

type NavbarLinkProps = {
  path: RoutePath;
  text?: string;
  className?: string;
};

export const NavbarLink = connect((state: State, props: NavbarLinkProps) => {
  const { path, text, className = '' } = props;
  const active = state.router.path === path;

  return html`
      <a class="navbar-link ${className + ' ' + (active ? 'active' : '')}"
        onclick=${go(path)}>
        ${text || path}
      </a>
    `;
});
