import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsCardComponent } from './posts-card/posts-card.component';
import { PostsCatalogComponent } from './posts-catalog/posts-catalog.component';



@NgModule({
  declarations: [
    PostsCardComponent,
    PostsCatalogComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PostsCatalogComponent
  ]
})
export class PostsModule { }
