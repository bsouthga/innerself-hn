import { Action } from '../actions';
import { routerMiddleware } from './middleware';

export * from './paths';
export * from './actions';
export * from './init';
export { routerReducer } from './reducer';
export const router = routerMiddleware;
