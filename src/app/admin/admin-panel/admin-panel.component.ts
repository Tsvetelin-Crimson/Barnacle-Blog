import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/User';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  users: IUser[] = [{
    username: 'bob',
    isBanned: true,
  },
  {
    username: 'Jake',
    isBanned: false,
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
