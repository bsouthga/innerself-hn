import { Item, User } from '../hn-types';
import { dispatch } from '../';

export const INSERT_ENTITIES = 'INSERT_ENTITIES';
export type INSERT_ENTITIES = typeof INSERT_ENTITIES;

export type DbAction = InsertEntitesAction | InsertUserAction;

type EntityHash = {
  [key: string]: Item | void;
};

type InsertEntitesAction = {
  type: INSERT_ENTITIES;
  payload: {
    entities: EntityHash;
  };
};

export const insertEntities = (entities: Item[]): InsertEntitesAction => {
  return {
    type: INSERT_ENTITIES,
    payload: {
      entities: entities.reduce(
        (out, e) => {
          out[e.id] = e;
          return out;
        },
        {} as EntityHash
      )
    }
  };
};

export const INSERT_USER = 'INSERT_USER';
export type INSERT_USER = typeof INSERT_USER;

type InsertUserAction = {
  type: INSERT_USER;
  payload: {
    users: { [key: string]: User };
  };
};

export const insertUser = (user: User): InsertUserAction => ({
  type: INSERT_USER,
  payload: { users: { [user.id]: user } }
});
