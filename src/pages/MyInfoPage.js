import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

const Wrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 80px);
    padding: 0 30vw;
`

const MyInfoPage = () => {
    const isDesktop = useMediaQuery({ minWidth: 1220 });
    let ACCESS_TOKEN = localStorage.getItem("accessToken");
    const [infoData, setInfoData] = useState([]);

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

    return (
        <>
        {isDesktop?
        <Wrapper>

        </Wrapper>
        :
        <MWrapper>
            <Line mbottom='30px' ptop='5vh'>
                <Name size='20px'>{infoData.nickname}</Name>
                <MTxt size='20px'>님의 정보</MTxt>
            </Line>
            <Title>이메일</Title>
            <Contents>{infoData.email}</Contents>
            <Title>닉네임</Title>
            <Contents>{infoData.nickname}</Contents>
            <Title>휴대폰 번호</Title>
            <Contents>{infoData.phoneNumber}</Contents>
            <Title>한 줄 소개</Title>
            <Contents>{infoData.bio}</Contents>
            <Title>프로필 이미지</Title>
            <Contents>{infoData.profileImage}</Contents>
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
    font-size: ${props => props.fontsize || '15px'};
    font-weight: 600;
    color: ${props => props.fcolor || "#272727"};
    margin-bottom: ${props => props.mbottom || '5px'};
    margin-top: ${props => props.mtop || '15px'};
    > span {
        color: #CA3525;
    }
`
const Contents = styled.div`
`