import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ArticleModel} from "../models/article.model";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private httpClient: HttpClient) { }

  createArticle(article: any){
    return this.httpClient.post<ArticleModel>(environment.api.articles.create, article);
  }

  updateArticle(article: any){
    return this.httpClient.put<ArticleModel>(environment.api.articles.update+article.article_id, article);
  }
}
