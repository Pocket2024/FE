import React from 'react';
import styled from 'styled-components';
import {useMediaQuery} from 'react-responsive';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 80px);
    background-color: #E65A2E;
    padding: 0 30vw;
`

const LoginPage = () => {
    const isDesktop = useMediaQuery({ minWidth: 1220 });
    const navigate = useNavigate();
    return (
        <>
        {isDesktop?
        <Wrapper>
            <MTxt size='30px' mbottom='30px' ptop='15vh'>로그인</MTxt>
            <MInput placeholder='이메일을 입력해주세요.' font='17px' padding='20px 30px'/>
            <MInput type='password' placeholder='비밀번호를 입력해주세요.' font='17px' padding='20px 30px'/>
            <MTxt size='20px' mbottom='20px' ptop='5vh'>계정이 없으신가요?</MTxt>
            <MSignupBtn font='20px'
                onClick={() => {navigate('/signup')}}>회원가입하기</MSignupBtn>
        </Wrapper>
        :
        <MWrapper>
            <MTxt size='20px' mbottom='30px' ptop='15vh'>로그인</MTxt>
            <MInput placeholder='이메일을 입력해주세요.' font='12px' padding='15px 20px'/>
            <MInput placeholder='비밀번호를 입력해주세요.' font='12px' padding='15px 20px'/>
            <MTxt size='12px' mbottom='10px' ptop='5vh'>계정이 없으신가요?</MTxt>
            <MSignupBtn font='15px'
                onClick={() => {navigate('/signup')}}>회원가입하기</MSignupBtn>
        </MWrapper>
        }
        </>
    );
};

export default LoginPage;

const MWrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 80px);
    background-color: #E65A2E;
    padding: 0 17vw;
`
const MTxt = styled.div`
    color: white;
    text-align: center;
    font-size: ${props => props.size};
    font-weight: 700;
    margin-bottom: ${props => props.mbottom};
    padding-top: ${props => props.ptop};
`
const MInput = styled.input`
    border: 1px rgba(250, 250, 250, 0.35);
    background-color: rgba(255, 149, 115, 0.69);
    border-radius: 10px;
    padding: ${props => props.padding};
    outline: none;
    font-size: ${props => props.font};
    width: 100%;
    margin-bottom: 10px;
    color: white;
    font-weight: 700;
    &::placeholder {
        color: rgba(255, 255, 255, 0.53);
        font-size: ${props => props.font};
    }
`
const MSignupBtn = styled.button`
    border: none;
    background-color: white;
    border-radius: 40px;
    color: #E65A2E;
    font-size: ${props => props.font};
    font-weight: 600;
    padding: 20px;
    width: 100%;
`