import html from 'innerself';
import { connect, getPath, paths } from '../store';

import { Home } from './home';
import { Item } from './item';
import { Navbar } from './navbar';
import { NotFound } from './not-found';
import { User } from './user';

const Content = connect(state => {
  const path = getPath(state);
  switch (path) {
    case paths.HOME:
    case paths.NEW:
    case paths.ASK:
    case paths.SHOW:
      return Home(state, path);
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
