import { dispatch } from './';
import { TOP_SUBMISSION_REQUEST, topSubmissionsSuccess } from './submissions';
import { Item } from './item';
import { cachedFetch } from './util';

const API_BASE = 'https://hacker-news.firebaseio.com/v0/';

export function json<T = any>(
  endpoint: string,
  parameters: { [key: string]: string } = {}
) {
  const params = new URLSearchParams();
  Object.keys(parameters).forEach(key => params.set(key, parameters[key]));
  const url = `${API_BASE}/${endpoint}.json?${params.toString()}`;
  return cachedFetch(url).then(result => result.json() as Promise<T>);
}

export function item<T extends Item>(id: number) {
  return json<T>(`item/${id}`);
}

export function top(n = 10) {
  return json<number[]>('topstories').then(ids =>
    Promise.all(ids.slice(0, n).map(id => item<Item>(id)))
  );
}
