import React, { useState } from 'react';
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
const Msg = styled.div`
    font-weight: 500;
    margin: 5px 10px;
    font-size: ${props => props.fsize};
`

const SignupPage = () => {
    const isDesktop = useMediaQuery({ minWidth: 1220 });
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [nickname, setNickname] = useState("");
    const [pw, setPw] = useState("");
    const [pwMessage, setPwMessage] = useState("");
    const [pwcheck, setPwcheck] = useState(false);
    const [pwcheckMessage, setPwcheckMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneMessage, setPhoneMessage] = useState("");
    const [bio, setBio] = useState("");

    const onChangeEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);

        const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!emailRegex.test(currentEmail)) {
            setEmailMessage(
                <span style={{ color: '#FE334C' }}>
                    이메일 형식에 맞게 입력해주세요.
                </span>);
        } else {
            setEmailMessage("");
        }
    }
    const onChangeNickname = (e) => {
        setNickname(e.target.value)
    }
    const onChangePw = (e) => {
        const currentPw = e.target.value;
        setPw(currentPw);

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

        if (!passwordRegex.test(currentPw)) {
            setPwMessage(
                <span style={{ color: '#FE334C' }}>
                비밀번호는 8-16자, 영문, 숫자, 특수문자(!@#$%^&*?_)를 포함해야 합니다.
                </span>
            );
        } else {
            setPwMessage("");
        }
    }
    const onChangePwcheck = (e) => {
        const currentPw2 = e.target.value;
        setPwcheck(currentPw2);

        if (currentPw2 !== pw) {
            setPwcheckMessage(
                <span style={{ color: '#FE334C' }}>
                비밀번호가 일치하지 않습니다.
                </span>
            );
        } else {
            setPwcheckMessage("");
        }
    }
    const onChangePhone = (e) => {
        const currentPhone = e.target.value;
        setPw(currentPhone);

        const phonenumRegex = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

        if (!phonenumRegex.test(currentPhone)) {
            setPhoneMessage(
                <span style={{ color: '#FE334C' }}>
                010-1234-5678 형태로 입력해주세요.
                </span>
            );
        } else {
            setPhoneMessage("");
        }
    }

    const handleSignup = () => {
        alert('회원가입 성공');
        navigate('/login');
    }
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
                    onChange={onChangeEmail} 
                    fontsize='20px'
                    padding='20px 25px'
                    placeholder='이메일을 입력해주세요.'/>
                <Msg>{emailMessage}</Msg>
                <FormTitle fontsize='25px' mbottom='10px' mtop='30px'>닉네임</FormTitle>
                <Input 
                    onChange={onChangeNickname} 
                    fontsize='20px'
                    padding='20px 25px'
                    placeholder='닉네임을 입력해주세요.'/>
                <FormTitle fontsize='25px' mbottom='10px' mtop='30px'>비밀번호</FormTitle>
                <Input 
                    onChange={onChangePw}
                    type='password'
                    fontsize='20px'
                    padding='20px 25px'
                    placeholder='비밀번호를 입력해주세요.'/>
                <Msg>{pwMessage}</Msg>
                <FormTitle fontsize='25px' mbottom='10px' mtop='30px'>비밀번호 확인</FormTitle>
                <Input
                    onChange={onChangePwcheck}
                    type='password' 
                    fontsize='20px'
                    padding='20px 25px'
                    placeholder='비밀번호를 한 번 더 입력해주세요.'/>
                <Msg>{pwcheckMessage}</Msg>
                <FormTitle fontsize='25px' mbottom='10px' mtop='30px'>휴대폰 번호</FormTitle>
                <Input
                    onChange={onChangePhone}
                    fontsize='20px'
                    padding='20px 25px'
                    placeholder='ex. 010-1234-5678'/>
                <Msg>{phoneMessage}</Msg>
                <FormTitle fontsize='25px' mbottom='10px' mtop='30px'>한 줄 소개</FormTitle>
                <Input 
                    fontsize='20px'
                    padding='20px 25px'
                    placeholder='한 줄로 자신을 소개해주세요.'/>
                <MSignupBtn fontsize='20px' onClick={handleSignup}>회원가입 완료</MSignupBtn>
            </Right>
        </Wrapper>
        :
        <MWrapper>
            <Title fontsize='25px'>회원가입</Title>
            <FormTitle>이메일</FormTitle>
            <Input 
                onChange={onChangeEmail}
                placeholder='이메일을 입력해주세요.'/>
            <Msg fsize='10px'>{emailMessage}</Msg>
            <FormTitle>닉네임</FormTitle>
            <Input
                onChange={onChangeNickname} 
                placeholder='닉네임을 입력해주세요.'/>
            <FormTitle>비밀번호</FormTitle>
            <Input 
                onChange={onChangePw}
                type='password'
                placeholder='비밀번호를 입력해주세요.'/>
            <Msg fsize='10px'>{pwMessage}</Msg>
            <FormTitle>비밀번호 확인</FormTitle>
            <Input 
                onChange={onChangePwcheck}
                type='password' 
                placeholder='비밀번호를 한 번 더 입력해주세요.'/>
            <Msg fsize='10px'>{pwcheckMessage}</Msg>
            <FormTitle>휴대폰 번호</FormTitle>
            <Input
                onChange={onChangePhone} 
                placeholder='ex. 010-1234-5678'/>
            <Msg fsize='10px'>{phoneMessage}</Msg>
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
    color: ${props => props.fcolor || "#E65A2E"};
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