import { Item, User } from '../hn-types';
import { createAction, set } from '../util';

export const INSERT_ENTITIES = 31;
export type INSERT_ENTITIES = typeof INSERT_ENTITIES;

export type DbAction = InsertEntitesAction;

interface EntityHash {
  [key: string]: Item | void;
}

interface InsertEntitesAction {
  type: INSERT_ENTITIES;
  payload: {
    entities: EntityHash;
  };
}

export const insertEntities = (items: Item[]): InsertEntitesAction =>
  createAction(INSERT_ENTITIES, {
    entities: items.reduce((out, e) => set(out, { [e.id]: e }), {})
  });
