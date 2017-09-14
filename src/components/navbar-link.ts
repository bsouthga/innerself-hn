import html from 'innerself';
import { Link, LinkProps } from './link';
import { connect, State } from '../store';
import { set } from '../util';

export const NavbarLink = connect((state: State, props: LinkProps) => {
  const active = state.router.path === props.path;
  const className =
    (props.className || '') + ' navbar-link ' + (active ? 'active' : '');

  return Link(set(props, { className }));
});
