import { ActionTypes } from "../action-types";
import { Item } from "../hn-types";
import { createAction, set } from "../util";

export type DbAction = InsertEntitesAction;

interface EntityHash {
  [key: string]: Item | void;
}

interface InsertEntitesAction {
  type: ActionTypes.INSERT_ENTITIES;
  payload: {
    entities: EntityHash;
  };
}

export const insertEntities = (items: Item[]): InsertEntitesAction =>
  createAction(ActionTypes.INSERT_ENTITIES, {
    entities: items.reduce((out, e) => set(out, { [e.id]: e }), {}),
  });
