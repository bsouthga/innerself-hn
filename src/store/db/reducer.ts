import { DbState } from './state';
import { Action } from '../actions';
import { INSERT_ENTITIES, INSERT_USER } from './actions';

export function db(
  state: DbState = { entities: {}, users: {} },
  action: Action
) {
  switch (action.type) {
    case INSERT_ENTITIES: {
      return {
        ...state,
        entities: {
          ...state.entities,
          ...action.payload.entities
        }
      };
    }

    case INSERT_USER: {
      return {
        ...state,
        users: {
          ...state.users,
          ...action.payload.users
        }
      };
    }

    default:
      return state;
  }
}
