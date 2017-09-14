import { Action, init } from './actions';
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
    // I hope you didn't set it to 0 seconds
    expiry = options.seconds || expiry;
  }
  // Use the URL as the cache key to sessionStorage
  let cacheKey = `__innerself_news__${url}`;
  let cached = localStorage.getItem(cacheKey);
  let whenCached = localStorage.getItem(cacheKey + ':ts');
  if (cached !== null && whenCached !== null) {
    // it was in sessionStorage! Yay!
    // Even though 'whenCached' is a string, this operation
    // works because the minus sign converts the
    // string to an integer and it will work.
    let age = (Date.now() - Number(whenCached)) / 1000;
    if (age < expiry) {
      let response = new Response(new Blob([cached]));
      return Promise.resolve(response);
    } else {
      // We need to clean up this old key
      localStorage.removeItem(cacheKey);
      localStorage.removeItem(cacheKey + ':ts');
    }
  }

  return fetch(url, options).then(response => {
    // let's only store in cache if the content-type is
    // JSON or something non-binary
    if (response.status === 200) {
      let ct = response.headers.get('Content-Type');
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        // There is a .json() instead of .text() but
        // we're going to store it in sessionStorage as
        // string anyway.
        // If we don't clone the response, it will be
        // consumed by the time it's returned. This
        // way we're being un-intrusive.
        response
          .clone()
          .text()
          .then(content => {
            localStorage.setItem(cacheKey, content);
            localStorage.setItem(cacheKey + ':ts', Date.now().toString());
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
  const keys = Object.keys(query);
  keys.forEach(key => params.set(key, query[key]));
  return params.toString();
};

/**
 * combine reducers (like redux)
 */
export const combineReducers = <S extends { [key: string]: any }>(
  reducers: { [K in keyof S]: (state: S[K], action: Action) => S[K] }
): ((state: S, action?: Action) => S) => {
  const names = Object.keys(reducers) as (keyof S)[];
  const initAction = init();

  return (state, action = initAction) => {
    return names.reduce((out, name) => {
      out[name] = reducers[name](out[name], action);
      return out;
    }, state || {});
  };
};

export const garbageCollect = () => {
  const timestamp = /^__innerself_news__.*:ts$/g;
  const keys = Object.keys(localStorage).filter(k => timestamp.test(k));
  for (const key of keys) {
    const cached = localStorage.getItem(key);
    let age = (Date.now() - Number(cached)) / 1000;
    if (age > 5 * 60) {
      localStorage.removeItem(key);
    }
  }
};

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const { round } = Math;

const plural = (n: number) => (n === 1 ? ' ago' : 's ago');

export const formatDate = (d: number) => {
  const time = new Date(d * 1000);
  const now = new Date();
  const diff = now.getTime() - time.getTime();
  switch (true) {
    case diff > DAY: {
      const v = round(diff / DAY);
      return v + ' day' + plural(v);
    }
    case diff > HOUR: {
      const v = round(diff / HOUR);
      return v + ' hour' + plural(v);
    }
    case diff > MINUTE: {
      const v = round(diff / MINUTE);
      return round(diff / MINUTE) + ' minute' + plural(v);
    }
    default: {
      return 'less than a minute ago';
    }
  }
};
