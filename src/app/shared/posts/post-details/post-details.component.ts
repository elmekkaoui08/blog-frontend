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
import {DomSanitizer} from "@angular/platform-browser";
import {CommentModel} from "../../models/comment.model";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post_id: number;
  post: PostModel;
  comments: CommentModel[];
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
              private sanitizer: DomSanitizer
) { }

  ngOnInit(): void {
    this.post_id = +this._route.snapshot.paramMap.get('id');
    // this.getPostDetails(this.post_id);
    this.getLatestPost();

    this._route.paramMap.subscribe(paramsAsMap => {
      this.post_id = +paramsAsMap['params']['id']
      this.getPostDetails(this.post_id);
      this.onLoadListComments(this.post_id);
    });

    this.commentForm = this.formBuilder.group({
      user_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      post_id: [this.post_id],
      comment: ['', [Validators.required]]
    })
  }

  onAddComment(){
    console.log('Adding comment')
    this.submitted = true;
    if(this.commentForm.valid){
      this.commentForm.patchValue({
        user_id: this.authService.getConnectedUser().id,
        article_id: this.post.article.article_id,
      })
      this.commentService.createComment(this.commentForm.value).subscribe(value => {
      this.comments.push(this.commentForm.value);
      this.commentForm.reset();
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

  onLoadListComments(post_id: number){
    this.commentService.listCommentByPost(post_id).subscribe(value => {
      console.log(value);
      this.comments = value;
    })
  }

  getLatestPost(){
    this.postService.getAllPosts().subscribe(value => {
      this.latestPosts = value;
    }, error => {
      this.toastrService.error(errorMessages.SERVER_EXCEPTION_500)
    })
  }

  getImage(image) {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+image);
  }
}
