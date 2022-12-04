import { Component } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { catchError, EMPTY, from, switchMap } from 'rxjs';
import { UserService } from './common/services/user.service';

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
      switchMap(route => 
        {
          // for some reason Scroll is the last event triggered not NavigationEnd
          if(route instanceof Scroll) {
            return this.userService.checkAuthentication();
          }
          
          return EMPTY;
        }),
      catchError(_ =>
        {
          return from([false]);
        })
    )
    .subscribe(authenticaded => {
      if (authenticaded !== null) {
        this.isAuthenticated = authenticaded;
        this.userService.isAuthenticated = authenticaded;
      }
    });
  }
}
