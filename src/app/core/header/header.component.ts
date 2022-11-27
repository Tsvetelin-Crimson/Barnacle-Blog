import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router) {
   }
  ngOnInit(): void {
  }

  logOut(): void{
    this.authService.logOut();
    this.router.navigateByUrl('/');
  }

}
