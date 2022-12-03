import { Component, OnInit } from '@angular/core';
import { IPost } from '../posts/models/post';
import { PostsService } from '../posts/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    class: 'host-element'
  }
})
export class HomeComponent implements OnInit {

  recentPosts: IPost[] = [];
  popularPosts: IPost[] = [];

  constructor(
    private postService: PostsService
  ) {
    this.postService.getPopularPosts()
      .subscribe(posts => {
        this.popularPosts = posts;
      })

    this.postService.getRecentPosts()
      .subscribe(posts => {
        this.recentPosts = posts;
      })
  }

  ngOnInit(): void {
  }

}
