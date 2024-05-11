import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as LogoIcon } from '../images/pocketlogo_white.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoTicket } from "react-icons/io5";
import { FaCompass } from "react-icons/fa";

const TopBarWrapper = styled.div`
    width: calc(100vw - 160px);
    height: 100px;
    background-color: #E65A2E;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 80px;
    position: fixed;
    z-index: 99;
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

    return (
        <TopBarWrapper>
            <Logo><LogoIcon fill='white'/></Logo>
            <TabContainer>
                <Tab onClick={() => {navigate('/search')}}>
                    <FaCompass color='white' size={23}/>
                    <TabTxt>탐색</TabTxt>
                </Tab>
                <Tab onClick={() => {navigate('/myticket')}}>
                    <IoTicket color='white' size={23}/>
                    <TabTxt>내 티켓</TabTxt>
                </Tab>
            </TabContainer>
        </TopBarWrapper>
    );
};

export default TopBar;