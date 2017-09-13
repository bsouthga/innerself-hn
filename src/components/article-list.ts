import html from 'innerself';
import { Article } from './article';
import { Story } from '../store';

export const ArticleList = (stories?: Story[]) => html`
  <div class="article-list">
    <div>
      ${stories ? stories.map(Article) : '(loading)'}
    </div>
  </div>
`;
