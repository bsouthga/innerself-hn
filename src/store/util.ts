import { Action, init } from './actions';

const STORAGE_PREFIX = '__innerself_news__';
const storage = localStorage;

export const keys = Object.keys;
export const set: typeof Object.assign = (...objs: any[]) =>
  Object.assign({}, ...objs);

/**
 * compose functions of the same signature
 *
 * @param fns functions taking and returning type A
 */
export const compose = <A>(...fns: ((a: A) => A)[]): ((a: A) => A) => {
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
export const cachedFetch = (
  url: string,
  options?: RequestInit & { seconds?: number } | number | undefined
) => {
  let expiry = 5 * 60; // 5 min default
  if (typeof options === 'number') {
    expiry = options;
    options = undefined;
  } else if (typeof options === 'object') {
    expiry = options.seconds || expiry;
  }
  let cacheKey = `${STORAGE_PREFIX}${url}`;
  let cached = storage.getItem(cacheKey);
  let whenCached = storage.getItem(cacheKey + ':ts');
  if (cached !== null && whenCached !== null) {
    let age = (Date.now() - Number(whenCached)) / 1000;
    if (age < expiry) {
      let response = new Response(new Blob([cached]));
      return Promise.resolve(response);
    } else {
      storage.removeItem(cacheKey);
      storage.removeItem(cacheKey + ':ts');
    }
  }

  return fetch(url, options).then(response => {
    if (response.status === 200) {
      let ct = response.headers.get('Content-Type');
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        response
          .clone()
          .text()
          .then(content => {
            storage.setItem(cacheKey, content);
            storage.setItem(cacheKey + ':ts', Date.now().toString());
          });
      }
    }
    return response;
  });
};

export const queryFromString = (query: string) => {
  const params = new URLSearchParams(query);
  const out: { [key: string]: string } = {};
  for (const [key, value] of params.entries()) {
    out[key] = value;
  }
  return out;
};

export const queryToString = (query: { [key: string]: string }) => {
  const params = new URLSearchParams();
  const paramKeys = keys(query);
  paramKeys.forEach(key => params.set(key, query[key]));
  return params.toString();
};

/**
 * combine reducers (like redux)
 */
export const combineReducers = <S extends { [key: string]: any }>(
  reducers: { [K in keyof S]: (state: S[K], action: Action) => S[K] }
): ((state: S, action?: Action) => S) => {
  const names = keys(reducers) as (keyof S)[];
  const initAction = init();

  return (state, action = initAction) => {
    return names.reduce((out, name) => {
      out[name] = reducers[name](out[name], action);
      return out;
    }, state || {});
  };
};

export const garbageCollect = () => {
  const timestamp = new RegExp(`^${STORAGE_PREFIX}.*:ts$`, 'g');
  const storageKeys = keys(storage).filter(k => timestamp.test(k));
  for (const key of storageKeys) {
    const cached = storage.getItem(key);
    let age = (Date.now() - Number(cached)) / 1000;
    if (age > 5 * 60) {
      storage.removeItem(key);
    }
  }
};

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const { round } = Math;

const plural = (n: number) => (n === 1 ? ' ago' : 's ago');
const _formatDate = (diff: number, div: number, text: string) => {
  const v = round(diff / MINUTE);
  return v + ' ' + text + plural(v);
};

export const formatDate = (d: number) => {
  const time = new Date(d * 1000);
  const now = new Date();
  const diff = now.getTime() - time.getTime();
  switch (true) {
    case diff > DAY:
      return _formatDate(diff, DAY, 'day');
    case diff > HOUR:
      return _formatDate(diff, HOUR, 'hour');
    case diff > MINUTE:
      return _formatDate(diff, MINUTE, 'minute');
    default: {
      return 'less than a minute ago';
    }
  }
};
