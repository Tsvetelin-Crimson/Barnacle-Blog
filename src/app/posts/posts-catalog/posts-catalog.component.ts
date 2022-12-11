import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICategory } from '../models/category';
import { IPost } from '../models/post';
import { CategoryService } from '../services/category.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts-catalog',
  templateUrl: './posts-catalog.component.html',
  styleUrls: ['./posts-catalog.component.scss'],
  host: {
    class: 'host-element'
  }
})
export class PostsCatalogComponent {

  searchForm = this.fb.group({
    search: [''],
    searchOrder: ['asc'],
    category: [''],
  });

  posts: Observable<IPost[]>;
  categories: Observable<ICategory[]>;

  constructor(
    private postsService: PostsService,
    private categoryService: CategoryService,
    private fb: FormBuilder
    ) {
    this.posts = this.postsService.getAll('', '', '');
    this.categories = this.categoryService.getAllCategories();
  }

  updateFilter(): void {
    const search = this.searchForm.value.search;
    const searchOrder = this.searchForm.value.searchOrder;
    const categoryId = this.searchForm.value.category;

    this.posts = this.postsService.getAll(search, searchOrder, categoryId)
  }
}
