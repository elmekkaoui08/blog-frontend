import {Component, OnInit, TemplateRef} from '@angular/core';
import {CommonResponse} from "../../../shared/utilities/common-response";
import {UserModel} from "../../../shared/models/user.model";
import {UsersService} from "../../../shared/services/users.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthorModel} from "../../../shared/models/author.model";
import {ToastrService} from "ngx-toastr";
import {errorMessages} from "../../../../environments/error-messages";

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: ['./list-authors.component.scss']
})
export class ListAuthorsComponent implements OnInit {

  addEditForm: FormGroup;
  isSubmitted: boolean = false;
  isSubmitting: boolean = false;
  isUpdate: boolean = false;
  modalRef: BsModalRef;
  authors: CommonResponse<UserModel>;
  selectedUser: UserModel;
  constructor(private usersService:  UsersService,
              private _formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.initAddEditForm();
    this.onLoadListUsers();
  }


  onLoadListUsers(){
    this.usersService.listUsersByType(2).subscribe(value => {
      this.authors = value;
    })
  }


  onEditAuthor(modal: TemplateRef<any>, user: UserModel){
    this.isUpdate = true;
    this.addEditForm.patchValue({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      date_of_birth: user.date_of_birth,
      phone: user.phone,
      email: user.email
    });
    // this.email.disable();

    this.openModal(modal, 'modal-lg', user);
  }

  openModal(modalTemplate: TemplateRef<any>,modalSize: string, user: UserModel) {

    this.selectedUser = user;
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered '+modalSize,
        // backdrop: 'static',
        // keyboard: true
      }
    );
  }

  closeModal(){
    this.isUpdate = false;
    this.isSubmitted = false;
    this.isSubmitting = false;
    this.selectedUser = null;
    this.addEditForm.reset();
    this.initAddEditForm();
    this.modalRef.hide();
  }


  onUpdateAddAuthor(){
    this.isSubmitted = true;
    this.isSubmitting = true;
    if(this.addEditForm.valid){
      if(this.isUpdate){

        this.usersService.updateUser(this.addEditForm.value).subscribe(value => {
          this.authors.results.splice(this.authors.results.indexOf(this.selectedUser), 1);
          this.authors.results.push(value);
          this.toastrService.success('Author updated successfully');
          this.closeModal();
        }, error => {
          this.toastrService.error(errorMessages.SERVER_EXCEPTION_500);
          this.isSubmitting = false;
        })
      }else{
        this.usersService.createUser(this.addEditForm.value).subscribe(value => {
          this.toastrService.success('Author created successfully');
          this.authors.results.push(value);
          this.closeModal();
        }, error => {
          this.isSubmitting = false;
          if(error.status === 409)
            this.toastrService.error(errorMessages.ALREADY_EXISTS_409);
          else
            this.toastrService.error(errorMessages.SERVER_EXCEPTION_500)
        })
      }
    }else{
      this.isSubmitting = false;
    }
  }

  onDeleteUser(){
    this.usersService.deleteUser(this.selectedUser.id).subscribe(value => {
      this.toastrService.success('User deleted successfully');
      this.authors.results.splice(this.authors.results.indexOf(this.selectedUser), 1)
      this.closeModal();
    }, error => {
      this.toastrService.error(errorMessages.SERVER_EXCEPTION_500)
    })
  }

  initAddEditForm(){
    this.addEditForm = this._formBuilder.group({
      id: [],
      first_name: ['', [Validators.required, Validators.minLength(5)]],
      last_name: ['', [Validators.required, Validators.minLength(5)]],
      date_of_birth: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]],
      email: ['', [Validators.required, Validators.email]],
      role_id: 2,
    })
  }

  get first_name(){
    return this.addEditForm.get('first_name')
  }
  get last_name(){
    return this.addEditForm.get('last_name')
  }
  get date_of_birth(){
    return this.addEditForm.get('date_of_birth')
  }
  get phone(){
    return this.addEditForm.get('phone')
  }
  get email(){
    return this.addEditForm.get('email')
  }
}
