import { connect, getPath, getQuery, State } from '../store';
import { max, set } from '../store/util';
import { Link } from './link';

export const RESULTS_PER_PAGE = 20;

export const Page = connect(
  (state: State, direction: 'next' | 'previous', skip: number) => {
    const query = getQuery(state);
    const path = getPath(state);

    return Link({
      path,
      text: direction,
      query: set(query, {
        skip:
          direction === 'next'
            ? skip + RESULTS_PER_PAGE
            : max(0, skip - RESULTS_PER_PAGE),
      }),
    });
  }
);
