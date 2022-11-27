import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsCardComponent } from './posts-card/posts-card.component';
import { PostsCatalogComponent } from './posts-catalog/posts-catalog.component';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from '../global guards/is-logged-in.guard';

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
    PostsCatalogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    PostsCatalogComponent
  ]
})
export class PostsModule { }
