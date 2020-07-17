import { SET_CURRENT_POST, SET_ERROR, SET_POSTS } from './actions';
import { HYDRATE } from 'next-redux-wrapper';
import { IState } from '../interfaces';
import { AnyAction } from 'redux';

export const initialState: IState = {
    posts: [],
    currentPost: {
        title: null,
        body: null,
        id: null,
    },
    error: false,
};

const appReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                ...action.payload.app,
            };
        case SET_POSTS: {
            return {
                ...state,
                posts: action.payload.posts,
            };
        }
        case SET_CURRENT_POST: {
            return {
                ...state,
                currentPost: action.payload.post,
            };
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.payload.value,
            };
        }

        default:
            return { ...state };
    }
};

export default appReducer;
