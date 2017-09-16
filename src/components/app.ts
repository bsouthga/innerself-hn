import html from 'innerself';
import { connect, paths } from '../store';

import { Home } from './home';
import { Item } from './item';
import { Navbar } from './navbar';
import { NotFound } from './not-found';
import { Submitted } from './submitted';
import { User } from './user';

const Content = connect(state => {
  switch (state.router.path) {
    case paths.HOME:
      return Home(state, 'top');
    case paths.NEW:
      return Home(state, 'new');
    case paths.ASK:
      return Home(state, 'ask');
    case paths.SHOW:
      return Home(state, 'show');
    case paths.ITEM:
      return Item(state);
    case paths.USER:
      return User(state);

    default:
      return NotFound();
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
