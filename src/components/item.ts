import html from '../innerself';
import { getQuery, State } from '../store';
import { ensureRequested, isComment, isStory } from '../store/util';
import { Article } from './article';
import { Comment } from './comment';
import { Loading } from './loading';
import { NotFound } from './not-found';

export const Item = (state: State) => {
  const { id = '' } = getQuery(state);
  if (!id) return NotFound();
  const item = ensureRequested(state, id);
  if (!isStory(item) && !isComment(item)) return Loading();

  const { kids } = item;
  const comments = kids
    ? kids.map(kid => Comment({ id: kid })).join('')
    : '(no comments)';

  return html`
    ${isComment(item)
      ? Comment({ id, compact: true })
      : Article({ item, text: true })}
    <div class="comments">
      ${comments === '' ? Loading() : comments}
    </div>
  `;
};
