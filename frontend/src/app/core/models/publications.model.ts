export class Publication {
    _id!: string;
    userId!: string;
    author!: any;
    title!: string; 
    description!: string; 
    imageUrl?: string; 
    createdDate!: Date; 
    likes!: number;
    usersLiked!: string[];
}