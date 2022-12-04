import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, EMPTY, Observable, tap } from "rxjs";
import { enpoints } from "src/constants/endpoints";
import { environment } from "src/environments/environment";
import { IPost } from "../models/post";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(
        private http: HttpClient,
        private router: Router
        ) { }

    getAll(): Observable<IPost[]> {
        return this.http
            .get<IPost[]>(`${environment.apiUrlBase}${enpoints['allPosts']}`)
            .pipe(
                catchError(err => {
                    console.log(err);
                    return EMPTY;
                })
            );
    }

    getById(id: string): Observable<IPost> {
        return this.http
            .get<IPost>(`${environment.apiUrlBase}${enpoints['postById']}?id=${id}`)
            .pipe(
                catchError(err => {
                    console.log(err);
                    return EMPTY;
                })
            );
    }

    getRecent(take: number = 10): Observable<IPost[]> {
        return this.http
            .get<IPost[]>(`${environment.apiUrlBase}${enpoints['recentPosts']}?take=${take}`)
            .pipe(
                // tap(posts => console.log(posts)),
                catchError(err => {
                    console.log(err);
                    return EMPTY;
                })
            );
    }

    getPopular(take: number = 10): Observable<IPost[]> {
        return this.http
            .get<IPost[]>(`${environment.apiUrlBase}${enpoints['popularPosts']}?take=${take}`)
            .pipe(
                // tap(posts => console.log(posts)),
                catchError(err => {
                    if(err.status == 401) {
                        this.router.navigateByUrl('login')
                    }
                    console.log(err);
                    return EMPTY;
                })
            );
    }

    createPost(
        title: string,
        preview: string | null,
        content: string,
        categoryId: string,
        jwtToken: string
    ): Observable<string> {
        const body = {
            title,
            preview,
            content,
            categoryId,
            jwtToken
        }

        return this.http
            .post<string>(`${environment.apiUrlBase}${enpoints['createPost']}`, body)
            .pipe(
                catchError(err => {
                    if (err.status == 401) {
                        this.router.navigateByUrl('login');
                        return EMPTY;
                    }
                    this.router.navigateByUrl(err.status);
                    return EMPTY;
                })
            );
    }

    updatePost(
        postId: string,
        title: string,
        preview: string | null,
        content: string,
        categoryId: string,
        jwtToken: string
    ): Observable<string> {
        const body = {
            postId,
            title,
            preview,
            content,
            categoryId,
            jwtToken
        }

        return this.http
            .post<string>(`${environment.apiUrlBase}${enpoints['updatePost']}`, body)
            .pipe(
                catchError(err => {
                    this.router.navigateByUrl(err.status);
                    return EMPTY;
                })
            );
    }

    deletePost(postId: string) {
        const jwtToken = localStorage.getItem('jwt');

        const body = {
            jwtToken,
            postId
        };
        return this.http
            .post<boolean>(`${environment.apiUrlBase}${enpoints['deletePost']}`, body)
            .pipe(
                catchError(err => {
                    this.router.navigateByUrl(err.status);
                    return EMPTY;
                })
            );
    }

    likePost(postId: string) {
        const jwtToken = localStorage.getItem('jwt');

        const body = {
            jwtToken,
            postId
        };
        return this.http
            .post<boolean>(`${environment.apiUrlBase}${enpoints['likePost']}`, body)
            .pipe(
                catchError(err => {
                    this.router.navigateByUrl(err.status);
                    return EMPTY;
                })
            );
    }
}