import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from 'src/app/common/services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class IsPostOwnerGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
    ) {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const postId = route.params['id'];
    return this.userService.isPostOwner(postId)
      .pipe(
        tap(isOwner => {
          if (!isOwner) {
            this.router.navigateByUrl('403');
          }
        })
      );
  }
  
}
