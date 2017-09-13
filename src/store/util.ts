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
 * Object.assign always with empty {}
 *
 * @param objs
 */
export const set: typeof Object.assign = (...objs: any[]) =>
  Object.assign({}, ...objs);

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
  let cacheKey = url;
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
