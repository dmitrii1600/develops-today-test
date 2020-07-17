export interface IState {
    posts: IPost[];
    currentPost: IPost;
    error: boolean;
}

export interface IPost {
    title: string | null;
    body: string | null;
    id: number | null;
    comments?: IComment[];
}

export interface IComment {
    id: number;
    postId: number;
    body: string;
}

export type LayoutProps = {
    title?: string;
};
