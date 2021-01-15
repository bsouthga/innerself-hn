/**
 * https://github.com/HackerNews/API#items
 */
export type Item = Comment | Story | Job | Poll | PollOpt | User;

export interface Comment {
  type: "comment";
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
}

export interface Story {
  type: "story";
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  url: string;
  text?: string;
}

export interface Job {
  type: "job";
  by: string;
  id: number;
  score: number;
  text: string;
  time: number;
  title: number;
  url: number;
}

export interface Poll {
  type: "poll";
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  parts: number[];
  score: number;
  text: string;
  time: number;
  title: string;
}

export interface PollOpt {
  type: "pollopt";
  by: string;
  id: number;
  poll: number;
  score: number;
  text: string;
  time: number;
}

export interface User {
  type: "user";
  id: string;
  karma: number;
  created: number;
  about?: string;
  delay?: number;
  submitted?: number[];
}
