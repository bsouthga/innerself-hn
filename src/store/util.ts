import { dispatch } from "./";
import { Action, init } from "./actions";
import { getItemById } from "./db";
import { Comment, Item, Story } from "./hn-types";
import { State } from "./state";
import { getFailed, getItems, getRequesting } from "./submissions";

const STORAGE_PREFIX = "_in_";
const TS_REGEX = new RegExp(["^", STORAGE_PREFIX, ".*:ts$"].join(""));
const storage = localStorage;
const urlsp = (q?: string) => new URLSearchParams(q);
const MINUTE = 6e4;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const HN_HOST = /https?:&#x2F;&#x2F;news\.ycombinator\.com/g;
const { protocol, host } = location;
const expiry = MINUTE; // 1 min default

/**
 *
 *
 * extract globals into exports for minifier
 *
 *
 */

export const tick = <T extends (...args: any[]) => any>(fn: T, time = 0) =>
  setTimeout(fn, time);

export const now = Date.now;
export const num = Number;
export const str = (x: number | string | { toString(): string }) => `${x}`;
export const lastMinute = () => now() - MINUTE;

export const isStory = (item?: Item | void): item is Story =>
  !!item && item.type === "story";
export const isComment = (item?: Item | void): item is Comment =>
  !!item && item.type === "comment";
export const isString = (obj: any): obj is string => typeof obj === "string";
export const isObject = (obj: any): obj is object => typeof obj === "object";

export const max = Math.max;
export const min = Math.min;
export const round = Math.round;

export const keys = Object.keys;
export const set: typeof Object.assign = (...objs: any[]) =>
  Object.assign({}, ...objs);

/**
 * check if we should make a request for id...
 *
 * @param state
 * @param id
 */
export const shouldRequest = (state: State, id: string | number) => {
  const requesting = getRequesting(state);
  const failed = getFailed(state);
  return !requesting[id] && (!failed[id] || failed[id] < lastMinute());
};

/**
 *
 * check if item exists in state, request if necessary
 *
 */
export const ensureRequested = (state: State, id: string | number) => {
  const item = getItemById(state, id);

  if (!item) {
    if (shouldRequest(state, id)) dispatch(getItems([id]));
  } else {
    return item;
  }
};

/**
 * compose functions of the same signature
 *
 * @param fns functions taking and returning type A
 */
export const compose = <A>(...fns: ((a: A) => A)[]): ((a: A) => A) => {
  const first = fns.pop();
  if (!first) return (a) => a;
  return (arg) => fns.reduceRight((result, fn) => fn(result), first(arg));
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
  const cacheKey = `${STORAGE_PREFIX}${url}`;
  const cached = storage.getItem(cacheKey);
  const whenCached = storage.getItem(cacheKey + ":ts");
  if (cached && whenCached) {
    const age = now() - num(whenCached);
    if (age < expiry) {
      const response = new Response(new Blob([cached]));
      return Promise.resolve(response);
    } else {
      storage.removeItem(cacheKey);
      storage.removeItem(cacheKey + ":ts");
    }
  }

  return fetch(url, options).then((response) => {
    if (response.status === 200) {
      const ct = response.headers.get("Content-Type");
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        response
          .clone()
          .text()
          .then((content) => {
            storage.setItem(cacheKey, content);
            storage.setItem(cacheKey + ":ts", str(now()));
          });
      }
    }
    return response;
  });
};

export const queryFromString = (query: string) =>
  Array.from(urlsp(query)).reduce((o, [k, v]) => set(o, { [k]: v }), {});

export const queryToString = (query: { [key: string]: string }) => {
  const params = urlsp();
  const paramKeys = keys(query);
  paramKeys.forEach((key) => params.set(key, query[key]));
  return str(params);
};

/**
 * combine reducers (like redux)
 */
export const combineReducers = <S extends { [key: string]: any }>(
  reducers: { [K in keyof S]: (state: S[K], action: Action) => S[K] }
): ((state: S, action?: Action) => S) => {
  const names = keys(reducers) as (keyof S)[];
  const initAction = init();

  return (state, action = initAction) =>
    names.reduce((out, name) => {
      out[name] = reducers[name](out[name], action);
      return out;
    }, state || {});
};

const plural = (n: number) => (n === 1 ? " ago" : "s ago");
const formatDateHelper = (diff: number, div: number, text: string) => {
  const v = round(diff / div);
  return v + " " + text + plural(v);
};

export const formatDate = (d: number) => {
  const diff = now() - d * 1000;
  switch (true) {
    case diff > DAY:
      return formatDateHelper(diff, DAY, "day");
    case diff > HOUR:
      return formatDateHelper(diff, HOUR, "hour");
    case diff > MINUTE:
      return formatDateHelper(diff, MINUTE, "minute");
    default: {
      return "less than a minute ago";
    }
  }
};

export const replaceLinkHost = (content: string = "") =>
  content.replace(HN_HOST, `${protocol}//${host}`);

/**
 * create action from type and payload
 */
export const createAction = <T extends number, P extends {}>(
  type: T,
  payload: P
) => ({
  type,
  payload,
});

/**
 * simple debounce
 *
 * @param fn no-args function
 * @param time debounce interval
 */
export const debounce = <F extends () => any>(fn: F, time = 1000) => {
  let timeout: NodeJS.Timeout | null = null;
  return () => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = tick(fn, time);
  };
};

/**
 * remove expired local storage items
 */
export const pruneLocalStorage = () => {
  const storageKeys = keys(storage);
  const remove: string[] = [];
  const date = now() - expiry * 1000;
  let i = storageKeys.length;

  while (i--) {
    const key = storageKeys[i];
    if (TS_REGEX.test(key)) {
      const ts = storage.getItem(key);
      if (Number(ts) < date) {
        remove.push(key);
        if (remove.length > 100) break;
      }
    }
  }

  if (remove.length) {
    let r = remove.length;
    while (r--) {
      const key = remove[r];
      storage.removeItem(key);
      storage.removeItem(key.replace(":ts", ""));
    }
    tick(pruneLocalStorage);
  }
};

/**
 * create middleware to prune local storage on actions
 */
export const createPruneMiddleware = () => {
  const debounced = debounce(pruneLocalStorage);
  return (action: Action) => {
    debounced();
    return action;
  };
};
