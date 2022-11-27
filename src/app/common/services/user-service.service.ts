import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enpoints } from 'src/constants/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  
  logOut(): void {
    localStorage.removeItem('jwt');
  }

  checkAuthentication(): Observable<boolean> {
    const token = localStorage.getItem('jwt');
    return this.http.post<boolean>(`${environment.apiUrlBase}${enpoints['validateToken']}`, {token})
  }
}
