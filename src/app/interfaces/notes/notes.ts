import { User } from '../auth/auth';

export interface Notes {
  _id: string;
  topic: string[];
  title: string;
  body: string;
  user: User;
}

export interface Note {
  title: string;
  body: string;
  topic: string[];
}
