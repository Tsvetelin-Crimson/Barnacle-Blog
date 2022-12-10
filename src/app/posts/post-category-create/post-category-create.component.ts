import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-post-category-create',
  templateUrl: './post-category-create.component.html',
  styleUrls: ['./post-category-create.component.scss']
})
export class PostCategoryCreateComponent implements OnInit {
  error = '';
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create(form: NgForm){
    const values: { categoryName: string } = form.value;
    
    this.categoryService.create(values.categoryName)
      .pipe(
        catchError(err => {
          this.error = err.error.error;
          return EMPTY;
        })
      )
      .subscribe(isSuccessful => {
        if (isSuccessful) {
          this.router.navigateByUrl('catalog')
        }
      })
  }
}
