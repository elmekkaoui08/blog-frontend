import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostsService} from "../../services/posts.service";
import {PostModel} from "../../models/post.model";
import {CommonResponse} from "../../utilities/common-response";
import {ToastrService} from "ngx-toastr";
import {errorMessages} from "../../../../environments/error-messages";
import {AppRouting} from "../../../../environments/appRouting";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CommentsService} from "../../services/comments.service";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post_id: number;
  post: PostModel;
  latestPosts: CommonResponse<PostModel>;
  readonly AppRouting = AppRouting;
  comment: string;
  commentForm: FormGroup;
  submitted: boolean = false;
  constructor(private router: Router,
              private _route: ActivatedRoute,
              private postService: PostsService,
              private toastrService: ToastrService,
              private authService: AuthService,
              private formBuilder:FormBuilder,
              private commentService: CommentsService,
) { }

  ngOnInit(): void {
    this.post_id = +this._route.snapshot.paramMap.get('id');
    // this.getPostDetails(this.post_id);
    this.getLatestPost();

    this._route.paramMap.subscribe(paramsAsMap => {
      this.post_id = +paramsAsMap['params']['id']
      this.getPostDetails(this.post_id)
    });

    this.commentForm = this.formBuilder.group({
      user_id: [],
      article_id: [],
      comment: ['', [Validators.required]]
    })
  }

  onAddComment(){
    this.submitted = true;
    if(this.commentForm.valid){
      this.commentForm.patchValue({
        user_id: this.authService.getConnectedUser().id,
        article_id: this.post.article.article_id,
      })
      this.commentService.createComment(this.commentForm.value).subscribe(value => {

      }, error => {
        this.toastrService.error(errorMessages.SERVER_EXCEPTION_500)
      })
    }else{
      console.log('Form invalid')
    }
  }

  getPostDetails(post_id: number){
    this.postService.getPostDetail(post_id).subscribe(post => {
      this.post = post;
    }, error => {
      this.toastrService.error(errorMessages.SERVER_EXCEPTION_500)
    })
  }


  getLatestPost(){
    this.postService.getAllPosts().subscribe(value => {
      this.latestPosts = value;
    }, error => {
      this.toastrService.error(errorMessages.SERVER_EXCEPTION_500)
    })
  }
}
