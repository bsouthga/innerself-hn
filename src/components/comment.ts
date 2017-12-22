import html from '../innerself';
import {
  connect,
  dispatch,
  getExpanded,
  paths,
  State,
  toggleExpandItem
} from '../store';
import {
  ensureRequested,
  formatDate,
  isComment,
  replaceLinkHost
} from '../store/util';
import { ARTICLE } from './article';
import { Link } from './link';
import { Loading } from './loading';

export const COMMENT = 'comment';

export interface CommentProps {
  id: string | number;
  child?: boolean;
  compact?: boolean;
}

/**
 * toggle expanding comment children
 */
const ToggleLink = (id: number | string, children: string) => html`
  <a class="${COMMENT}-expand"
     onclick=${dispatch(toggleExpandItem(id), true)}>
    ${children}
  </a>
`;

/**
 * individual comment tree node, includes children
 */
export const Comment = connect((state: State, props: CommentProps): string => {
  const { id, compact, child } = props;
  const expanded = getExpanded(state);
  const item = ensureRequested(state, id);

  if (!isComment(item)) return '';

  const user = !item.by
    ? '[deleted]'
    : Link({
        path: paths.USER,
        text: `${item.by}`,
        cls: `${ARTICLE}-link`,
        query: { id: item.by || '' }
      });

  const commentLink = Link({
    path: paths.ITEM,
    text: formatDate(item.time),
    cls: `${ARTICLE}-link`,
    query: { id: `${item.id}` }
  });

  const parentLink =
    compact &&
    Link({
      path: paths.ITEM,
      text: 'parent',
      cls: `${ARTICLE}-link`,
      query: { id: `${item.parent}` }
    });

  const kids = item.kids || [];

  const childrenToggle = !expanded[id]
    ? ToggleLink(id, `show children (${kids.length})`)
    : ToggleLink(id, `hide children`);

  const showChildren = kids.length && !compact;

  const children = !showChildren
    ? ''
    : !expanded[id]
      ? ''
      : kids.map(kid => Comment({ id: kid, child: true })).join('') ||
        Loading();

  return html`
    <div class="${COMMENT} ${child ? COMMENT + '-child' : ''}">
      <div class="${COMMENT}-info">
       ${user} ${commentLink} ${parentLink ? '| ' + parentLink : ''}
      </div>
      <div class="${COMMENT}-text">
        ${replaceLinkHost(item.text)}
      </div>
      ${showChildren ? childrenToggle : ''}
      ${replaceLinkHost(children)}
    </div>
  `;
});
