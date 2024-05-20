import React from 'react';
import styled from 'styled-components';
import {useMediaQuery} from 'react-responsive';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 80px);
    background-color: white;
    padding: 0 5vw;
    display: flex;
    justify-content: space-between;
`
const Left = styled.div`
    width: 43vw;
    background-color: aliceblue;
`
const Right = styled.div`
    width: 43vw;
    padding: 50px;
    margin-bottom: 100px;
`

const SignupPage = () => {
    const isDesktop = useMediaQuery({ minWidth: 1220 });
    const navigate = useNavigate();
    return (
        <>
        {isDesktop?
        <Wrapper>
            <Left>
                f
            </Left>
            <Right>
                <Title fontsize='35px'>회원가입</Title>
                <FormTitle fontsize='25px' mbottom='10px'>이메일</FormTitle>
                <Input 
                    fontsize='20px'
                    padding='20px 25px'
                    placeholder='이메일을 입력해주세요.'/>
                <FormTitle fontsize='25px' mbottom='10px' mtop='30px'>닉네임</FormTitle>
                <Input 
                    fontsize='20px'
                    padding='20px 25px'
                    placeholder='닉네임을 입력해주세요.'/>
                <FormTitle fontsize='25px' mbottom='10px' mtop='30px'>비밀번호</FormTitle>
                <Input 
                    fontsize='20px'
                    padding='20px 25px'
                    placeholder='비밀번호를 입력해주세요.'/>
                <FormTitle fontsize='25px' mbottom='10px' mtop='30px'>비밀번호 확인</FormTitle>
                <Input 
                    fontsize='20px'
                    padding='20px 25px'
                    placeholder='비밀번호를 한 번 더 입력해주세요.'/>
                <FormTitle fontsize='25px' mbottom='10px' mtop='30px'>한 줄 소개</FormTitle>
                <Input 
                    fontsize='20px'
                    padding='20px 25px'
                    placeholder='한 줄로 자신을 소개해주세요.'/>
                <MSignupBtn fontsize='20px'>회원가입 완료</MSignupBtn>
            </Right>
        </Wrapper>
        :
        <MWrapper>
            <Title fontsize='25px'>회원가입</Title>
            <FormTitle>이메일</FormTitle>
            <Input 
                placeholder='이메일을 입력해주세요.'/>
            <FormTitle>닉네임</FormTitle>
            <Input 
                placeholder='닉네임을 입력해주세요.'/>
            <FormTitle>비밀번호</FormTitle>
            <Input 
                placeholder='비밀번호를 입력해주세요.'/>
            <FormTitle>비밀번호 확인</FormTitle>
            <Input 
                placeholder='비밀번호를 한 번 더 입력해주세요.'/>
            <FormTitle>한 줄 소개</FormTitle>
            <Input 
                placeholder='한 줄로 자신을 소개해주세요.'/>
            <MSignupBtn>회원가입 완료</MSignupBtn>
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
    padding: 0 10vw;
`
const Title = styled.div`
    font-size: ${props => props.fontsize};
    font-weight: 700;
    color: #E65A2E;
    margin-bottom: 20px;
    margin-top: 30px;
`
const FormTitle = styled.div`
    font-size: ${props => props.fontsize || '15px'};
    font-weight: 600;
    color: #E65A2E;
    margin-bottom: ${props => props.mbottom || '5px'};
    margin-top: ${props => props.mtop || '15px'};
`
const Input = styled.input`
    border: 1px solid rgba(255, 149, 115, 0.44);
    outline: none;
    background-color: #FFF6F3;
    border-radius: 10px;
    width: 100%;
    padding: ${props => props.padding || '15px 20px'};
    font-size: ${props => props.fontsize || '12px'};
    font-weight: 700;
    color: #E65A2E;
    &::placeholder {
        color: rgba(230, 90, 46, 0.53);
        font-size: ${props => props.fontsize || '12px'};
    }
`
const MSignupBtn = styled.button`
    border: none;
    background-color: #E65A2E;
    border-radius: 40px;
    color: white;
    font-size: ${props => props.fontsize};
    font-weight: 600;
    padding: 20px;
    width: 100%;
    margin-top: 50px;
`