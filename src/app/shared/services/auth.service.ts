import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import jwt_decode from "jwt-decode";
import {Router} from "@angular/router";
import {AppRouting} from "../../../environments/appRouting";
import {ToastrService} from "ngx-toastr";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdmin: boolean = false;
  isAuthor; boolean = false;
  isMember: boolean = false;

  constructor(private httpClient: HttpClient,
              private _router: Router,
              private _toastrService: ToastrService) { }

  onLogIn(credentials: {email: string, password: string}): Observable<number>{
    return this.httpClient.post(environment.api.auth.login, credentials).pipe(
      map(data =>{
        this.setTokensToLS({access_token: data['access'], refresh_token: data['refresh']});
        // this.tokenExpired(data['access']);
        return jwt_decode(data['access'])['user_id'];
      })
    );
  }

  signOut(){
    localStorage.clear();
    this._router.navigateByUrl(AppRouting.public.home);
  }

  isUserLoggedIn(){
    return !!localStorage.getItem('access_token');

  }

  tokenExpired(token: string) {
    const access_token = jwt_decode(token)
    const expiration_date = new Date(0);
    const now = new Date();
    expiration_date.setUTCSeconds(access_token['exp']);
    const expiresAt = Math.abs((expiration_date.getTime() - now.getTime()))
    console.log('Expire at: ', expiresAt);
    setTimeout(()=>{
      this._toastrService.info('Session expires')
      this.signOut();
    }, expiresAt)

  }

  setTokensToLS(tokens: {access_token: string, refresh_token: string}){
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('access_token', tokens.refresh_token);
  }

  getAccessTokenFromLS(){
    return localStorage.getItem('access_token');
  }

  getUserById(userId: number): Observable<UserModel>{
    return this.httpClient.get<UserModel>(environment.api.users.details+userId);
  }

  sendResetPasswordLink(email: string){
   return this.httpClient.post(environment.api.auth.forgotPassword, {email: email});
  }


  createUser(data: any){
    return this.httpClient.post(environment.api.auth.createUser, data);
  }

  getConnectedUser(): UserModel{
    return JSON.parse(localStorage.getItem('connectedUser'));
  }

  resetPassword(token: string, password: string){
    let data = {
      token: token,
      password: password
    }
    return this.httpClient.put(environment.api.auth.resetPassword, data);
  }

  getConnectedUserRole(){
    if(this.isUserLoggedIn())
      return JSON.parse(localStorage.getItem('connectedUser'))['role']['role_name'];

    return null;
  }
}
