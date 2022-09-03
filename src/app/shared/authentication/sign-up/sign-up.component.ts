import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import Stepper from "bs-stepper";
import {Router} from "@angular/router";
import {AppRouting} from "../../../../environments/appRouting";
import {errorMessages} from "../../../../environments/error-messages";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  isSubmitted: boolean = false;
  isSubmitting: boolean = false;

  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _router: Router,
              private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.initSignUpForm();
  }

  initSignUpForm(){
    this.signUpForm = this._formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(5)]],
      last_name: ['', [Validators.required, Validators.minLength(5)]],
      date_of_birth: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
      role_id: 3,
    })
  }

  onSigUp(){
    this.isSubmitted = true;
    if(this.password.value != this.confirm_password.value){
      this.confirm_password.setErrors({'notMatch': true});
      console.log('form is invalid')
    }else{
      if(this.signUpForm.valid){
        this.isSubmitting = true;
        this._authService.createUser(this.signUpForm.value).subscribe(data =>{
          this.isSubmitting = false;
          this._toastrService.success('Account created successfully')
          this._router.navigateByUrl(AppRouting.auth.signIn);
        }, err => {
          this.isSubmitting = false;
          if(err.status === 409)
            this._toastrService.error(errorMessages.ALREADY_EXISTS_409);
          else
            this._toastrService.error(errorMessages.SERVER_EXCEPTION_500)
        })
      }
    }

  }

  get first_name(){
    return this.signUpForm.get('first_name')
  }
  get last_name(){
    return this.signUpForm.get('last_name')
  }
  get date_of_birth(){
    return this.signUpForm.get('date_of_birth')
  }
  get phone(){
    return this.signUpForm.get('phone')
  }
  get email(){
    return this.signUpForm.get('email')
  }
  get password(){
    return this.signUpForm.get('password')
  }
 get confirm_password(){
    return this.signUpForm.get('confirm_password')
  }

}
