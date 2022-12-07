import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {

  recentPosts: IPost[] = [];
  popularPosts: IPost[] = [];

  constructor(
    private postService: PostsService,
    private userService: UserService,
  ) {
    this.postService.getPopular()
      .subscribe(posts => {
        console.log(posts);
        
        this.popularPosts = posts;        
      })

    this.postService.getRecent()
      .subscribe(posts => {
        console.log(posts);
        this.recentPosts = posts;
      })
  }

  ngOnInit(): void {
  }

}
