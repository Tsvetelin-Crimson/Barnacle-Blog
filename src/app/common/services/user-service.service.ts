import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { enpoints } from 'src/constants/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  
  logOut(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
  }

  checkAuthentication(): Observable<boolean> {
    const token = localStorage.getItem('jwt');
    if (token === null) {
      return of(false);
    }
    return this.http.post<boolean>(`${environment.apiUrlBase}${enpoints['validateToken']}`, {token})
  }
}
