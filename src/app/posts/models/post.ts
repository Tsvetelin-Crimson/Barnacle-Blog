export interface IPost {
    _id: string,
    title: string,
    category: string,
    description?: string,
    preview: string,
    likes: number,
    ownerName: string
}