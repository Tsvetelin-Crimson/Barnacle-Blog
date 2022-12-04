import { ICategory } from "./category";

export interface IPost {
    _id: string,
    title: string,
    content: string,
    category: ICategory,
    preview: string | null,
    likes: number,
    ownerName: string
}