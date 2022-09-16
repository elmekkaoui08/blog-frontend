import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {errorMessages} from "../../../../environments/error-messages";
import {AppRouting} from "../../../../environments/appRouting";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetForm: FormGroup;
  private token: string;
  public formGroup: FormGroup;
  public isSubmitted: boolean = false;
  public isNewPassword: boolean = false;
  public readonly AppRouting = AppRouting;
  constructor(private authService: AuthService,
              private _toastrService: ToastrService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(this._router.url.includes('new-password'))
      this.isNewPassword = true;

    this.token = this._route.snapshot.queryParams['token'];
    this.formGroup = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  onResetPassword(){
    this.isSubmitted = true;
    if(this.formGroup.valid){
      if(this.password.value != this.confirmPassword.value){
        this.confirmPassword.setErrors({'match': true});
      }else{
        this.authService.resetPassword(this.token, this.password.value).subscribe(data => {
          this._toastrService.success(data['message']);
          this._router.navigateByUrl(AppRouting.auth.signIn)
        }, err => {
          if(err.status == 410){
            this._router.navigateByUrl(AppRouting.auth.forgotPassword);
            this._toastrService.error(err.error.message);
          }else if(err.status == 404){
            this._toastrService.error(err.error.message)
          }else{
            this._toastrService.error(errorMessages.SERVER_EXCEPTION_500)
          }
        });
      }
    }

  }

  get password() {
    return this.formGroup.get('password')
  }

  get confirmPassword(){
    return this.formGroup.get('confirmPassword')
  }

}
