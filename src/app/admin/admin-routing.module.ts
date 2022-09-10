import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ListAuthorsComponent} from "./author-management/list-authors/list-authors.component";
import {AdminComponent} from "./admin.component";

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
        path: 'list-authors',
        component: ListAuthorsComponent,
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
