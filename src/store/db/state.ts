import { Item } from '../item';

export type DbState = {
  entities: {
    [key: string]: Item | void;
  };
};
