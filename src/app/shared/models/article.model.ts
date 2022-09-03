import {CategoryModel} from './category.model';

export interface ArticleModel{
  article_id: number
  title: string
  content: string
  image: any
  nbr_likes: number
  created_at: Date
  category: CategoryModel
}
