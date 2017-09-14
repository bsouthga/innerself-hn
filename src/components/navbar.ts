import html from 'innerself';
import { Link, LinkProps } from './link';
import { paths, connect, State } from '../store';

export const NavbarLink = connect((state: State, props: LinkProps) => {
  const active = state.router.path === props.path;
  const className =
    (props.className || '') + ' navbar-link ' + (active ? 'active' : '');

  return Link({ ...props, className });
});

const links = [{ path: 'new' }, { path: 'show' }, { path: 'ask' }];

export const Navbar = () => html`
  <div class="navbar">
    <div class="navbar-links">
      ${NavbarLink({
        path: paths.HOME,
        className: 'logo',
        text: 'Innerself News'
      })}
      ${links.map(NavbarLink).join(' | ')}
    </div>
    <div class="navbar-right">
      <a class="navbar-link"
      href="https://github.com/bsouthga/innerself-hn">
        <img
          style="height:15px;width:15px;"
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" />
      </a>
    </div>
  </div>
`;
