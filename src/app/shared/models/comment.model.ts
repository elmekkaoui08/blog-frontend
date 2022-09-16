import {MemberModel} from './member.model';
import {ArticleModel} from './article.model';

export interface CommentModel{
  comment_id: number
  comment: string
  user_name: string
  email: string
  post_id: number

}
