import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonResponse} from "../utilities/common-response";
import {CategoryModel} from "../models/category.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  getListCategories(){
    return this.httpClient.get<CommonResponse<CategoryModel>>(environment.api.categories.list);
  }

  getCategoryById(category_id: number){
    return this.httpClient.get(environment.api.categories.details+category_id);
  }
}
