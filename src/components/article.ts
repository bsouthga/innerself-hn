import html from 'innerself';
import { Story } from '../store';
import { Link } from './link';

export const Article = (item: Story, index: number) => html`
  <div class="article">
    <div class="article-index">
      ${index + 1}.
    </div>
    <div>
      <a class="article-title" href="${item.url}">${item.title}</a>
      <div class="article-info">
      ${item.score} points by ${item.by} |
        ${Link({
          path: 'item',
          text: `${item.descendants} comments`,
          className: 'article-comments',
          query: { id: item.id.toString() }
        })}
      </div>
    </div>
  </div>
`;
