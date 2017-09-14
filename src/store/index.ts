import { createStore } from 'innerself';
import { reducer } from './reducer';
import middleware from './middleware';
import { getTopStories, Action } from './actions';

const { dispatch: _dispatch, connect, attach } = createStore(
  middleware(reducer)
);

// attach actual dispatch function to window
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
  if (toString) return `'dispatch(${JSON.stringify(action)})'`;
  setTimeout(_dispatch, 0, action);
}

export { connect, attach };
export * from './actions';
export * from './types';
export * from './router';
