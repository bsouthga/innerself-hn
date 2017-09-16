import html from 'innerself';
import {
  dispatch,
  getItemById,
  getItems,
  getPath,
  getQuery,
  getRequesting,
  State,
  Story
} from '../store';
import {
  isComment,
  isObject,
  isStory,
  isString,
  max,
  min,
  set
} from '../store/util';
import { Article } from './article';
import { Comment } from './comment';
import { Link } from './link';
import { Loading } from './loading';
import { ensureUser } from './user';

const RESULTS_PER_PAGE = 20;

export const Submitted = (state: State) => {
  const user = ensureUser(state);
  const requesting = getRequesting(state);
  const query = getQuery(state);
  const path = getPath(state);

  if (isString(user)) return user;

  const { submitted = [] } = user;

  const total = submitted.length;
  const skip = 'skip' in query ? Number(query.skip) : 0;
  const typesToShow = 'type' in query ? query.type : 'all';
  const show = submitted.slice(skip, skip + RESULTS_PER_PAGE);
  const need = show.filter(id => !getItemById(state, id));

  if (need.length) {
    const request = need.filter(id => !requesting[id]);
    if (request.length) dispatch(getItems(request));
  }

  const showPrevious = skip !== 0;
  const showNext = skip + RESULTS_PER_PAGE < total;
  const showAll = typesToShow === 'all';
  const showComments = showAll || typesToShow === 'comments';
  const showStories = showAll || typesToShow === 'stories';

  let comments = 0;
  let stories = 0;

  const content = need.length
    ? Loading()
    : show
        .map(id => {
          const item = getItemById(state, id)!;
          switch (true) {
            case isComment(item): {
              comments++;
              return showComments ? Comment({ id }) : '';
            }
            case isStory(item): {
              stories++;
              return showStories ? Article({ item: item as Story }) : '';
            }
          }
        })
        .join('');

  const links = [
    showPrevious && {
      text: 'previous',
      query: set(query, { skip: max(0, skip - RESULTS_PER_PAGE) })
    },
    { text: `show all`, query: set(query, { type: 'all' }) },
    {
      text: `comments only`,
      query: set(query, { type: 'comments' })
    },
    {
      text: `stories only`,
      query: set(query, { type: 'stories' })
    },
    showNext && {
      text: 'next',
      query: set(query, {
        skip: min(skip + RESULTS_PER_PAGE)
      })
    }
  ];

  return html`
    <div class="submitted">
      <div class="submitted-title">
        submissions by ${user.id}
      </div>
      <div class="submitted-controls">
        ${links
          .map(
            link =>
              isObject(link) &&
              Link({
                className:
                  link.query.type === typesToShow &&
                  link.text !== 'next' &&
                  link.text !== 'previous'
                    ? 'active'
                    : '',
                path,
                ...link
              })
          )
          .filter(Boolean)
          .join('|')}
      </div>
      <div class="submitted-content">
        ${content || '(none)'}
      </div>
    </div>
  `;
};
