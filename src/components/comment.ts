import html from 'innerself';
import {
  connect,
  dispatch,
  getExpanded,
  getItemById,
  getItems,
  getRequesting,
  State,
  toggleExpandItem
} from '../store';
import { formatDate, isComment } from '../store/util';
import { Link } from './link';

interface CommentProps {
  id: string | number;
  child?: boolean;
}

interface ToggleLinkProps {
  id: number | string;
  children: string;
}

/**
 * toggle expanding comment children
 */
const ToggleLink = (props: ToggleLinkProps) => html`
  <a class="comment-expand"
     onclick=${dispatch(toggleExpandItem(props.id), true)}>
    ${props.children}
  </a>
`;

/**
 * individual comment tree node, includes children
 */
export const Comment: (
  props: CommentProps
) => string = connect((state: State, props: CommentProps) => {
  const { id, child } = props;
  const expanded = getExpanded(state);
  const requesting = getRequesting(state);
  const item = getItemById(state, id);

  if (!item) {
    if (!requesting[id]) dispatch(getItems([id]));
    return '';
  }

  if (!isComment(item)) return '';

  const user = !item.by
    ? '[deleted]'
    : Link({
        path: 'user',
        text: `${item.by}`,
        className: 'article-link',
        query: { id: item.by || '' }
      });

  const kids = item.kids || [];

  const children = !kids.length
    ? ''
    : !expanded[id]
      ? ToggleLink({
          id,
          children: `show children (${kids.length})`
        })
      : html`
        ${ToggleLink({
          id,
          children: `hide children`
        })}
        ${kids.map(kid => Comment({ id: kid, child: true }))}
      `;

  return html`
    <div class="comment${child ? ' comment-child' : ''}">
      <div class="comment-info">
       ${user} ${formatDate(item.time)}
      </div>
      <div class="comment-text">
        ${item.text}
      </div>
      ${children}
    </div>
  `;
});
