import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import {environment} from "../../../environments/environment";
import {CommonResponse} from "../utilities/common-response";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  listUsersByType(userType: number){
    return this.httpClient.get<CommonResponse<UserModel>>(environment.api.users.list+'?user_type='+userType)
  }

  updateUser(user: any){
    return this.httpClient.put<UserModel>(environment.api.users.details+user.id, user);
  }

  createUser(user: any){
    return this.httpClient.post<UserModel>(environment.api.auth.createUser, user);
  }

  deleteUser(userId: number){
    return this.httpClient.delete(environment.api.users.deleteUser+userId);
  }


}
