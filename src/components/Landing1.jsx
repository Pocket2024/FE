import React from 'react';
import styled from 'styled-components';
import line1 from '../images/line1.svg';
import line2 from '../images/line2.svg';
import line3 from '../images/line3.svg';
import star from '../images/back1.svg';
import bigstar from '../images/back2.svg';
import bubble from '../images/back3.svg';
import jean_pocket from '../images/jean.svg';
import { ReactComponent as LogoIcon } from '../images/pocketlogo_white.svg';
import {useMediaQuery} from 'react-responsive';

const Wrapper = styled.div`
    height: calc(100vh - 100px);
    background-color: #E65A2E;
    position: relative;
    z-index: 2;
    padding-left: 12vw;
`
const TxtWrapper = styled.div`
    display: block;
    padding-top: 120px;
    position: relative;
    z-index: 1;
`
const TxtDiv = styled.div``
const TxtDiv2 = styled.div`
    padding-top: 50px;
`
const TxtDiv3 = styled.div`
    padding-top: 50px;
`
const Star = styled.div`
    position: absolute;
    z-index: -1;
    top: 10px;
    left: 100px;
`
const BigStar = styled.div`
    position: absolute;
    z-index: -1;
    top: 12vh;
    right: 15vw;
`
const JeanPocket = styled.div`
    position: absolute;
    z-index: 1;
    top: 20vh;
    right: 15vw;
`
const JeanImg = styled.img`
    width: 250px;
`
const Bubble = styled.div`
    position: absolute;
    top: 30vh;
    right: 50vw;
`
const BubbleImg = styled.img`
    width: 100px;
`
const SubTxtDiv = styled.div`
    color: white;
    font-size: 25px;
    font-weight: 700;
    margin-top: 50px;
`
const Line1 = styled.div``
const Line2 = styled.div`
    margin-right: 13px;
`
const FlexBox = styled.div`
    display: flex;
    margin-top: 10px;
`
const SmallLogo = styled.div`
    height: 25px;
`
const BlackTxt = styled.div`
    margin-top: 20px;
    color: #252525;
    font-size: 20px;
`

const Landing1 = () => {
    const isDesktop = useMediaQuery({ minWidth: 1220 });
    return (
        <>
        {isDesktop?
        <Wrapper>
        <TxtWrapper>
            <Star><img src={star}/></Star>
            <TxtDiv><img src={line1}/></TxtDiv>
            <TxtDiv2><img src={line2}/></TxtDiv2>
            <TxtDiv3><img src={line3}/></TxtDiv3>
        </TxtWrapper>
        <BigStar><img src={bigstar}/></BigStar>
        <JeanPocket><JeanImg src={jean_pocket}/></JeanPocket>
        <Bubble><BubbleImg src={bubble}/></Bubble>
        <SubTxtDiv>
            <Line1>모아두고 싶었던 티켓들을</Line1>
            <FlexBox>
                <Line2>이제는</Line2>
                <SmallLogo><LogoIcon fill='white'/></SmallLogo>
                <Line1>을 통해 아카이빙하세요!</Line1>
            </FlexBox>
            <BlackTxt>흩어져있던 모바일 티켓과 지류 티켓을 한 번에</BlackTxt>
        </SubTxtDiv>
    </Wrapper>
    :
    <MWrapper>
        <MTxtWrapper>
            <MStar><img src={star}/></MStar>
            <MTxtDiv><img src={line1}/></MTxtDiv>
            <MTxtDiv2><img src={line2}/></MTxtDiv2>
            <MTxtDiv3><img src={line3}/></MTxtDiv3>
        </MTxtWrapper>
        <BigStar><img src={bigstar}/></BigStar>
        <JeanPocket><JeanImg src={jean_pocket}/></JeanPocket>
        <Bubble><BubbleImg src={bubble}/></Bubble>
        <SubTxtDiv>
            <Line1>모아두고 싶었던 티켓들을</Line1>
            <FlexBox>
                <Line2>이제는</Line2>
                <SmallLogo><LogoIcon fill='white'/></SmallLogo>
                <Line1>을 통해 아카이빙하세요!</Line1>
            </FlexBox>
            <BlackTxt>흩어져있던 모바일 티켓과 지류 티켓을 한 번에</BlackTxt>
        </SubTxtDiv>
    </MWrapper>
    }
    </>
    );
};

export default Landing1;

const MWrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 100px);
    background-color: #E65A2E;
    position: relative;
    z-index: 2;
`
const MTxtWrapper = styled.div`
    display: block;
    padding-top: 120px;
    position: relative;
    z-index: 1;
`
const MTxtDiv = styled.div`
    > img {
        height: 30px;
    }
`
const MTxtDiv2 = styled.div`
    padding-top: 50px;
    > img {
        height: 30px;
    }
`
const MTxtDiv3 = styled.div`
    padding-top: 50px;
    > img {
        height: 30px;
    }
`
const MStar = styled.div`
    position: absolute;
    z-index: -1;
    top: 10px;
    left: 100px;
`
const MBigStar = styled.div`
    position: absolute;
    z-index: -1;
    top: 12vh;
    right: 15vw;
`
const MJeanPocket = styled.div`
    position: absolute;
    z-index: 1;
    top: 20vh;
    right: 15vw;
`
const MJeanImg = styled.img`
    width: 250px;
`
const MBubble = styled.div`
    position: absolute;
    top: 30vh;
    right: 50vw;
`
const MBubbleImg = styled.img`
    width: 100px;
`
const MSubTxtDiv = styled.div`
    color: white;
    font-size: 25px;
    font-weight: 700;
    margin-top: 50px;
`
const MLine1 = styled.div``
const MLine2 = styled.div`
    margin-right: 13px;
`
const MFlexBox = styled.div`
    display: flex;
    margin-top: 10px;
`
const MSmallLogo = styled.div`
    height: 25px;
`
const MBlackTxt = styled.div`
    margin-top: 20px;
    color: #252525;
    font-size: 20px;
`