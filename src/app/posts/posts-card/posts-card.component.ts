import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-card',
  templateUrl: './posts-card.component.html',
  styleUrls: ['./posts-card.component.scss']
})
export class PostsCardComponent implements OnInit {

  @Input()
  username?: string | null;
  @Input()
  postLink?: string | null = '/';
  @Input()
  title?: string | null;
  @Input()
  category?: string | null = 'Unknown category';
  @Input()
  preview?: string | null = '...';
  @Input()
  likes: number = 0;
  @Input()
  createdOn: Date | null = null;

  constructor() { }

  ngOnInit(): void {  }

}
