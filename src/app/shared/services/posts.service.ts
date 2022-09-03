import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {PostModel} from "../models/post.model";
import {environment} from "../../../environments/environment";
import {CommonResponse} from "../utilities/common-response";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) { }

  getAllPosts(){
    return this.httpClient.get<CommonResponse<PostModel>>(environment.api.posts.list);
  }

  getPostsByAuthor(authorId: number){
    let params = new URLSearchParams();
    params.append("author_id", String(authorId))
    return this.httpClient.get<CommonResponse<PostModel>>(environment.api.posts.list);
  }

  getPostsByCategory(category_id: number){
    console.log('------------- Calling get posts by category ---------------')
    let params = new HttpParams();
    params.set("category_id", category_id)
    return this.httpClient.get<CommonResponse<PostModel>>(environment.api.posts.list+'?category_id='+category_id);
  }

  deletePost(post_id: number){
    return this.httpClient.delete(environment.api.posts.retrieveUpdateDelete+post_id);
  }
}
