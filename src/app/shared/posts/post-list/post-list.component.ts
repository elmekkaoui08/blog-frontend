import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostModel} from "../../models/post.model";
import {CommonResponse} from "../../utilities/common-response";
import {AuthService} from "../../services/auth.service";
import {AppRoles} from "../../models/role.model";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmationModalComponent,
  ConfirmDialogModel
} from "../../components/confirmation-modal/confirmation-modal.component";
import {PostsService} from "../../services/posts.service";
import {ToastrService} from "ngx-toastr";
import {errorMessages} from "../../../../environments/error-messages";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Output() editPost = new EventEmitter<PostModel>();
  @Input() posts: CommonResponse<PostModel>;
  @Input() category: string;
  isAuthor: boolean = false;
  constructor(public authService: AuthService,
              public dialog: MatDialog,
              private _postService: PostsService,
              private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.isAuthor = this.authService.getConnectedUserRole() == AppRoles.AUTHOR;
    console.log('service: ', this.authService.getConnectedUserRole(), ' AppRole', AppRoles.AUTHOR)
  }

  confirmDialog(post: PostModel): void {
    const dialogData = new ConfirmDialogModel("Deleting", 'Are you sure you want to delete this post');
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '500px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this._postService.deletePost(post.post_id).subscribe(value => {
          this.posts.results.splice(this.posts.results.indexOf(post), 1);
          this._toastr.success("Post deleted successfully")
        }, error => {
          this._toastr.error(errorMessages.SERVER_EXCEPTION_500)
        })
      }
    });
  }
}


