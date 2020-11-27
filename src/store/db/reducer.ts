import { ActionTypes } from '../action-types';
import { Action } from '../actions';
import { set } from '../util';
import { DbState } from './state';

export const db = (state: DbState = { entities: {} }, action: Action) => {
  switch (action.type) {
    case ActionTypes.INSERT_ENTITIES: {
      return set(state, {
        entities: set(state.entities, action.payload.entities),
      });
    }

    default:
      return state;
  }
};
