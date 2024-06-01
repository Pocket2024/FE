import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useMediaQuery} from 'react-responsive';
import profileimg from '../images/profileimg.png';

const Wrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 80px);
    padding: 0 10vw;
`
const ProfileBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10vh;
    > img {
        width: 12w;
        height: 12vw;
        border-radius: 50%;
    }
`

const MyTicketPage = () => {
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
            <ProfileBox>
                <img src={profileimg}/>
            </ProfileBox>
        </Wrapper>
        :
        <Wrapper>
            <MProfileBox>
                <img src={profileimg}/>
                <TxtInfo>
                    <div>
                    <Nickname>{infoData.nickname}</Nickname>
                    <Bio>{infoData.bio}</Bio>
                    <NumLine>
                        <Unit>
                            <Title>포켓</Title>
                            <Num>0</Num>
                        </Unit>
                        <Unit>
                            <Title>티켓</Title>
                            <Num>0</Num>
                        </Unit>
                        <Unit>
                            <Title>팔로워</Title>
                            <Num fcolor='#727272'>0</Num>
                        </Unit>
                        <Unit>
                            <Title>팔로잉</Title>
                            <Num fcolor='#727272'>0</Num>
                        </Unit>
                    </NumLine>
                    </div>
                </TxtInfo>
            </MProfileBox>
        </Wrapper>}
        </>
    );
};

export default MyTicketPage;

const MProfileBox = styled.div`
    display: flex;
    margin-top: 5vh;
    > img {
        width: 23vw;
        height: 23vw;
        border-radius: 50%;
    }
`
const TxtInfo = styled.div`
    margin-left: 15px;
    width: 100%;
    display: flex;
    align-items: center;
    > div {
        width: 100%;
    }
`
const Nickname = styled.div`
    font-weight: 700;
    font-size: 20px;
`
const Bio = styled.div`
    font-weight: 600;
    font-size: 12px;
    color: #737373;
    margin-top: 5px;
`
const NumLine = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
`
const Unit = styled.div`
    display: flex;
    font-size: 12px;
    font-weight: 600;
`
const Title = styled.div`
    margin-right: 5px;
`
const Num = styled.div`
    color: ${props => props.fcolor || '#CA3525'};
`