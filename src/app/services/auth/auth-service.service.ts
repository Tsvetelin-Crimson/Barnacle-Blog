import { HttpClient } from '@angular/common/http';
import { Token } from './models/Token';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password:string): Observable<Token>{
    // TODO: make api endpoints file
    // TODO: add error handling (pipe() with catch error)
    return this.http.get<Token>(`${environment.apiUrlBase}auth/login`);
  }
}
