import { HttpClient } from '@angular/common/http';
import { Token } from '../models/Token';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string | null, password: string | null): Observable<Token>{
    const body = {
      username,
      password
    }

    return this.http.post<Token>(`${environment.apiUrlBase}${endpoints['login']}`, body);
  }

  register(username: string | null, email: string | null, password: string | null, repass: string | null): Observable<Token>{
    const body = {
      username,
      email,
      password,
      repass
    }
    
    return this.http.post<Token>(`${environment.apiUrlBase}${endpoints['register']}`, body);
  }

}
