import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/common/services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  isAuthenticated = false;

  constructor(
    private userService: UserService,
    private router: Router) {
   }
  ngOnInit(): void {
  }

  logOut(): void{
    this.userService.logOut();
    this.router.navigateByUrl('/');
  }

}
