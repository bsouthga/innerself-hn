import { Item } from '../item';
import { dispatch } from '../';

export const INSERT_ENTITIES = 'INSERT_ENTITIES';
export type INSERT_ENTITIES = typeof INSERT_ENTITIES;

export type DbAction = InsertEntitesAction;

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
