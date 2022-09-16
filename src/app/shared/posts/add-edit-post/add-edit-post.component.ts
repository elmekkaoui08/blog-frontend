import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonResponse} from "../../utilities/common-response";
import {CategoryModel} from "../../models/category.model";
import {CategoriesService} from "../../services/categories.service";
import {PostModel} from "../../models/post.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArticlesService} from "../../services/articles.service";
import {ArticleModel} from "../../models/article.model";
import {ToastrService} from "ngx-toastr";
import {errorMessages} from "../../../../environments/error-messages";
import {AuthService} from "../../services/auth.service";
import {UtilitiesService} from "../../utilities/utilities.service";

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.component.html',
  styleUrls: ['./add-edit-post.component.scss']
})
export class AddEditPostComponent implements OnInit {

  @Input() isUpdatePost: boolean;
  @Input() selectedPost: PostModel;
  @Output() onAddEditPostSuccess = new EventEmitter<void>();
  categories: CommonResponse<CategoryModel>;
  postFormGroup: FormGroup;
  isSubmitted:boolean = false;

  constructor(private categoryService: CategoriesService,
              private _formBuilder: FormBuilder,
              private _articleService: ArticlesService,
              private _authService: AuthService,
              private _toastr: ToastrService,
              private utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
    this.onLoadCategories()
    this.initPostFormGroup();
    if(this.isUpdatePost){
      this.postFormGroup.patchValue({
        article_id: this.selectedPost.article.article_id,
        title: this.selectedPost.article.title,
        image: this.selectedPost.article.image,
        content: this.selectedPost.article.content,
        category_id: this.selectedPost.article.category.category_id
      })
    }
  }

  initPostFormGroup(){
    this.postFormGroup = this._formBuilder.group({
      article_id:this.isUpdatePost ? [this.selectedPost.article.article_id]: [],
      user_id: this._authService.getConnectedUser().id,
      title:['', Validators.required],
      image_name: ['', Validators.required],
      category_id: [1, Validators.required],
      content: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  onSubmitPost(){
    this.isSubmitted = true;
    if(this.postFormGroup.valid){
      if(this.isUpdatePost){
        this._articleService.updateArticle(this.postFormGroup.value).subscribe(data => {
          this.onAddEditPostSuccess.emit();
          this._toastr.success('Post updated successfully')
        }, error => {
          this._toastr.error(errorMessages.SERVER_EXCEPTION_500)
        })
      }else{
        this._articleService.createArticle(this.postFormGroup.value).subscribe(data => {
          this.onAddEditPostSuccess.emit();;
          this._toastr.success('Post created successfully')
        }, error => {
          this._toastr.error(errorMessages.SERVER_EXCEPTION_500)
        })
      }
    }
  }

  onLoadCategories(){
    this.categoryService.getListCategories().subscribe(data => {
      this.categories = data
    })
  }

  handleFileSelect(evt){
    let files = evt.target.files;
    let file = files[0];

    if (files && file) {
      // this.image.setValue('');
      let reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }



  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    // this.base64textString= btoa(binaryString);
    this.postFormGroup.patchValue({
      image: btoa(binaryString)
    })
  }

  get title(){
    return this.postFormGroup.get('title');
  }
   get image_name(){
    return this.postFormGroup.get('image_name');
  }
   get category_id(){
    return this.postFormGroup.get('category_id');
  }
   get content(){
    return this.postFormGroup.get('content');
  }

}
