import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { PostsService } from '../services/posts.service';

type stringArray = string[];

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  error = '';
  categories?: Observable<Category[]>;

  constructor(
    private postService: PostsService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    ) {
      this.categories = this.categoryService.getAllCategories();
     }

    postForm = this.fb.group({
      //  && postForm.get('title')?.value?.length < 5 min && titleElement.value.length > 50 max
      title: ['', Validators.required, Validators.minLength(5), Validators.maxLength(50)],
      //  && previewElement.value.length > 50 max
      preview: ['', Validators.maxLength(50)],
      //  && contentElement.value.length < 10
      content: ['', Validators.required, Validators.minLength(10)],
      category: ['' , Validators.required],
    });

  ngOnInit(): void {
  }

  createPost(): void {
    this.postForm.value.title;

    this.postService.createPost(
      "" + this.postForm.value.title,
      "" + this.postForm.value.preview,
      "" + this.postForm.value.content,
      "" + this.postForm.value.category,
      "" + localStorage.getItem('jwt'));
  }

}
