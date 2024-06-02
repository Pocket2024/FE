import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

const Wrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 80px);
    display: flex;
    justify-content: center;
    > div {
        width: 30vw;
    }
`

const MyInfoPage = () => {
    const isDesktop = useMediaQuery({ minWidth: 1220 });
    let ACCESS_TOKEN = localStorage.getItem("accessToken");
    const [infoData, setInfoData] = useState([]);
    const [isedit, setIsEdit] = useState(false);
    const [nickname, setNickname] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneMessage, setPhoneMessage] = useState("");
    const [bio, setBio] = useState("");

    const getMyInfo = () => {
        axios.get('http://127.0.0.1:8080/api/users/details', {
            headers: {
                Authorization: `${ACCESS_TOKEN}`,
              },
        })
        .then(res => {
            console.log(res);
            setInfoData(res.data);
        })
        .catch(err => {
            console.error('Error get info', err);
        })
    }
    useEffect(() => {
        getMyInfo();
    }, []);

    const onChangeNickname = (e) => {
        setNickname(e.target.value)
    }

    const onChangePhone = (e) => {
        const currentPhone = e.target.value;
        setPhone(currentPhone);

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
    const onChangeBio = (e) => {
        setBio(e.target.value);
    }
    const handleEdit = () => {
        console.log(bio);
        axios.put(`http://localhost:8080/api/users/${infoData.id}`, 
        {
            nickname: nickname,
            bio: bio,
            phoneNumber: phone
        },
        {
            headers: {
                Authorization: `${ACCESS_TOKEN}`,
              },
        })
        .then(res => {
            console.log(res);
            setIsEdit(false);
            console.log('수정된 정보 받아오기');
            getMyInfo();
            alert('정보가 수정되었습니다.');
        })
        .catch(err => {
            console.error('Error handle edit', err);
        })
    }

    return (
        <>
        {isDesktop?
        <Wrapper>
            <div>
            <Line mbottom='30px' ptop='5vh'>
                <Name size='30px'>{infoData.nickname}</Name>
                <MTxt size='30px'>님의 정보</MTxt>
            </Line>
            <Title fontsize='25px'>이메일</Title>
            <Contents fontsize='20px'>{infoData.email}</Contents>
            <Title fontsize='25px'>닉네임</Title>
            {isedit? 
                <Input
                onChange={onChangeNickname} 
                defaultValue={infoData.nickname}
                placeholder='닉네임을 입력해주세요.'/>
            :
                <Contents>{infoData.nickname}</Contents>}
            <Title fontsize='25px'>휴대폰 번호</Title>
            {isedit? 
                <Input
                onChange={onChangePhone} 
                defaultValue={infoData.phoneNumber}
                placeholder='ex. 010-1234-5678'/>
            :
                <Contents>{infoData.phoneNumber}</Contents>}
            <Title fontsize='25px'>한 줄 소개</Title>
            {isedit?
                <Input 
                onChange={onChangeBio}
                defaultValue={infoData.bio}
                placeholder='한 줄로 자신을 소개해주세요.'/>
            :
                <Contents>{infoData.bio}</Contents>}
            <Title fontsize='25px'>프로필 이미지</Title>
            <Contents fontsize='20px'>{infoData.profileImage}</Contents>
            {isedit? 
            <EditBtn fontsize='17px' onClick={handleEdit}>수정 완료</EditBtn>
            :
            <EditBtn fontsize='17px' onClick={() => setIsEdit(true)}>정보 수정하기</EditBtn>
            }
            </div>
        </Wrapper>
        :
        <MWrapper>
            <Line mbottom='30px' ptop='5vh'>
                <Name size='20px'>{infoData.nickname}</Name>
                <MTxt size='20px'>님의 정보</MTxt>
            </Line>
            <Title>이메일</Title><BlackLine/>
            <Contents>{infoData.email}</Contents>
            <Title>닉네임</Title><BlackLine style={{display: isedit? 'none' : ''}}/>
            {isedit? 
                <Input
                onChange={onChangeNickname} 
                defaultValue={infoData.nickname}
                placeholder='닉네임을 입력해주세요.'/>
            :
                <Contents>{infoData.nickname}</Contents>}
            <Title>휴대폰 번호</Title><BlackLine style={{display: isedit? 'none' : ''}}/>
            {isedit? 
                <Input
                onChange={onChangePhone} 
                defaultValue={infoData.phoneNumber}
                placeholder='ex. 010-1234-5678'/>
            :
                <Contents>{infoData.phoneNumber}</Contents>}
            <Title>한 줄 소개</Title><BlackLine style={{display: isedit? 'none' : ''}}/>
            {isedit?
                <Input 
                onChange={onChangeBio}
                defaultValue={infoData.bio}
                placeholder='한 줄로 자신을 소개해주세요.'/>
            :
                <Contents>{infoData.bio}</Contents>}
            <Title>프로필 이미지</Title><BlackLine/>
            <Contents>{infoData.profileImage}</Contents>
            {isedit? 
            <EditBtn fontsize='17px' onClick={handleEdit}>수정 완료</EditBtn>
            :
            <EditBtn fontsize='17px' onClick={() => setIsEdit(true)}>정보 수정하기</EditBtn>
            }
        </MWrapper>}
        </>
    );
};

export default MyInfoPage;

const MWrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 80px);
    padding: 0 10vw;
`
const Line = styled.div`
    display: flex;
    font-weight: 700;
    margin-bottom: ${props => props.mbottom};
    padding-top: ${props => props.ptop};
    align-items: end;
`
const Name = styled.div`
    color: #141414;
    font-size: ${props => props.size};
`
const MTxt = styled.div`
    color: #141414;
    font-size: ${props => props.size};
`
const Title = styled.div`
    font-size: ${props => props.fontsize || '17px'};
    font-weight: 700;
    color: ${props => props.fcolor || "#272727"};
    margin-bottom: ${props => props.mbottom || '5px'};
    margin-top: ${props => props.mtop || '15px'};
    > span {
        color: #CA3525;
    }
`
const Contents = styled.div`
    margin-top: 10px;
    margin-bottom: 30px;
    font-size: ${props => props.fontsize || '15px'};
    font-weight: 500;
`
const EditBtn = styled.button`
    border: none;
    background-color: #CA3525;
    border-radius: 40px;
    color: white;
    font-size: ${props => props.fontsize};
    font-weight: 600;
    padding: 20px;
    width: 100%;
    margin-top: 50px;
`
const BlackLine = styled.div`
    background-color: black;
    height: 1px;
    width: 100%;
`
const Input = styled.input`
    border: 1px solid rgba(202, 53, 37, 0.57);
    outline: none;
    background-color: #FFF5F4;
    border-radius: 10px;
    width: 100%;
    padding: ${props => props.padding || '15px 20px'};
    font-size: ${props => props.fontsize || '12px'};
    font-weight: 700;
    color: #CA3525;
    margin-bottom: 20px;
    &::placeholder {
        color: rgba(202, 53, 37, 0.53);
        font-size: ${props => props.fontsize || '12px'};
    }
`