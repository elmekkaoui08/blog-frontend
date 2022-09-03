import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../shared/services/posts.service";
import {AuthService} from "../../shared/services/auth.service";
import {CommonResponse} from "../../shared/utilities/common-response";
import {PostModel} from "../../shared/models/post.model";
import {ArticleModel} from "../../shared/models/article.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isAddingPost: boolean = false;
  authorPosts: CommonResponse<PostModel>;
  isUpdatePost: boolean = false;
  selectedPost: PostModel;
  constructor(private postService: PostsService, public authService: AuthService) { }

  ngOnInit(): void {
    this.getAuthorPosts();
  }

  getAuthorPosts(){
    this.postService.getPostsByAuthor(this.authService.getConnectedUser().id).subscribe(data => {
      this.authorPosts = data;
      console.log(data)
    })
  }

  onEditPost(post: PostModel){
    this.isAddingPost = true;
    this.isUpdatePost = true;
    this.selectedPost = post;
  }

  onAddEditPostSuccess(){
    this.isUpdatePost = false;
    this.isAddingPost = false;
    this.getAuthorPosts();
  }
}
