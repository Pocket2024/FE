import React from 'react';
import styled from 'styled-components';
import logo_white from '../images/pocketlogo_white.svg';
import compass_white from '../images/compass_white.svg';
import ticket_white from '../images/ticket_white.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const TopBarWrapper = styled.div`
    width: calc(100vw - 160px);
    height: 100px;
    background-color: #E65A2E;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 80px;
`
const Logo = styled.div`
    height: 23px;
`
const TabContainer = styled.div`
    display: flex;
    width: 200px;
    justify-content: space-between;
`
const Tab = styled.div`
    display: flex;
    height: 23px;
    cursor: pointer;
`
const TabIcon = styled.img``
const TabTxt = styled.div`
    color: white;
    font-weight: 700;
    font-size: 20px;
    margin-left: 10px;
`

const TopBar = () => {
    const navigate = useNavigate();
    //const location = useLocation();

    return (
        <TopBarWrapper>
            <Logo><img src={logo_white}/></Logo>
            <TabContainer>
                <Tab onClick={() => {navigate('/')}}>
                    <TabIcon src={compass_white}/>
                    <TabTxt>탐색</TabTxt>
                </Tab>
                <Tab onClick={() => {navigate('/')}}>
                    <TabIcon src={ticket_white}/>
                    <TabTxt>내 티켓</TabTxt>
                </Tab>
            </TabContainer>
        </TopBarWrapper>
    );
};

export default TopBar;