import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { useSelector } from 'react-redux';
import { api } from '../services/api';
import { MainLayout } from '../components/MainLayout';
import { setError, setPosts } from '../redux/actions';
import { wrapper } from '../redux/store';
import { getError, getPosts } from '../redux/selectors';
import { IPost, IState } from '../interfaces';

const Index: React.FC = () => {
    const posts: IPost[] = useSelector((state: IState) => getPosts(state));
    const error: boolean = useSelector((state: IState) => getError(state));

    return (
        <MainLayout title={'Blog | Posts'}>
            <Heading>Posts</Heading>
            <hr />

            {error ? (
                <EmptyPosts>Server error, try again later :(</EmptyPosts>
            ) : posts.length ? (
                posts.map(({ title, id }) => {
                    return (
                        <PostWrapper key={id}>
                            <Link href={`/posts/[postId]`} as={`/posts/${id}`}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a>
                                    <li key={id}>{title || 'Ops, no text title :('}</li>
                                </a>
                            </Link>
                        </PostWrapper>
                    );
                })
            ) : (
                <EmptyPosts>There are no posts :(</EmptyPosts>
            )}
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    async ({ store }) => {
        store.dispatch(setError(false));
        try {
            const posts: IPost[] = await api.getPosts();
            store.dispatch(setPosts(posts));
        } catch (e) {
            store.dispatch(setError(true));
        }
    }
);

const Heading = styled.h1``;

const PostWrapper = styled.ul`
    color: black;
    border-radius: 5px;
    border: 2px solid black;
    margin: 5px;
    background: black;

    a {
        color: white;
        text-decoration: none;
        width: 100%;
    }

    li {
        padding: 15px;
    }

    :hover {
        border-color: grey;
        background: grey;
    }
`;

const EmptyPosts = styled.div`
    font-size: 20px;
`;

export default Index;
