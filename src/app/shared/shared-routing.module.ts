import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./authentication/sign-in/sign-in.component";
import {SignUpComponent} from "./authentication/sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./authentication/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./authentication/reset-password/reset-password.component";
import {PostDetailsComponent} from "./posts/post-details/post-details.component";

const routes: Routes = [
  {
    path: 'auth/sign-in',
    component: SignInComponent
  },
  {
    path: 'auth/sign-up',
    component: SignUpComponent
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'auth/reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'posts/:id',
    component: PostDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
