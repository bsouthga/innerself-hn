import { createStore } from 'innerself';
import { reducer } from './reducers';
import middleware from './middleware';

const { dispatch, connect, attach } = createStore(middleware(reducer));

// attach actual dispatch function to window
window.dispatch = dispatch;

export { connect, attach, dispatch };
export * from './actions';
export * from './types';
