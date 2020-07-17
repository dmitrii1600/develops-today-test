import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://simple-blog-api.crew.red/',
    headers: {
        'Content-Type': 'application/json',
    },
});

interface IApi {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: (...args: any[]) => Promise<any>;
}

export const api: IApi = {
    getPosts: () => {
        return instance.get(`posts`).then((response) => response.data);
    },
    getPost: (postId: number) => {
        return instance.get(`posts/${postId}?_embed=comments`).then((response) => response.data);
    },
    createPost: (title: string, body: string) => {
        return instance.post(`posts`, { title, body });
    },
};
