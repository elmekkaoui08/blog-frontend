import {MemberModel} from './member.model';
import {ArticleModel} from './article.model';

export interface LikeModel{
  like_id: number
  is_like: boolean
  member: MemberModel
  article: ArticleModel
}
