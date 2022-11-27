import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PostsService } from '../services/postsService';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  error = '';
  titleControl = new FormControl<string>('', Validators.required);
  previewControl = new FormControl<string>('');
  contentControl = new FormControl<string>('', Validators.required);
  categoryControl = new FormControl<number>(0, Validators.required);

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
  }

  createPost($event: MouseEvent): void {
    $event.preventDefault();

    this.postService.createPost(
      "" + this.titleControl.value,
      this.previewControl.value,
      "" + this.contentControl.value,
      "" + this.categoryControl.value,
      "" + localStorage.getItem('username'));
  }

}
