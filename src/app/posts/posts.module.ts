import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsCardComponent } from './posts-card/posts-card.component';
import { PostsCatalogComponent } from './posts-catalog/posts-catalog.component';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from '../globalGuards/is-logged-in.guard';
import { PostCreateComponent } from './post-create/post-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'catalog',
    canActivate: [IsLoggedInGuard],
    component: PostsCatalogComponent,
  },
];

@NgModule({
  declarations: [
    PostsCardComponent,
    PostsCatalogComponent,
    PostCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    PostsCatalogComponent
  ]
})
export class PostsModule { }
