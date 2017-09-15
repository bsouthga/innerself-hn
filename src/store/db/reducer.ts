import { DbState } from './state';
import { Action } from '../actions';
import { INSERT_ENTITIES, INSERT_USER } from './actions';
import { set } from '../util';

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
