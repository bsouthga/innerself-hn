import { RouteResult } from './router';

/**
 * https://github.com/HackerNews/API#items
 */
export type Item = {
  /**
   * item uid
   */
  id: number;
  /**
   * item is deleted
   */
  deleted: boolean;
};

export type Story = {
  url: string;
  title: string;
  score: number;
  by: string;
  descendants: number;
} & Item;

export type State = {
  stories?: Story[];
  router: RouteResult;
};
