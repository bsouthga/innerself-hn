import html from 'innerself';
import { State } from '../store';

export const CommentPage = (state: State) => {
  const { id = '' } = state.router.query || {};

  return html`
    comments for id = ${id}..
  `;
};
