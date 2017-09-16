import html from 'innerself';
import {
  dispatch,
  getQuery,
  getRequesting,
  getUser,
  getUserById,
  State
} from '../store';
import { formatDate, isString } from '../store/util';
import { Loading } from './loading';
import { NotFound } from './not-found';
import { Submitted } from './submitted';

export const ensureUser = (state: State) => {
  const { id = '' } = getQuery(state);
  const requesting = getRequesting(state);

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
  return isString(user)
    ? user
    : html`
    <div>
      <table>
        <tr><td>user:</td><td>${user.id}</td></tr>
        <tr><td>created:</td><td>${formatDate(user.created)}</td></tr>
        <tr><td>karma:</td><td>${user.karma}</td></tr>
        <tr><td>about:</td><td>${user.about || 'blank'}</td></tr>
      </table>
      ${Submitted(state)}
    </div>
  `;
};
