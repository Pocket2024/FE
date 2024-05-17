import React from 'react';
import styled from 'styled-components';
import {useMediaQuery} from 'react-responsive';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 80px);
    background-color: white;
    padding: 0 30vw;
`

const SignupPage = () => {
    const isDesktop = useMediaQuery({ minWidth: 1220 });
    const navigate = useNavigate();
    return (
        <>
        {isDesktop?
        <Wrapper>

        </Wrapper>
        :
        <MWrapper>
            <Title>회원가입</Title>
        </MWrapper>
        }
        </>
    );
};

export default SignupPage;

const MWrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 80px);
    background-color: white;
    padding: 0 17vw;
`
const Title = styled.div`
    font-size: 25px;
    font-weight: 700;
    color: #E65A2E;
`