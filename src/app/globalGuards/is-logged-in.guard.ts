import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../authentication/services/auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.checkAuthentication()
    .pipe(
      tap(value => {
        if (!value) {
          // TODO: redirect to 403 page?
          this.router.navigateByUrl('login')
        }
      })
    );
  }
  
}
