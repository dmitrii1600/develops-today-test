import styled from 'styled-components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { MainLayout } from '../../components/MainLayout';
import { createPostThunk } from '../../redux/actions';
import { getError } from '../../redux/selectors';
import { IState } from '../../interfaces';
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { NextPage } from 'next';

const NewPostForm: NextPage = () => {
    const { register, handleSubmit, errors, reset } = useForm();
    const router = useRouter();
    const dispatch = useDispatch();
    const error: boolean = useSelector((state: IState) => getError(state));

    const onSubmit = ({ title, body }: { title: string; body: string }) => {
        const result: boolean = confirm('Do you want to add post?');
        if (result) {
            dispatch(createPostThunk(title, body));

            if (!error) {
                alert('Post successfully added!');
                reset();
                router.push('/');
            } else {
                alert('Server error, try again later');
            }
        }
    };

    return (
        <MainLayout title={'Blog | New post'}>
            <Heading>New Post</Heading>
            <hr />
            <PostForm onSubmit={handleSubmit(onSubmit)}>
                <FormLabel>Title:</FormLabel>
                <PostInput
                    name="title"
                    placeholder="Enter title"
                    ref={register({ required: true })}
                />
                {errors.title && (
                    <StyledAlert variant="filled" severity="error">
                        Field is required!
                    </StyledAlert>
                )}
                <FormLabel>Post Text:</FormLabel>
                <PostTextarea
                    name="body"
                    placeholder="Enter text"
                    ref={register({ required: true })}
                />
                {errors.body && (
                    <StyledAlert variant="filled" severity="error">
                        Field is required
                    </StyledAlert>
                )}
                {error && <EmptyPosts>Server error :(, try again later</EmptyPosts>}
                <StyledButton type="submit">Post</StyledButton>
                <StyledButton
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        router.push('/');
                    }}
                >
                    Back to posts
                </StyledButton>
            </PostForm>
        </MainLayout>
    );
};

export const StyledButton = styled(Button)`
    && {
        color: white;
        background: black;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);

        padding: 10px;
        margin: 5px;
    }
    &&:hover {
        background: grey;
    }
`;

const StyledAlert = styled(Alert)`
    && {
        margin: 5px;
    }
`;

const EmptyPosts = styled.div`
    font-size: 20px;
    margin: 5px;
`;

const PostInput = styled.input`
    margin: 5px;
    padding: 10px;
    font-size: 15px;
    border: 2px black solid;
    border-radius: 3px;
    outline: none;
    &:focus {
        outline: none;
        border: 2px solid skyblue;
    }
    &::placeholder {
        font-family: 'Roboto', sans-serif;
    }
`;

const PostTextarea = styled.textarea`
    margin: 5px;
    padding: 10px;
    border: 2px black solid;
    border-radius: 3px;
    font-size: 15px;
    height: 150px;
    resize: none;
    font-family: 'Roboto', sans-serif;
    &:focus {
        outline: none;
        border: 2px solid skyblue;
    }
    &::placeholder {
        font-family: 'Roboto', sans-serif;
    }
`;

const PostForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const FormLabel = styled.label`
    margin-left: 10px;
    font-size: 25px;
`;

const Heading = styled.h1``;

export default NewPostForm;
