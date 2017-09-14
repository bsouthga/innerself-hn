import html from 'innerself';
import { connect, dispatch, push, HOME, RoutePath, State } from '../store';

const go = (path: RoutePath) => dispatch(push(path), true);

export const NavbarLink = connect(
  (
    state: State,
    props: {
      path: RoutePath;
      text?: string;
      className?: string;
    }
  ) => html`
  <a class="${props.className ||
    (state.router.path === props.path ? 'active' : '')}" onclick=${go(
    props.path
  )}>
    ${props.text || props.path}
  </a>
`
);
