import html from 'innerself';
import { ArticleList } from './article-list';
import { State, dispatch, getTopStories } from '../store';
import { Loading } from './loading';

export const Home = (state: State) => {
  const { stories } = state;
  // if we don't yet have the stories,
  // dispatch (async) event to get them...
  if (!stories) {
    dispatch(getTopStories());
    return Loading();
  } else {
    return ArticleList(stories);
  }
};
