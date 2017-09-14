import html from 'innerself';
import { connect, paths } from '../store';

import { Navbar } from './navbar';
import { Home } from './home';

const Content = connect(state => {
  switch (state.router.path) {
    case paths.HOME:
      return Home(state);
    default:
      return `Not implemented...`;
  }
});

export const App = () => html`
  <div class="container">
    ${Navbar()}
    <div class="content">
      ${Content()}
    </div>
  </div>
`;
