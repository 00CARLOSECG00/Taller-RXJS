import { Reaction } from "./reaction";
import{Comment}from'./comment'


export interface Post {
    id:number;
    title:string;
    body:string;
    tags:string[];
    reactions: Reaction;
    comments: Comment[];
}
