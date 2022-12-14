import { Component } from '@angular/core';
import { UserService } from '../common/services/user.service';
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
export class HomeComponent {

  recentPosts: IPost[] = [];
  popularPosts: IPost[] = [];

  constructor(
    private postService: PostsService,
  ) {
    this.postService.getPopular()
      .subscribe(posts => {
        this.popularPosts = posts;        
      })

    this.postService.getRecent()
      .subscribe(posts => {
        this.recentPosts = posts;
      })
  }
}
