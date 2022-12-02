import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../services/postsService';

type stringArray = string[];

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

  constructor(
    private postService: PostsService,
    private fb: FormBuilder
    ) { }

    // EXAMPLE
    postForm = this.fb.group({
      //  && postForm.get('title')?.value?.length < 5 && titleElement.value.length > 30
      title: ['', Validators.required],
      //  && previewElement.value.length > 30
      preview: ['', Validators.required, Validators.email],
      //  && contentElement.value.length < 10
      content: ['', Validators.required],
      category: ['' , Validators.required],
    });

  ngOnInit(): void {
  }

  createPost(): void {

    this.postForm.value.title
    this.postService.createPost(
      "" + this.postForm.value.title,
      this.previewControl.value,
      "" + this.postForm.value.content,
      "" + this.postForm.value.category,
      "" + localStorage.getItem('jwt'));
  }

}
