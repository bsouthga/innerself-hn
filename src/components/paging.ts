import { connect, getPath, getQuery, State } from '../store';
import { max, set } from '../store/util';
import { Link } from './link';

export const RESULTS_PER_PAGE = 20;

export const Previous = connect((state: State, skip: number) => {
  const query = getQuery(state);
  const path = getPath(state);

  return Link({
    path,
    text: 'previous',
    query: set(query, { skip: max(0, skip - RESULTS_PER_PAGE) })
  });
});

export const Next = connect((state: State, skip: number) => {
  const query = getQuery(state);
  const path = getPath(state);

  return Link({
    path,
    text: 'next',
    query: set(query, {
      skip: skip + RESULTS_PER_PAGE
    })
  });
});
