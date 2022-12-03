import { Component, OnInit } from '@angular/core';
import { IPost } from '../models/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts-catalog',
  templateUrl: './posts-catalog.component.html',
  styleUrls: ['./posts-catalog.component.scss']
})
export class PostsCatalogComponent implements OnInit {

  posts: IPost[] | null = null; // TODO: replace with Observable<IPost[]>

  constructor(private postsService: PostsService) {
    this.postsService.getPosts()
      .subscribe(posts => {
        console.log(posts);

        this.posts = posts;
      });
   }

  ngOnInit(): void {
  }

}
