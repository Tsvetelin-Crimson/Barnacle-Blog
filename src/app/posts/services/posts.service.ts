import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, EMPTY, Observable, tap } from "rxjs";
import { UserService } from "src/app/common/services/user.service";
import { enpoints } from "src/constants/endpoints";
import { environment } from "src/environments/environment";
import { IPost } from "../models/post";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private userService: UserService
        ) { }

    getAll(): Observable<IPost[]> {
        return this.httpGet<IPost[]>(enpoints['allPosts'])
            .pipe(
                tap(posts => console.log(posts)),
                catchError(err => {
                    console.log(err);
                    return EMPTY;
                })
            );
    }

    getById(id: string): Observable<IPost> {
        const token = this.userService.getJWTTokenString();


        return this.httpGet<IPost>(`${enpoints['postById']}?id=${id}`, token)
            .pipe(
                catchError(err => {
                    console.log(err);
                    return EMPTY;
                })
            );
    }

    getRecent(take: number = 10): Observable<IPost[]> {
        return this.httpGet<IPost[]>(`${enpoints['recentPosts']}?take=${take}`)
            .pipe(
                catchError(err => {
                    console.log(err);
                    return EMPTY;
                })
            );
    }

    getPopular(take: number = 10): Observable<IPost[]> {
        return this.httpGet<IPost[]>(`${enpoints['popularPosts']}?take=${take}`)
            .pipe(
                catchError(err => {
                    console.log(err);
                    return EMPTY;
                })
            )
            ;
    }

    getCurrentUsersPosts(): Observable<IPost[]> {
        const token = this.userService.getJWTTokenString();
        if (token == null) {
            this.router.navigateByUrl('login');
        }

        return this.httpGet<IPost[]>(enpoints['userPosts'], token);
    }

    createPost(
        title: string,
        preview: string | null,
        content: string,
        categoryId: string
    ): Observable<string> {
        const token = this.userService.getJWTTokenString();
        if (token == null) {
            this.router.navigateByUrl('login');
        }
        const body = {
            title,
            preview,
            content,
            categoryId,
        }

        return this.httpPost<string>(enpoints['createPost'], body, token)
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
        categoryId: string
    ): Observable<string> {
        const token = this.userService.getJWTTokenString();
        if (token == null) {
            this.router.navigateByUrl('login');
        }

        const body = {
            postId,
            title,
            preview,
            content,
            categoryId
        }

        return this.httpPost<string>(enpoints['updatePost'], body, token)
            .pipe(
                catchError(err => {
                    this.router.navigateByUrl(err.status);
                    return EMPTY;
                })
            );
    }

    deletePost(postId: string) {
        const token = this.userService.getJWTTokenString();
        if (token == null) {
            this.router.navigateByUrl('login');
        }


        const body = {
            postId
        };
        return this.httpPost<boolean>(enpoints['deletePost'], body, token)
            .pipe(
                catchError(err => {
                    this.router.navigateByUrl(err.status);
                    return EMPTY;
                })
            );
    }

    likePost(postId: string) {
        const token = this.userService.getJWTTokenString();
        if (token == null) {
            this.router.navigateByUrl('login');
        }

        const body = {
            postId
        };
        return this.httpPost<boolean>(enpoints['likePost'], body, token);
    }

    unLikePost(postId: string) {
        const token = this.userService.getJWTTokenString();
        if (token == null) {
            this.router.navigateByUrl('login');
        }

        const body = {
            postId
        };
        return this.httpPost<boolean>(enpoints['unlikePost'], body, token);
    }

    // maybe put these as static methods... idk in a static subfolder in common/services
    private httpGet<T>(endpoint: string, bearerToken?: string | null): Observable<T> {
        return this.http
          .get<T>(`${environment.apiUrlBase}${endpoint}`, {
            headers: { 'bearer': bearerToken ?? '' }
          });
      }
    
      private httpPost<T>(endpoint: string, body: any, bearerToken: string | null): Observable<T> {
        return this.http
          .post<T>(`${environment.apiUrlBase}${endpoint}`, body, {
            headers: { 'bearer': bearerToken ?? '' }
          });
      }
}