import { Component, OnInit } from '@angular/core';
import {CommonResponse} from "../../shared/utilities/common-response";
import {PostModel} from "../../shared/models/post.model";
import {PostsService} from "../../shared/services/posts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesService} from "../../shared/services/categories.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: CommonResponse<PostModel>;
  category: string = "All posts";
  constructor(private postService: PostsService,
              private _route: ActivatedRoute,
              private _categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.onLoadPosts();
    this._route.queryParams.subscribe(params => {
      console.log(params['category'])
      this.onLoadPosts(params['category'])
    })
  }

  onLoadPosts(category_id?: number){
    if(!category_id){
      this.postService.getAllPosts().subscribe(data => {
        this.posts = data;
      });
    }else{
      this.postService.getPostsByCategory(category_id).subscribe(data => {
        this.posts = data;
      });
      this.getCategoryById(category_id);
    }

  }

  getCategoryById(category_id: number){
    this._categoryService.getCategoryById(category_id).subscribe(data => {
      console.log(data)
      this.category = data['category_name'];
    })
  }



}
