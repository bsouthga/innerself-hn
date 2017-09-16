import { Action } from '../actions';
import { set } from '../util';
import { INSERT_ENTITIES, INSERT_USER } from './actions';
import { DbState } from './state';

export function db(
  state: DbState = { entities: {}, users: {} },
  action: Action
) {
  switch (action.type) {
    case INSERT_ENTITIES: {
      return set(state, {
        entities: set(state.entities, action.payload.entities)
      });
    }

    case INSERT_USER: {
      return set(state, {
        users: set(state.users, action.payload.users)
      });
    }

    default:
      return state;
  }
}
