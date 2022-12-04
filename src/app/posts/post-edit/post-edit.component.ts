import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../models/category';
import { IPost } from '../models/post';
import { CategoryService } from '../services/category.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
  host: {
    class: 'host-element'
  }
})
export class PostEditComponent implements OnInit {
  error = '';

  editedPost?: IPost;
  categories?: ICategory[];

  postForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    preview: ['', [Validators.maxLength(50)]],
    content: ['', [Validators.required, Validators.minLength(10)]],
    category: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostsService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.params['id'];
    this.postService
      .getById(postId)
      .subscribe(post => {
        this.editedPost = post;
        this.setPostFormProperties(post);
        if (this.categories !== undefined) {
          this.findSelectedCategory(post);
        }
      });

    this.categoryService
      .getAllCategories()
      .subscribe(categories => {
        this.categories = categories;
        
        if (this.editedPost != undefined) {
          this.findSelectedCategory(this.editedPost);
        }
      });
  }


  updatePost(): void {
    if (!this.postForm.valid) {
      return;
    }

    this.postService
      .updatePost(
        "" + this.editedPost?._id,
        "" + this.postForm.get('title')?.value,
        "" + this.postForm.get('preview')?.value,
        "" + this.postForm.get('content')?.value,
        "" + this.postForm.get('category')?.value,
        "" + localStorage.getItem('jwt'))
      .subscribe(_ => {
        this.router.navigateByUrl(`/post/details/${this.editedPost?._id}`)
      });
  }

  private setPostFormProperties(post: IPost) {
    this.postForm.get('title')?.setValue(post.title);
    this.postForm.get('preview')?.setValue(post.preview);
    this.postForm.get('content')?.setValue(post.content);
    this.postForm.get('category')?.setValue(post.category._id);
  }

  private findSelectedCategory(post: IPost) {
    this.categories
      ?.map(category => {
        if (category.value == post.category.value) {
          category.selected = true;
        }
        return category;
      });
  }
}
