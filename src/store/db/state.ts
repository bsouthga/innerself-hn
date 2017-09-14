import { Item, User } from '../hn-types';

export type DbState = {
  entities: {
    [key: string]: Item | void;
  };
  users: {
    [key: string]: User | void;
  };
};
