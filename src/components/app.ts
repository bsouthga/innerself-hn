import html from 'innerself';
import { connect } from '../store';
import { Navbar } from './navbar';
import { ArticleList } from './article-list';

export const App = connect(
  state => html`
  <div class="container">
    ${Navbar()}
    ${ArticleList(state.stories)}
  </div>
`
);
