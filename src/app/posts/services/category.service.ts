import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { UserService } from 'src/app/common/services/user.service';
import { endpoints } from 'src/constants/endpoints';
import { environment } from 'src/environments/environment';
import { ICategory } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
    ) { }

  getAllCategories(): Observable<ICategory[]> {
    return this.httpGet<ICategory[]>(endpoints['categories'])
      .pipe(
        catchError(err => {
            console.log(err);
            return EMPTY;
        })
  );
  }

  create(value: string): Observable<boolean> {
    const token = this.userService.getJWTTokenString();
    if (token == null) {
        this.router.navigateByUrl('login');
    }
    const body = {
      value
    }
    
    return this.httpPost<boolean>(endpoints['categoriesCreate'], body, token);
  }

  private httpGet<T>(endpoint: string, bearerToken?: string | null): Observable<T> {
    return this.http
        .get<T>(`${environment.apiUrlBase}${endpoint}`, {
            headers: { 'bearer': bearerToken ?? '' }
        });
}

private httpPost<T>(endpoint: string, body: any, bearerToken?: string | null): Observable<T> {
    return this.http
        .post<T>(`${environment.apiUrlBase}${endpoint}`, body, {
            headers: { 'bearer': bearerToken ?? '' }
        });
}
}
