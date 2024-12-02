import { IPosts } from './PostsVM';

export interface BoxVM {
  name: string;
  creatorId: string;
  posts: IPosts[];
}
