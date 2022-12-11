import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { endpoints } from 'src/constants/endpoints';
import { environment } from 'src/environments/environment';
import { IUser } from './models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userChange = new BehaviorSubject<IUser | null>(null);
  private userChange$ = this.userChange?.asObservable();

  isAuthenticated = false;
  constructor(private http: HttpClient) { }

  getJWTTokenString(): string | null {
    return localStorage.getItem('jwt');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');;
  }

  setLocalValue(name: string ,value: string): void {
    localStorage.setItem(name, value);
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

    return this.httpGet<boolean>(endpoints['validateToken'], token);
  }

  checkIsAdmin(): Observable<boolean> {
    const token = localStorage.getItem('jwt');
    if (token === null) {
      return of(false);
    }

    return this.httpGet<boolean>(endpoints['validateAdmin'], token)
  }

  isPostOwner(postId: string): Observable<boolean> {
    const token = localStorage.getItem('jwt');
    if (token == null) {
      return of(false);
    }

    const body = {
      postId
    };

    return this.httpPost<boolean>(endpoints['postOwnership'], body, token);
  }

  getAllUsers(): Observable<IUser[]> {
    const token = localStorage.getItem('jwt');
    if (token == null) {
      const emtpyArray: IUser[] = [];
      return of(emtpyArray);
    }

    return combineLatest([
      this.httpGet<IUser[]>(endpoints['users'], token),
      this.userChange$])
      .pipe(
        map(([users, changedUser]) => {
          if (changedUser !== null) {
            users.map(u => {
              if (changedUser?._id == u._id) {
                u.isBanned = changedUser.isBanned;
              }

              return users;
            });
          }

          return users;
        }),
      );
  }

  banUser(userToBanId: string): Observable<IUser | null> {
    const token = localStorage.getItem('jwt');
    if (token == null) {
      return of(null);
    }

    const body = { 
      userId: userToBanId 
    };

    return this.httpPost<IUser>(endpoints['banUser'], body, token);
  }

  unbanUser(userToUnbanId: string): Observable<IUser | null> {
    const token = localStorage.getItem('jwt');
    if (token == null) {
      return of(null);
    }

    return this.httpPost<IUser>(endpoints['unbanUser'], { userId: userToUnbanId }, token);
  }

  userChanged(user: IUser) {
    this.userChange.next(user);
  }

  private httpGet<T>(endpoint: string, bearerToken?: string): Observable<T> {
    return this.http
      .get<T>(`${environment.apiUrlBase}${endpoint}`, {
        headers: { 'bearer': bearerToken ?? '' }
      });
  }

  private httpPost<T>(endpoint: string, body: any, bearerToken?: string): Observable<T> {
    return this.http
      .post<T>(`${environment.apiUrlBase}${endpoint}`, body, {
        headers: { 'bearer': bearerToken ?? '' }
      });
  }
}
