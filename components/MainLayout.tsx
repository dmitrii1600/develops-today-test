import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { LayoutProps } from '../interfaces';

export const MainLayout: React.FunctionComponent<LayoutProps> = ({
    children,
    title = 'Blog App',
}) => {
    return (
        <Wrapper>
            <Head>
                <title>{title}</title>
            </Head>
            <Nav>
                <Link href="/">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>
                        <StyledButton>Posts</StyledButton>
                    </a>
                </Link>
                <Link href="/posts/new">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>
                        <StyledButton>Create new post</StyledButton>
                    </a>
                </Link>
            </Nav>
            <Main>{children}</Main>
        </Wrapper>
    );
};

const Nav = styled.nav`
    position: fixed;
    height: 60px;
    top: 0;
    left: 0;
    right: 0;
    background: black;
    display: flex;
    justify-content: space-around;
    align-items: center;

    a {
        text-decoration: none;
    }
`;

const StyledButton = styled(Button)`
    && {
        color: white;
        border: 1px solid white;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        padding: 7px 14px;
    }
    &&:hover {
        background: grey;
    }
`;

const Main = styled.main`
    margin: 80px auto;
    max-width: 960px;
`;

const Wrapper = styled.div`
    font-family: 'Roboto', sans-serif;
`;
