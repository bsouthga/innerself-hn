import { Item } from "../hn-types";

export interface DbState {
  entities: {
    [key: string]: Item | void;
  };
}
