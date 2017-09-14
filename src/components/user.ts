import html from 'innerself';
import { State, getUserById, getUser, dispatch } from '../store';
import { formatDate } from '../store/util';
import { NotFound } from './not-found';
import { Loading } from './loading';
import { Link } from './link';
import { ArticleList } from './article-list';

export const ensureUser = (state: State) => {
  const { router: { query }, submissions: { requesting } } = state;
  const { id = '' } = query || {};

  if (!id) return NotFound();
  const user = getUserById(state, id);

  if (!user) {
    if (!requesting[id]) dispatch(getUser(id));
    return Loading();
  }

  return user;
};

export const User = (state: State) => {
  const user = ensureUser(state);
  if (typeof user === 'string') return user;

  return html`
    <div>
      <table>
        <tr><td>user:</td><td>${user.id}</td></tr>
        <tr><td>created:</td><td>${formatDate(user.created)}</td></tr>
        <tr><td>karma:</td><td>${user.karma}</td></tr>
        <tr><td>about:</td><td>${user.about || 'blank'}</td></tr>
        <tr>
          <td>links:</td>
          <td>
            ${Link({ path: 'submitted', query: { id: user.id } })}
          </td>
        </tr>
      </table>
    </div>
  `;
};

export const Submitted = (state: State) => {
  const user = ensureUser(state);
  if (typeof user === 'string') return user;
  return ArticleList({ items: user.submitted || [] });
};
