import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { api } from '../services/api';
import { IPost, IState } from '../interfaces';
import { ActionTypes } from './types';

export const SET_POSTS = 'SET_POSTS';
export const SET_CURRENT_POST = 'SET_CURRENT_POST';
export const SET_ERROR = 'SET_ERROR';

export const setPosts = (posts: IPost[]): ActionTypes => ({
    type: SET_POSTS,
    payload: { posts },
});
export const setCurrentPost = (post: IPost): ActionTypes => ({
    type: SET_CURRENT_POST,
    payload: { post },
});
export const setError = (value: boolean): ActionTypes => ({
    type: SET_ERROR,
    payload: { value },
});

export const createPostThunk = (
    title: string,
    body: string
): ThunkAction<void, IState, unknown, Action<string>> => async (dispatch: any) => {
    try {
        dispatch(setError(false));
        const response = await api.createPost(title, body);
        if (response.ok) {
            const posts: IPost[] = await api.getPosts();
            dispatch(setPosts(posts));
        }
    } catch (e) {
        dispatch(setError(true));
    }
    return 'done';
};
