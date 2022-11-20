import { HttpClient } from '@angular/common/http';
import { Token } from '../models/Token';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { enpoints } from 'src/constants/endpoints';

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
    // TODO: make api endpoints file
    // TODO: add error handling (pipe() with catch error)
    // maybe doing something like enpoints['login'].value would be better?
    return this.http.post<Token>(`${environment.apiUrlBase}${enpoints['login']}`, body);
  }

  register(username: string | null, email: string | null, password: string | null, repass: string | null): Observable<Token>{
    const body = {
      username,
      email,
      password,
      repass
    }
    // TODO: make api endpoints file
    // TODO: add error handling (pipe() with catch error)
    // maybe doing something like enpoints['login'].value would be better?
    return this.http.post<Token>(`${environment.apiUrlBase}${enpoints['register']}`, body);
  }
}
