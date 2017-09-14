import html from 'innerself';
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
      path: '',
      className: 'logo',
      text: 'Innerself News'
    })}
    ${links.map(NavbarLink)}
  </div>
`;
