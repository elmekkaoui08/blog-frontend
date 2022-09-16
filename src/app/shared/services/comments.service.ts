import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CommentModel} from "../models/comment.model";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient) { }

  createComment(data: any){
    return this.httpClient.post(environment.api.comments.create, data);
  }

  listCommentByPost(post_id: number){
    return this.httpClient.get<CommentModel[]>(environment.api.comments.list+'?post_id='+post_id);
  }
}
