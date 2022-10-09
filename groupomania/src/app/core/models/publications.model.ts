import { Comment } from "./comment.model";

export class Publication {
    _id!: string;
    userId!: string;
    userPseudo!: string;
    title!: string; 
    description!: string; 
    imageUrl?: string; 
    createdDate!: Date; 
    likes!: number;
    usersLiked!: string[];
    comments!: Comment[] | null;
}