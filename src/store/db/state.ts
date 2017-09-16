import { Item, User } from '../hn-types';

export interface DbState {
  entities: {
    [key: string]: Item | void;
  };
  users: {
    [key: string]: User | void;
  };
}
