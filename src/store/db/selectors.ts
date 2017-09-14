import { State } from '../state';

export const getItemById = (state: State, id: string | number) => {
  const entities = state.db.entities;
  return entities && entities[id];
};

export const getUserById = (state: State, id: string | number) => {
  const users = state.db.users;
  return users && users[id];
};
