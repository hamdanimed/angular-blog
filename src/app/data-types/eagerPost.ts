import { Category } from "./category";
import { Post } from "./post";

export interface EagerPost{
    post:any,
    category:any,
    likesCount:number,
    commentsCount:number,
    date:Date
}