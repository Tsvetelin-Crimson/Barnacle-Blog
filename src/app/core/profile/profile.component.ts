import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { UserService } from 'src/app/common/services/user.service';
import { IPost } from 'src/app/posts/models/post';
import { PostsService } from 'src/app/posts/services/posts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  host: {
    class: 'host-element'
  }
})
export class ProfileComponent implements OnInit {
  username: string | null = '';
  posts: IPost[] = [];
  isAdmin = false;

  constructor(
    private userService: UserService,
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.username = this.userService.getUsername();
    this.postService.getCurrentUsersPosts() // could be done with reactive
      .subscribe(posts => {
        this.posts = posts;
      });
    
    this.userService.checkIsAdmin()
      .pipe(
        catchError(_ => {
          return of(false);
        })
      )
      .subscribe(isAdmin => {
        this.isAdmin = isAdmin;
      })
  }

}
