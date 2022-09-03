import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { PostListComponent} from './posts/post-list/post-list.component';
import { HeaderComponent } from './header/header.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { AddEditPostComponent } from './posts/add-edit-post/add-edit-post.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';


@NgModule({
  declarations: [
    PostListComponent,
    HeaderComponent,
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AddEditPostComponent,
    ConfirmationModalComponent
  ],
  exports: [
    HeaderComponent,
    PostListComponent,
    AddEditPostComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class SharedModule { }
