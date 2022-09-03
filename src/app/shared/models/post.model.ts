import {ArticleModel} from './article.model';
import {AuthorModel} from './author.model';

export interface PostModel{
  post_id: number
  post_date: Date
  article: ArticleModel
  author: AuthorModel
}
