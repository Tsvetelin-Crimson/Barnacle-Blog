import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, of, pipe } from 'rxjs';
import { UserService } from 'src/app/common/services/user.service';
import { IPost } from '../models/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  host: {
    class: 'host-element'
  }
})
export class PostDetailsComponent implements OnInit {

  error = '';
  post?: IPost;
  isAuthencticated = false;
  isOwner = false;
  // easier solution than making an action stream TODO: should be changed to action stream
  hideLikeButton = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    
    this.postsService.getById(id)
      .subscribe(post => {
          this.post = post;
          this.isAuthencticated = this.userService.isAuthenticated;

          this.userService.isPostOwner(id)
            .subscribe(isOwner => {
              this.isOwner = isOwner;
            });
        });
  }

  deletePost() {
    this.postsService
      .deletePost("" + this.post?._id)
      .subscribe(_ => {
        this.router.navigateByUrl('home');
      });
  }

  likePost() {
    this.postsService
      .likePost("" + this.post?._id)
      .pipe(
        catchError(err => {
          console.log(err);
          this.error = err.error.error;
          return of(false);
        })
      )
      .subscribe(hasSucceded => {
        if (hasSucceded && this.post !== undefined) {
            this.post.hasLiked = true;
            this.post.likes++;
        }
      });
  }

  unLikePost() {
    this.postsService
      .unLikePost("" + this.post?._id)
      .pipe(
        catchError(err => {
          this.error = err.error.error;
          return of(false);
        })
      )
      .subscribe(hasSucceded => {
        if (hasSucceded && this.post !== undefined) {
            this.post.hasLiked = false;
            this.post.likes--;
        }
      });
  }
}
