import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsCardComponent } from './posts-card/posts-card.component';
import { PostsCatalogComponent } from './posts-catalog/posts-catalog.component';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from '../globalGuards/is-logged-in.guard';
import { PostCreateComponent } from './post-create/post-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { IsPostOwnerGuard } from './guards/is-post-owner.guard';
import { LocalCommonModule } from '../common/common.module';
import { PostCategoryCreateComponent } from './post-category-create/post-category-create.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: PostsCatalogComponent,
  },
  {
    path: 'post/create',
    pathMatch: 'full',
    canActivate: [IsLoggedInGuard],
    component: PostCreateComponent,
  },
  {
    path: 'post/details/:id',
    component: PostDetailsComponent,
  },
  {
    path: 'post/edit/:id',
    canActivate: [IsLoggedInGuard, IsPostOwnerGuard],
    component: PostEditComponent,
  },
  {
    path: 'category/create',
    canActivate: [IsLoggedInGuard],
    component: PostCategoryCreateComponent,
  },
];

@NgModule({
  declarations: [
    PostsCardComponent,
    PostsCatalogComponent,
    PostCreateComponent,
    PostDetailsComponent,
    PostEditComponent,
    PostCategoryCreateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    LocalCommonModule,
  ],
  exports: [
    PostsCatalogComponent,
    PostsCardComponent,
  ]
})
export class PostsModule { }
