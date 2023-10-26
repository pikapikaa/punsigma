import {Word} from './Word';

export type Topic = {
  id: string;
  url: string;
  description: string;
  title: string;
  date: string;
  words: Word[];
};
