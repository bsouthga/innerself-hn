import html from 'innerself';
import { Link, LinkProps } from './link';
import { paths, connect, State } from '../store';

export const NavbarLink = connect((state: State, props: LinkProps) => {
  const active = state.router.path === props.path;
  const className =
    (props.className || '') + ' navbar-link ' + (active ? 'active' : '');

  return Link({ ...props, className });
});

const links = [
  { path: 'new' },
  { path: 'threads' },
  { path: 'comments' },
  { path: 'show' },
  { path: 'ask' },
  { path: 'jobs' }
];

export const Navbar = () => html`
  <div class="navbar">
    ${NavbarLink({
      path: paths.HOME,
      className: 'logo',
      text: 'Innerself News'
    })}
    ${links.map(NavbarLink).join(' | ')}
  </div>
`;
