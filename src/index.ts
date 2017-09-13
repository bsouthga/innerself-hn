import { createStore } from 'innerself';
import { App } from './components';
import { attach, dispatch, getTopStories } from './store';

attach(App, document.getElementById('root')!);
dispatch(getTopStories());
