import { Component, OnInit } from '@angular/core';
import { IPost } from '../models/post';
import { PostsService } from '../services/postsService';

@Component({
  selector: 'app-posts-catalog',
  templateUrl: './posts-catalog.component.html',
  styleUrls: ['./posts-catalog.component.scss']
})
export class PostsCatalogComponent implements OnInit {

  posts: IPost[] | null = null;
  
  constructor(private postsService: PostsService) {
    this.posts = this.postsService.getPosts();
   }

  ngOnInit(): void {
  }

}
