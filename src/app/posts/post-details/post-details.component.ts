import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/common/services/user-service.service';
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

  post?: IPost;
  isAuthencticated = false;
  isOwner = false;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    
    this.postsService.getById(id)
    .subscribe(post => {
        this.post = post;
        this.isAuthencticated = this.userService.isAuthenticated;
      });

    this.userService.isPostOwner(id)
      .subscribe(isOwner => {
        this.isOwner = isOwner;
      })
  }

}
