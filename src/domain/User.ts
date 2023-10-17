import {UserPodcast} from './UserPodcast';

export type User = {
  id: string;
  name: string;
  email: string;
  dateOfBirth?: string | Date;
  bio?: string;
  podcasts?: UserPodcast[];
};
