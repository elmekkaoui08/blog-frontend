import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorHeaderComponent } from './header/author-header.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    AuthorHeaderComponent,
    SidemenuComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    SharedModule
  ]
})
export class AuthorModule { }
