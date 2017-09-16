import html from 'innerself';
import { Story } from '../store';
import { formatDate } from '../store/util';
import { Link } from './link';

export interface ArticleProps {
  item: Story;
  index?: number;
  text?: boolean;
}

export const Article = ({ item, index, text }: ArticleProps) => {
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
    query: { id: `${item.id}` }
  });

  const indexInfo =
    typeof index !== 'undefined'
      ? html`<div class="article-index">
        ${index + 1}.
      </div>`
      : '';

  const itemText = !text
    ? ''
    : html`
    <div class="article-text">
      ${item.text}
    </div>
  `;

  const url = item.url;
  const host = url && new URL(url).hostname;
  const www = /^www\./;

  return html`
    <div class="article">
      ${indexInfo}
      <div>
        <a class="article-title" href="${url || '#'}">${item.title}</a>
        ${host ? `<div class="host">(${host.replace(www, '')})</div>` : ''}
        <div class="article-info">
        ${item.score} points by ${user} ${formatDate(item.time)} | ${comments}
        </div>
        ${itemText}
      </div>
    </div>
  `;
};
