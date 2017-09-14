import html from 'innerself';
import { Story } from '../store';
import { formatDate } from '../store/util';
import { Link } from './link';

export const Article = ({ item, index }: { item: Story; index?: number }) => {
  const user = Link({
    path: 'user',
    text: `${item.by}`,
    className: 'article-link',
    query: { id: item.by || '' }
  });

  const comments = Link({
    path: 'item',
    text: `${item.descendants || 0} comments`,
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
        ${item.score} points by ${user} ${formatDate(item.time)} | ${comments}
        </div>
      </div>
    </div>
  `;
};
