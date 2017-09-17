import html from 'innerself';
import {
  dispatch,
  getItemById,
  getQuery,
  getRequesting,
  getUser,
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
  const user = getItemById(state, id);
  if (user && user.type !== 'user') return NotFound();

  if (!user) {
    if (!requesting[id]) dispatch(getUser(id));
    return Loading();
  }

  return user;
};

const row = (key: string, value: string | number) =>
  `<tr><td>${key}:</td><td>${value}</td></tr>`;

export const User = (state: State) => {
  const user = ensureUser(state);
  return isString(user)
    ? user
    : html`
    <table>
      ${[
        row('user', user.id),
        row('created', formatDate(user.created)),
        row('karma', user.karma),
        row('about', user.about || 'blank')
      ]}
    </table>
    ${Submitted(state)}
  `;
};
