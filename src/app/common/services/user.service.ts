import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { enpoints } from 'src/constants/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  isAuthenticated = false;
  constructor(private http: HttpClient) { }

  getUsername(): string | null {
    const username = localStorage.getItem('username');
    return username;
  }
  
  logOut(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
  }

  checkAuthentication(): Observable<boolean> {
    const token = localStorage.getItem('jwt');
    if (token === null) {
      return of(false);
    }
    return this.http
      .post<boolean>(`${environment.apiUrlBase}${enpoints['validateToken']}`, {token})
  }

  isPostOwner(postId: string): Observable<boolean> {
    if(!this.isAuthenticated) {
      return of(false);
    }
    const jwtToken = localStorage.getItem('jwt');

    const body = {
      jwtToken,
      postId
    };
    return this.http
      .post<boolean>(`${environment.apiUrlBase}${enpoints['postOwnership']}`, body);
  }
}
