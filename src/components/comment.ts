import html from 'innerself';
import {
  State,
  Item,
  connect,
  getItemById,
  getItem,
  dispatch,
  toggleExpandItem
} from '../store';
import { Loading } from './loading';
import { Link } from './link';

type CommentProps = {
  id: string | number;
  child?: boolean;
};

/**
 * individual comment tree node, includes children
 */
export const Comment: (
  props: CommentProps
) => string = connect((state: State, props: CommentProps) => {
  const { id, child } = props;
  const { requesting: { items = {} }, expanded } = state.submissions;
  const item = getItemById(state, id);

  if (!item) {
    if (!items[id]) dispatch(getItem(Number(id)));
    return Loading();
  }

  const user = Link({
    path: 'user',
    text: `${item.by}`,
    className: 'article-link',
    query: { id: item.by || '' }
  });

  const kids = item.kids || [];

  const children = !kids.length
    ? ''
    : !expanded[id]
      ? html`
        <a class="comment-expand"
           onclick=${dispatch(toggleExpandItem(id), true)}>
          show children (${kids.length})
        </a>
      `
      : kids.map(id => Comment({ id, child: true }));

  return html`
    <div class="comment${child ? ' comment-child' : ''}">
      <div class="comment-info">
        ${user}
      </div>
      <div class="comment-text">
        ${item.text}
      </div>
      ${children}
    </div>
  `;
});
