import { createStore } from 'innerself';
import { App } from './components';
import { attach, init } from './store';

attach(App, document.getElementById('root')!);
init();
