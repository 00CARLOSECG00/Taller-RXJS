import { Reaction } from "./reaction";

export interface Post {
    id:number;
    title:string;
    body:string;
    tags:string[];
    reactions: Reaction;
    comments: Comment[];
}
