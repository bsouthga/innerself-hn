import { dispatch } from './';
import { Action, init } from './actions';
import { getItemById } from './db';
import { Comment, Item, Story } from './hn-types';
import { State } from './state';
import { getItems, getRequesting } from './submissions';

const STORAGE_PREFIX = '_in_';
const storage = localStorage;
const URLSP = URLSearchParams;

export const now = Date.now;
export const num = Number;
export const str = (x: number | string | { toString(): string }) => `${x}`;

export const isStory = (item?: Item): item is Story =>
  !!item && item.type === 'story';
export const isComment = (item?: Item): item is Comment =>
  !!item && item.type === 'comment';
export const isString = (obj: any): obj is string => typeof obj === 'string';
export const isObject = (obj: any): obj is object => typeof obj === 'object';

export const max = Math.max;
export const min = Math.min;
export const round = Math.round;

export const keys = Object.keys;
export const set: typeof Object.assign = (...objs: any[]) =>
  Object.assign({}, ...objs);

/**
 *
 * check if item exists in state, request if necessary
 *
 */
export const ensureRequested = (state: State, id: string | number) => {
  const item = getItemById(state, id);
  const requesting = getRequesting(state);

  if (!item) {
    if (!requesting[id]) dispatch(getItems([id]));
  } else {
    return item;
  }
};

/**
 * compose functions of the same signature
 *
 * @param fns functions taking and returning type A
 */
export const compose = <A>(...fns: Array<(a: A) => A>): ((a: A) => A) => {
  const first = fns.pop();
  if (!first) return a => a;
  return arg => fns.reduceRight((result, fn) => fn(result), first(arg));
};

/**
 * cached version of fetch
 *
 * see: https://www.sitepoint.com/cache-fetched-ajax-requests/
 *
 * @param url
 * @param options
 */
export const cachedFetch = (url: string, options?: RequestInit) => {
  const expiry = 5 * 60; // 5 min default
  const cacheKey = `${STORAGE_PREFIX}${url}`;
  const cached = storage.getItem(cacheKey);
  const whenCached = storage.getItem(cacheKey + ':ts');
  if (cached && whenCached) {
    const age = (now() - num(whenCached)) / 1000;
    if (age < expiry) {
      const response = new Response(new Blob([cached]));
      return Promise.resolve(response);
    } else {
      storage.removeItem(cacheKey);
      storage.removeItem(cacheKey + ':ts');
    }
  }

  return fetch(url, options).then(response => {
    if (response.status === 200) {
      const ct = response.headers.get('Content-Type');
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        response
          .clone()
          .text()
          .then(content => {
            storage.setItem(cacheKey, content);
            storage.setItem(cacheKey + ':ts', str(now()));
          });
      }
    }
    return response;
  });
};

export const queryFromString = (query: string) =>
  [...new URLSP(query)].reduce((o, [k, v]) => set(o, { [k]: v }), {});

export const queryToString = (query: { [key: string]: string }) => {
  const params = new URLSP();
  const paramKeys = keys(query);
  paramKeys.forEach(key => params.set(key, query[key]));
  return str(params);
};

/**
 * combine reducers (like redux)
 */
export const combineReducers = <S extends { [key: string]: any }>(
  reducers: { [K in keyof S]: (state: S[K], action: Action) => S[K] }
): ((state: S, action?: Action) => S) => {
  const names = keys(reducers) as Array<keyof S>;
  const initAction = init();

  return (state, action = initAction) =>
    names.reduce((out, name) => {
      out[name] = reducers[name](out[name], action);
      return out;
    }, state || {});
};

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const plural = (n: number) => (n === 1 ? ' ago' : 's ago');
const formatDateHelper = (diff: number, div: number, text: string) => {
  const v = round(diff / div);
  return v + ' ' + text + plural(v);
};

export const formatDate = (d: number) => {
  const diff = now() - d * 1000;
  switch (true) {
    case diff > DAY:
      return formatDateHelper(diff, DAY, 'day');
    case diff > HOUR:
      return formatDateHelper(diff, HOUR, 'hour');
    case diff > MINUTE:
      return formatDateHelper(diff, MINUTE, 'minute');
    default: {
      return 'less than a minute ago';
    }
  }
};

const HN_HOST = /https?:&#x2F;&#x2F;news\.ycombinator\.com/g;
const { protocol, host } = location;

export const replaceLinkHost = (content: string = '') =>
  content.replace(HN_HOST, `${protocol}//${host}`);

/**
 * create action from type and payload
 */
export const createAction = <T extends number, P extends {}>(
  type: T,
  payload: P
) => ({
  type,
  payload
});
