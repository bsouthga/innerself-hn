import html from 'innerself';
import { Item } from '../store';
import { Link } from './link';

export const Article = ({ item, index }: { item: Item; index?: number }) => {
  const user = Link({
    path: 'user',
    text: `${item.by}`,
    className: 'article-link',
    query: { id: item.by || '' }
  });

  const comments = Link({
    path: 'item',
    text: `${item.descendants} comments`,
    className: 'article-link',
    query: { id: item.id.toString() }
  });

  const indexInfo =
    typeof index !== 'undefined'
      ? html`<div class="article-index">
        ${index + 1}.
      </div>`
      : '';

  return html`
    <div class="article">
      ${indexInfo}
      <div>
        <a class="article-title" href="${item.url || '#'}">${item.title}</a>
        <div class="article-info">
        ${item.score} points by ${user} | ${comments}
        </div>
      </div>
    </div>
  `;
};
