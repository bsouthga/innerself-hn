import html from 'innerself';
import { State, getItemById, dispatch, getItem } from '../store';
import { Article } from './article';
import { Comment } from './comment';
import { Loading } from './loading';

export const Item = (state: State) => {
  const { id = '' } = state.router.query || {};
  const { requesting: { items = {} } } = state.submissions;
  const item = getItemById(state, id);

  /**
   * no item, need to get it
   */
  if (!item) {
    // not already requesting, request...
    if (!items[id]) dispatch(getItem(id));
    return Loading();
  }

  const { kids } = item;

  return html`
    ${Article({ item })}
    <div class="comments">
      ${kids ? kids.map(id => Comment({ id })) : '(no comments)'}
    </div>
  `;
};
