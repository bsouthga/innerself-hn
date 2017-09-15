import { dispatch } from './';
import {
  TOP_SUBMISSION_REQUEST,
  topSubmissionsSuccess,
  TopRequestType
} from './submissions';
import { Item, User } from './hn-types';
import { cachedFetch } from './util';

const API_BASE = 'https://hacker-news.firebaseio.com/v0/';

export const json = <T = any>(
  endpoint: string,
  parameters: { [key: string]: string } = {}
) => {
  const params = new URLSearchParams();
  Object.keys(parameters).forEach(key => params.set(key, parameters[key]));
  const url = `${API_BASE}/${endpoint}.json?${params.toString()}`;
  return cachedFetch(url).then(result => result.json() as Promise<T>);
};

export const items = <T extends Item>(ids: number[]) =>
  Promise.all(ids.map(id => json<T>(`item/${id}`)));

export const top = (type: TopRequestType, n = 20) =>
  json<number[]>(type + 'stories').then(ids => items<Item>(ids.slice(0, n)));

export const user = (id: string | number) => json<User>(`user/${id}`);
