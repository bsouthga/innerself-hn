import { connect, getQuery } from '../store';
import { Comment } from './comment';
import { NotFound } from './not-found';

export const CommentPage = connect(state => {
  const { id = '' } = getQuery(state);
  if (!id) return NotFound();
  return Comment({ id });
});
