import {MemberModel} from './member.model';
import {ArticleModel} from './article.model';

export interface CommentModel{
  comment_id: number
  content: string
  image: any
  member: MemberModel
  article: ArticleModel

}
