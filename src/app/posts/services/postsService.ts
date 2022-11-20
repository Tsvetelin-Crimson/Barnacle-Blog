import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, EMPTY, Observable } from "rxjs";
import { enpoints } from "src/constants/endpoints";
import { environment } from "src/environments/environment";
import { IPost } from "../models/post";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) { }

    getPosts(): Observable<IPost[]> {
        return this.http.get<IPost[]>(`${environment.apiUrlBase}${enpoints['allPosts']}`)
        .pipe(
            catchError(err => {
                console.log(err);
                return EMPTY;
            })
        );
    }
}