/**
 * https://github.com/HackerNews/API#items
 */
export type Item = {
  id: number;
  deleted?: boolean;
  url?: string;
  title?: string;
  text?: string;
  score?: number;
  by?: string;
  descendants?: number;
  kids?: number[];
};
