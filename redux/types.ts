import { SET_CURRENT_POST, SET_ERROR, SET_POSTS } from './actions';
import { IPost } from '../interfaces';

interface ISetPostsAction {
    type: typeof SET_POSTS;
    payload: {
        posts: IPost[];
    };
}

interface ISetCurrentPostAction {
    type: typeof SET_CURRENT_POST;
    payload: {
        post: IPost;
    };
}

interface ISetErrorAction {
    type: typeof SET_ERROR;
    payload: {
        value: boolean;
    };
}

export type ActionTypes = ISetCurrentPostAction | ISetPostsAction | ISetErrorAction;
