import html from 'innerself';
import {
  dispatch,
  getItemById,
  getItems,
  getQuery,
  getRequesting,
  State
} from '../store';
import { isStory } from '../store/util';
import { Article } from './article';
import { Comment } from './comment';
import { Loading } from './loading';
import { NotFound } from './not-found';

export const Item = (state: State) => {
  const { id = '' } = getQuery(state);
  const requesting = getRequesting(state);
  const item = getItemById(state, id);

  if (!id) return NotFound();

  /**
   * no item, need to get it
   */
  if (!item) {
    // not already requesting, request...
    if (!requesting[id]) dispatch(getItems([id]));
    return Loading();
  }

  if (!isStory(item)) return '';

  const { kids } = item;
  const comments = kids
    ? kids.map(kid => Comment({ id: kid })).join('')
    : '(no comments)';

  return html`
    ${Article({ item, text: true })}
    <div class="comments">
      ${comments === '' ? Loading() : comments}
    </div>
  `;
};
