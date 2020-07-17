import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { MainLayout } from '../../components/MainLayout';
import { api } from '../../services/api';
import { setCurrentPost, setError } from '../../redux/actions';
import { wrapper } from '../../redux/store';
import { getCurrentPost, getError } from '../../redux/selectors';
import { IPost, IState } from '../../interfaces';
import { StyledButton } from './new';
import { Card } from '@material-ui/core';

const Post: NextPage = () => {
    const post: IPost = useSelector((state: IState) => getCurrentPost(state));
    const error: boolean = useSelector((state: IState) => getError(state));
    const router = useRouter();

    return (
        <MainLayout title={'Blog | ' + post.title || 'Post'}>
            {!error ? (
                <PostCard>
                    <PostTitle>{post.title || 'Oops, post title is empty :('}</PostTitle>
                    <hr />
                    <PostBody>{post.body || 'Oops, post body is empty :('}</PostBody>
                </PostCard>
            ) : (
                <ErrorInfo>Server error :(, try again later</ErrorInfo>
            )}
            <StyledButton onClick={() => router.back()}>Back to posts</StyledButton>
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    async ({ store, query }) => {
        store.dispatch(setError(false));
        try {
            const post = await api.getPost(Number(query.postId));
            store.dispatch(setCurrentPost(post));
        } catch (e) {
            store.dispatch(setError(true));
        }
    }
);

const PostTitle = styled.h1``;

const PostBody = styled.p`
    font-size: 20px;
`;

const PostCard = styled(Card)`
    && {
       color: white;
       border-radius: 3px;
       padding 10px;
       margin: 5px;
       background: black;
       max-width: 100%;
    }
`;

const ErrorInfo = styled.div`
    font-size: 20px;
    margin: 5px;
`;

export default Post;
