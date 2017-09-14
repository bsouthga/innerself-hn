import html from 'innerself';
import {
  State,
  dispatch,
  getTopSubmissions,
  getItemById,
  Story,
  TopRequestType
} from '../store';
import { Loading } from './loading';
import { ArticleList } from './article-list';

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
