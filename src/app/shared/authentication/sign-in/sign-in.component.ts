import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {errorMessages} from "../../../../environments/error-messages";
import {AppRoles} from "../../models/role.model";
import {Router} from "@angular/router";
import {AppRouting} from "../../../../environments/appRouting";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {


  signInFormGroup: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initSignInFormGroup()
  }

  initSignInFormGroup(){
    this.signInFormGroup = this._formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  onSignIn(){
    this.isSubmitted = true;
    if(this.signInFormGroup.valid){
      this._authService.onLogIn({email: this.email.value, password: this.password.value}).subscribe(data =>{
        this._authService.getUserById(data).subscribe(user=>{
          localStorage.setItem('connectedUser', JSON.stringify(user));
          this.navigateUser(user.role.role_name);
        }, error => {
          this._toastrService.error(errorMessages.USER_NOT_FOUND)
        })
      }, err =>{
        this._toastrService.error(errorMessages.INVALID_CREDENTIALS)

      })
    }
  }

  private navigateUser(role: string){
    console.log('User Role: ', role)
    switch (role){
      case AppRoles.ADMIN:
        this._router.navigateByUrl(AppRouting.admin.dashboard);
        break;
      case AppRoles.AUTHOR:
        this._router.navigateByUrl(AppRouting.author.dashboard);
        break;
      case AppRoles.MEMBER:
        this._router.navigateByUrl(AppRouting.public.home);
        break;
      default:
        this._router.navigateByUrl(AppRouting.public.home);
        break;
    }
  }

  get email() {
    return this.signInFormGroup.get('email');
  }

  get password(){
    return this.signInFormGroup.get('password')
  }

}
