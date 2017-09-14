import { DbState } from './state';
import { Action } from '../actions';
import { INSERT_ENTITIES } from './actions';

export function db(state: DbState = { entities: {} }, action: Action) {
  switch (action.type) {
    case INSERT_ENTITIES: {
      return {
        entities: {
          ...state.entities,
          ...action.payload.entities
        }
      };
    }

    default:
      return state;
  }
}
