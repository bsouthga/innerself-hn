import html from 'innerself';
import { paths } from '../store';
import { NavbarLink } from './navbar-link';

const links = [
  { path: 'new' },
  { path: 'threads' },
  { path: 'comments' },
  { path: 'show' },
  { path: 'ask' },
  { path: 'jobs' },
  { path: 'submit' }
];

export const Navbar = () => html`
  <div class="navbar">
    ${NavbarLink({
      path: paths.HOME,
      className: 'logo',
      text: 'Innerself News'
    })}
    ${links.map(NavbarLink).join('|')}
  </div>
`;
