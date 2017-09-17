import html from 'innerself';
import { connect, getPath, paths, State } from '../store';
import { set } from '../store/util';
import { Link, LinkProps } from './link';

export const NavbarLink = connect((state: State, props: LinkProps) => {
  const active = getPath(state) === props.path;
  const cls = (props.cls || '') + ' navbar-link ' + (active ? 'active' : '');

  return Link(set(props, { cls, query: {} }));
});

const links = [{ path: 'new' }, { path: 'show' }, { path: 'ask' }];

export const Navbar = () => html`
  <div class="navbar">
    <div class="navbar-links">
      ${NavbarLink({
        path: paths.HOME,
        cls: 'logo',
        text: 'Innerself News'
      })}
      ${links.map(NavbarLink).join(' | ')}
    </div>
    <a class="navbar-link"
       href="https://github.com/bsouthga/innerself-hn">
      <img src="github.svg" />
    </a>
  </div>
`;
