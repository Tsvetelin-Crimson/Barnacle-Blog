import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-card',
  templateUrl: './posts-card.component.html',
  styleUrls: ['./posts-card.component.scss']
})
export class PostsCardComponent implements OnInit {

  @Input()
  username!: string;
  @Input()
  postLink: string = '/';
  @Input()
  title!: string;
  @Input()
  category: string = 'Unknown category';

  constructor() { }

  ngOnInit(): void {
  }

}
