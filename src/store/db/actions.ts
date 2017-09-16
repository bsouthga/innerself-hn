import { dispatch } from '../';
import { Item, User } from '../hn-types';
import { set } from '../util';

export const INSERT_ENTITIES = 'INSERT_ENTITIES';
export type INSERT_ENTITIES = typeof INSERT_ENTITIES;

export type DbAction = InsertEntitesAction | InsertUserAction;

interface EntityHash {
  [key: string]: Item | void;
}

interface InsertEntitesAction {
  type: INSERT_ENTITIES;
  payload: {
    entities: EntityHash;
  };
}

export const insertEntities = (items: Item[]): InsertEntitesAction => {
  const entities = items.reduce((out, e) => set(out, { [e.id]: e }), {});
  return {
    type: INSERT_ENTITIES,
    payload: {
      entities
    }
  };
};

export const INSERT_USER = 'INSERT_USER';
export type INSERT_USER = typeof INSERT_USER;

interface InsertUserAction {
  type: INSERT_USER;
  payload: {
    users: { [key: string]: User };
  };
}

export const insertUser = (user: User): InsertUserAction => ({
  type: INSERT_USER,
  payload: { users: { [user.id]: user } }
});
