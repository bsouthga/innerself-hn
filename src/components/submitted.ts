import html from '../innerself';
import {
  dispatch,
  getItemById,
  getItems,
  getPath,
  getQuery,
  State,
  Story
} from '../store';
import {
  isComment,
  isStory,
  isString,
  num,
  set,
  shouldRequest
} from '../store/util';
import { Article } from './article';
import { Comment } from './comment';
import { Link, LinkProps } from './link';
import { Loading } from './loading';
import { Page, RESULTS_PER_PAGE } from './page';
import { ensureUser } from './user';

const SUBMITTED = 'submitted';

const SubmittedItem = (item?: string) =>
  !item ? '' : `<div class="${SUBMITTED}-item">${item.trim()}</div>`;

export const Submitted = (state: State) => {
  const user = ensureUser(state);
  const query = getQuery(state);
  const path = getPath(state);

  if (isString(user)) return user;

  const { submitted = [] } = user;

  const total = submitted.length;
  const skip = 'skip' in query ? num(query.skip) : 0;
  const typesToShow = 'type' in query ? query.type : 'all';
  const show = submitted.slice(skip, skip + RESULTS_PER_PAGE);
  const need = show.filter(id => !getItemById(state, id));

  if (need.length) {
    const request = need.filter(id => shouldRequest(state, id));
    if (request.length) dispatch(getItems(request));
  }

  const showPrevious = skip !== 0;
  const showNext = skip + RESULTS_PER_PAGE < total;
  const showAll = typesToShow === 'all';
  const showComments = showAll || typesToShow === 'comments';
  const showStories = showAll || typesToShow === 'stories';

  const content = need.length
    ? Loading()
    : show
        .map(id => {
          const item = getItemById(state, id)!;
          switch (true) {
            case isComment(item):
              return showComments ? Comment({ id, compact: true }) : '';
            case isStory(item):
              return showStories ? Article({ item: item as Story }) : '';
          }
        })
        .map(SubmittedItem)
        .join('');

  const links = [
    { text: `show all`, query: set(query, { type: 'all' }) },
    {
      text: `comments only`,
      query: set(query, { type: 'comments' })
    },
    {
      text: `stories only`,
      query: set(query, { type: 'stories' })
    }
  ];

  return html`
    <div class="${SUBMITTED}">
      <div class="${SUBMITTED}-title">
        submissions by ${user.id}
      </div>
      <div class="paging-controls">
        ${showPrevious ? Page({ direction: 'previous', skip }) + '|' : ''}
        ${links
          .map(link =>
            Link(
              set(
                {
                  cls: link.query.type === typesToShow ? 'active' : '',
                  path
                } as LinkProps,
                link
              )
            )
          )
          .join('|')}
        ${showNext ? '|' + Page({ direction: 'next', skip }) : ''}
      </div>
      <div class="${SUBMITTED}-content">
        ${content || '(none)'}
      </div>
    </div>
  `;
};
