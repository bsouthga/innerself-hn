import html from 'innerself';
import { connect, getPath, paths } from '../store';

import { Home } from './home';
import { Item } from './item';
import { Navbar } from './navbar';
import { NotFound } from './not-found';
import { User } from './user';

const Content = connect(state => {
  switch (getPath(state)) {
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
    <div class="footer">
      <a href="https://bsou.io">Ben Southgate</a> | 2017
    </div>
  </div>
`;
