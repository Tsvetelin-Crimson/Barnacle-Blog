import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { enpoints } from 'src/constants/endpoints';
import { environment } from 'src/environments/environment';
import { ICategory } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<ICategory[]> {
    return this.http
      .get<ICategory[]>(`${environment.apiUrlBase}${enpoints['categories']}`)
      .pipe(
        tap(categories => console.log(categories)),
        catchError(err => {
            console.log(err);
            return EMPTY;
        })
  );
  }

}
