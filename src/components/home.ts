import {
  dispatch,
  getItemById,
  getItems,
  getItemsByType,
  getQuery,
  getTopSubmissions,
  State,
  TopRequestType
} from '../store';
import { num, shouldRequest } from '../store/util';
import { ArticleList } from './article-list';
import { Loading } from './loading';
import { Page, RESULTS_PER_PAGE } from './page';

export const Home = (state: State, type: TopRequestType) => {
  const stories = getItemsByType(state, type);
  const query = getQuery(state);

  // if we don't yet have the submissions,
  // dispatch (async) event to get them...
  if (!stories) {
    if (shouldRequest(state, type)) dispatch(getTopSubmissions(type));
    return Loading();
  }

  const skip = 'skip' in query ? num(query.skip) : 0;
  const slice = stories.slice(skip, skip + RESULTS_PER_PAGE);

  // next, check for all items in the slice we are interested in...
  const need = slice.filter(id => !getItemById(state, id));
  if (need.length) {
    const request = need.filter(id => shouldRequest(state, id));
    if (request.length) dispatch(getItems(request));
    return Loading();
  } else {
    const showNext = skip + RESULTS_PER_PAGE < stories.length;
    const showPrevious = skip !== 0;

    return `
      ${ArticleList({ items: slice, skip })}
      <div class="paging-controls">
        ${showPrevious ? Page('previous', skip) : ''}
        ${showPrevious && showNext ? ' | ' : ''}
        ${showNext ? Page('next', skip) : ''}
      </div>
    `;
  }
};
