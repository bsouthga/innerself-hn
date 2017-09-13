import html from 'innerself';
import { Article } from './article';
import { Story } from '../store';

export const ArticleList = (stories?: Story[]) => html`
  <table class="article-list">
    <tbody>
      ${stories ? stories.map(Article) : '(loading)'}
    </tbody>
  </table>
`;
