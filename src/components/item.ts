import html from 'innerself';
import { State, getItemById, dispatch, getItem } from '../store';
import { Article } from './article';
import { Comment } from './comment';
import { Loading } from './loading';

export const Item = (state: State) => {
  const { id = '' } = state.router.query || {};
  const { requesting } = state.submissions;
  const item = getItemById(state, id);

  /**
   * no item, need to get it
   */
  if (!item) {
    // not already requesting, request...
    if (!requesting[id]) dispatch(getItem(id));
    return Loading();
  }

  if (item.type !== 'story') return '';

  const { kids } = item;
  const comments = kids
    ? kids.map(id => Comment({ id })).join('')
    : '(no comments)';

  return html`
    ${Article({ item })}
    <div class="comments">
      ${comments === '' ? Loading() : comments}
    </div>
  `;
};
