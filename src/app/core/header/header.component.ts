import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  isAuthenticated: boolean = false;
  username: string | null = null;
  constructor(
    private userService: UserService,
    private router: Router) {
   }
  ngOnInit(): void {
    this.username = this.userService.getUsername();
  }

  logOut(): void{
    this.userService.logOut();
    this.router.navigateByUrl('/');
  }

}
