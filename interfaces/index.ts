export interface IState {
    posts: [];
    currentPost: {};
    error: boolean;
}

export interface IPost {
    title: string;
    body: string;
    id: number;
    comments?: IComment[];
}

export interface IComment {
    id: number;
    postId: number;
    body: string;
}

