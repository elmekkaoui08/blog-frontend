import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SidemenuComponent} from "./sidemenu/sidemenu.component";
import {AdminRoutingModule} from "./admin-routing.module";
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { ListAuthorsComponent } from './author-management/list-authors/list-authors.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {AdminComponent} from "./admin.component";
import {BsModalService, ModalModule} from "ngx-bootstrap/modal";




@NgModule({
  declarations: [
    DashboardComponent,
    SidemenuComponent,
    AdminHeaderComponent,
    ListAuthorsComponent,
    AdminComponent,
  ],
  exports: [
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    ModalModule.forRoot(),
  ], providers:[BsModalService]
})
export class AdminModule { }
