import { createStore } from 'innerself';
import { Action } from './actions';
import middleware from './middleware';
import { reducer } from './reducer';

const { dispatch: originalDispatch, connect, attach } = createStore(
  middleware(reducer)
);

// attach dispatch function to window for use in element events
window.dispatch = dispatch;

/**
 * convenience wrapper for components
 *
 * @param action application action
 * @param toString whether or not to produce a string (for element events)
 */
export function dispatch(action: Action): void;
export function dispatch(action: Action, toString: true): string;
export function dispatch(action: Action, toString?: boolean) {
  if (toString)
    return `'event.preventDefault();dispatch(${JSON.stringify(action)})'`;
  return originalDispatch(action);
}

export { connect, attach };
export * from './hn-types';
export * from './actions';
export * from './state';
export * from './router';
export * from './submissions';
export * from './db';
