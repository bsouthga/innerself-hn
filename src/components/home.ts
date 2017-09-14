import html from 'innerself';
import { Article } from './article';
import { State, dispatch, getTopSubmissions, getItemById } from '../store';
import { Loading } from './loading';

export const Home = (state: State) => {
  const { submissions } = state;
  const { items, requesting } = submissions;
  // if we don't yet have the submissions,
  // dispatch (async) event to get them...
  if (!items) {
    if (!requesting.top) dispatch(getTopSubmissions());
    return Loading();
  } else {
    const stories = items.map(id => getItemById(state, id)).filter(Boolean);

    return html`
      <div class="article-list">
        <div>
          ${stories.map(
            (item, index) => (item ? Article({ item, index }) : '')
          )}
        </div>
      </div>
    `;
  }
};
