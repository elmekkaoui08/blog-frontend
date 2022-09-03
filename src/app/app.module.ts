import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './public/home/home.component';
import {SharedModule} from "./shared/shared.module";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FeaturedPostComponent } from './shared/posts/featured-post/featured-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeaturedPostComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
