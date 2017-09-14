import html from 'innerself';
import { connect, paths } from '../store';

import { NotFound } from './not-found';
import { Navbar } from './navbar';
import { Home } from './home';
import { Item } from './item';
import { User, Submitted } from './user';

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
    case paths.SUBMITTED:
      return Submitted(state);

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
