import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PostsService } from '../services/postsService';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  error = '';
  titleControl = new FormControl<string>('');
  previewControl = new FormControl<string>('');
  contentControl = new FormControl<string>('');
  categoryControl = new FormControl<number>(0);

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
  }

  createPost($event: MouseEvent): void {
    $event.preventDefault();

    // TODO: actually implement this
    //this.postService.createPost();
  }

}
