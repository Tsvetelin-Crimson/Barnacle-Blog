import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, from, map, switchMap } from 'rxjs';
import { AuthService } from './authentication/services/auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Barnacle-Blog';

  isAuthenticated = false;
  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    this.router.events
    .pipe(
      switchMap(_ => this.authService.checkAuthentication()),
      catchError(_ =>
        {
          return from([false]);
        })
      // switchMap(value => )
    )
    .subscribe(route => {
      this.isAuthenticated = route;
    });
  }

  checkAuthentication(): void {
    this.authService.checkAuthentication()
    .subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    })
   }
}
