import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from '../models/category';
import { CategoryService } from '../services/category.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
  host: {
    class: 'host-element'
  }
})
export class PostCreateComponent {

  error = '';
  categories?: ICategory[];

  constructor(
    private postService: PostsService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.categoryService.getAllCategories()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  postForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    preview: ['', [Validators.maxLength(50)]],
    content: ['', [Validators.required, Validators.minLength(10)]],
    category: ['', [Validators.required]],
  });

  createPost(): void {
    if (!this.postForm.valid) {
      return;
    }

    // this is hacky maybe change
    this.postService
      .createPost(
        "" + this.postForm.get('title')?.value,
        "" + this.postForm.get('preview')?.value,
        "" + this.postForm.get('content')?.value,
        "" + this.postForm.get('category')?.value)
      .subscribe(postId => {
        if (postId) {
          this.router.navigateByUrl('home');
        }
      });
  }

}
