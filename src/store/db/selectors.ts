import { Item } from '../hn-types';
import { State } from '../state';

export const getItemById = (state: State, id: string | number) => {
  const entities = state.db.entities;
  return entities && entities[id];
};
