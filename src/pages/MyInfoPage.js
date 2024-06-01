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