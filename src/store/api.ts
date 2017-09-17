import { Item, User } from './hn-types';
import { TopRequestType } from './submissions';
import { cachedFetch, keys, set } from './util';

const API_BASE = 'https://hacker-news.firebaseio.com/v0/';

export const json = <T = any>(
  endpoint: string,
  parameters: { [key: string]: string } = {}
) => {
  const params = new URLSearchParams();
  keys(parameters).forEach(key => params.set(key, parameters[key]));
  const url = `${API_BASE}/${endpoint}.json?${params}`;
  return cachedFetch(url).then(result => result.json() as Promise<T>);
};

export const requestItems = <T extends Item>(ids: number[]) =>
  Promise.all(ids.map(id => json<T>(`item/${id}`)));

export const requestTop = (type: TopRequestType, n = 20) =>
  json<number[]>((type || 'top') + 'stories');

export const requestUser = (id: string | number) =>
  json<User>(`user/${id}`).then(u => set(u, { type: 'user' }) as User);
