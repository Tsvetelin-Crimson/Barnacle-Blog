import { Injectable } from "@angular/core";
import { IPost } from "../models/post";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    getPosts(): IPost[]{
        return [
            {
                title: 'Title',
                category: 'Category',
                preview: 'Some preview Content',
                likes: 1,
                ownerName: 'User Peter'
            },
            {
                title: 'Title1',
                category: 'Category1',
                preview: 'Some preview Content1',
                likes: 2,
                ownerName: 'User Peter1'
            },
            {
                title: 'Title2',
                category: 'Category2',
                preview: 'Some preview Content2',
                likes: 3,
                ownerName: 'User Peter2'
            },
            {
                title: 'Title4',
                category: 'Category4',
                preview: 'Some preview Content4',
                likes: 5,
                ownerName: 'User Peter4'
            },
        ]

    }

}