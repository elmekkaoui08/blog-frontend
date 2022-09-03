import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AppRouting} from "../../../../environments/appRouting";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formGroup: FormGroup;
  isSubmitted: boolean = false;
  isSending: boolean = false;
  constructor(private _authService: AuthService,
              private _formBuilder: FormBuilder,
              private _toastrService: ToastrService,
              private _router: Router) { }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }

  onSendResetLink(){
    this.isSending = true;
    this.isSubmitted = true;
    if(this.formGroup.valid){
      this._authService.sendResetPasswordLink(this.email.value).subscribe(data =>{
        this._toastrService.success(data['message']);
        this.isSending = false;
        this._router.navigateByUrl(AppRouting.auth.signIn)
      }, err =>{
        this.isSending = false;
        this._toastrService.error(err.error['message'])
      })
    }
  }

  get email(){
    return this.formGroup.get('email');
  }

}
