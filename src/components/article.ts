import html from 'innerself';
import { Story } from '../store';
import { Link } from './link';

export const Article = (item: Story, index: number) => html`
  <div class="article">
    <div class="article-index">
      ${index + 1}.
    </div>
    <div class="article-info">
      <a href="${item.url}">${item.title}</a>
      <div>
        ${Link({
          path: 'item',
          text: 'comments',
          query: { id: item.id.toString() }
        })}
      </div>
    </div>
  </div>
`;
