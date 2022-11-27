import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, from, map, switchMap } from 'rxjs';
import { UserService } from './common/services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Barnacle-Blog';

  isAuthenticated = false;
  constructor(
    private userService: UserService,
    private router: Router
    ) {
    this.router.events
    .pipe(
      switchMap(_ => this.userService.checkAuthentication()),
      catchError(_ =>
        {
          return from([false]);
        })
    )
    .subscribe(route => {
      this.isAuthenticated = route;
    });
  }
}
