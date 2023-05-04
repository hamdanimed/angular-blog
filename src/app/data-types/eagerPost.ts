import { Category } from "./category";
import { Post } from "./post";

export interface EagerPost{
    post:Post,
    category:Category,
    likesCount:number,
    commentsCount:number,
    date:Date
}