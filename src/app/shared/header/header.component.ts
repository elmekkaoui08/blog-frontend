import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {CategoriesService} from "../services/categories.service";
import {CategoryModel} from "../models/category.model";
import {AppRouting} from "../../../environments/appRouting";
import {AppRoles} from "../models/role.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  categories: CategoryModel[];
  currentTime: Date = new Date()
  readonly AppRoles = AppRoles;
   connectedUserRole: string;
  readonly AppRouting = AppRouting;
  dashboard: string;
  constructor(public authService: AuthService,
              private _categoriesService: CategoriesService,
              private _router: Router) { }

  ngOnInit(): void {
    this.getListCategories();
    this.connectedUserRole = this.authService.getConnectedUserRole();
    switch (this.connectedUserRole){
      case AppRoles.ADMIN:
        this.dashboard = '/admin/dashboard'; break;
      case AppRoles.AUTHOR:
        this.dashboard = '/author/dashboard'; break;
      default: this.dashboard = '/auth/sign-in'; break;
    }
  }

  onNavigateUser(){
    switch (this.connectedUserRole){
      case AppRoles.ADMIN:
        this.dashboard = '/admin/dashboard';
        this._router.navigateByUrl(this.dashboard); break;
      case AppRoles.AUTHOR:
        this.dashboard = '/author/dashboard';
        this._router.navigateByUrl(this.dashboard); break;
      case AppRoles.MEMBER: this.authService.signOut(); break;
    }
  }

  getListCategories(){
    this._categoriesService.getListCategories().subscribe(data => {
      this.categories = data.results;
    })
  }


}
