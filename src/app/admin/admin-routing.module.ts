import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ListAuthorsComponent} from "./users-management/list-authors/list-authors.component";
import {AdminComponent} from "./admin.component";
import {ListAdminsComponent} from "./users-management/list-admins/list-admins.component";
import {ListMembersComponent} from "./users-management/list-members/list-members.component";

const routes: Routes = [
  {
    path:'',
    component: AdminComponent,
    children:[
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'list-admins',
        component: ListAdminsComponent,
      },
      {
        path: 'list-authors',
        component: ListAuthorsComponent,
      },
      {
        path: 'list-members',
        component: ListMembersComponent,
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
