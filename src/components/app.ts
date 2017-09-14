import html from 'innerself';
import { connect, paths } from '../store';

import { Navbar } from './navbar';
import { Home } from './home';
import { Item } from './item';
import { User } from './user';

const Content = connect(state => {
  switch (state.router.path) {
    case paths.HOME:
      return Home(state);
    case paths.ITEM:
      return Item(state);
    case paths.USER:
      return User(state);

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
