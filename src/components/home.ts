import html from 'innerself';
import {
  dispatch,
  getItemById,
  getTopSubmissions,
  State,
  Story,
  TopRequestType
} from '../store';
import { ArticleList } from './article-list';
import { Loading } from './loading';

export const Home = (state: State, type: TopRequestType) => {
  const { submissions, router } = state;
  const { items, requesting } = submissions;
  const stories = items[type];

  // if we don't yet have the submissions,
  // dispatch (async) event to get them...
  if (!stories) {
    if (!requesting[type]) dispatch(getTopSubmissions(type));
    return Loading();
  } else {
    return ArticleList({ items: stories });
  }
};
