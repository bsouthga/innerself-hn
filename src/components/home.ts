import html from 'innerself';
import { ArticleList } from './article-list';
import { State } from '../store';

export const Home = (state: State) => {
  return ArticleList(state.stories);
};
