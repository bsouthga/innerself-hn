import html from 'innerself';
import {
  connect,
  dispatch,
  getExpanded,
  paths,
  State,
  toggleExpandItem
} from '../store';
import { ensureRequested, formatDate, isComment } from '../store/util';
import { Link } from './link';

interface CommentProps {
  id: string | number;
  child?: boolean;
  compact?: boolean;
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
  const item = ensureRequested(state, id);

  if (!isComment(item)) return '';

  const user = !item.by
    ? '[deleted]'
    : Link({
        path: paths.USER,
        text: `${item.by}`,
        className: 'article-link',
        query: { id: item.by || '' }
      });

  const commentLink = Link({
    path: paths.ITEM,
    text: formatDate(item.time),
    className: 'article-link',
    query: { id: `${item.id}` }
  });

  const parentLink =
    props.compact &&
    Link({
      path: paths.ITEM,
      text: 'parent',
      className: 'article-link',
      query: { id: `${item.parent}` }
    });

  const kids = item.kids || [];

  const children =
    !kids.length || props.compact
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
       ${user} ${commentLink} ${parentLink ? '| ' + parentLink : ''}
      </div>
      <div class="comment-text">
        ${item.text}
      </div>
      ${children}
    </div>
  `;
});
