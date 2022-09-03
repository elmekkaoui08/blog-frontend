import {UserModel} from './user.model';

export interface AuthorModel{
  author_id: number
  nbr_of_posts: number
  user: UserModel
}
