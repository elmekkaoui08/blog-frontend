import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SharedModule} from "../shared/shared.module";
import {SidemenuComponent} from "./sidemenu/sidemenu.component";
import {AdminRoutingModule} from "./admin-routing.module";
import { AdminHeaderComponent } from './admin-header/admin-header.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SidemenuComponent,
    AdminHeaderComponent,
  ],
  exports: [
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
