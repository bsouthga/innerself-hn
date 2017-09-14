/**
 * https://github.com/HackerNews/API#items
 */
export type Item = Comment | Story | Job | Poll | PollOpt;

export type Comment = {
  type: 'comment';
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
};

export type Story = {
  type: 'story';
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  url: string;
};

export type Job = {
  type: 'job';
  by: string;
  id: number;
  score: number;
  text: string;
  time: number;
  title: number;
  url: number;
};

export type Poll = {
  type: 'poll';
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  parts: number[];
  score: number;
  text: string;
  time: number;
  title: string;
};

export type PollOpt = {
  type: 'pollopt';
  by: string;
  id: number;
  poll: number;
  score: number;
  text: string;
  time: number;
};

export type User = {
  id: string;
  karma: number;
  created: number;
  about?: string;
  delay?: number;
  submitted?: number[];
};
