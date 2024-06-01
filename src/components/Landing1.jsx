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
    height: calc(100vh - 80px);
    background-color: #CA3525;
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
            <Star><img src={star} alt=''/></Star>
            <TxtDiv><img src={line1} alt=''/></TxtDiv>
            <TxtDiv2><img src={line2} alt=''/></TxtDiv2>
            <TxtDiv3><img src={line3} alt=''/></TxtDiv3>
        </TxtWrapper>
        <BigStar><img src={bigstar} alt=''/></BigStar>
        <JeanPocket><JeanImg src={jean_pocket} alt=''/></JeanPocket>
        <Bubble><BubbleImg src={bubble} alt=''/></Bubble>
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
            <MStar><img src={star} alt=''/></MStar>
            <MTxtDiv><img src={line1} alt=''/></MTxtDiv>
            <MTxtDiv2><img src={line2} alt=''/></MTxtDiv2>
            <MTxtDiv3><img src={line3} alt=''/></MTxtDiv3>
        </MTxtWrapper>
        <MBigStar><img src={bigstar} alt=''/></MBigStar>
        <MJeanPocket><MJeanImg src={jean_pocket} alt=''/></MJeanPocket>
        <MBubble><MBubbleImg src={bubble} alt=''/></MBubble>
        <MSubTxtDiv>
            <MLine1>모아두고 싶었던 티켓들을</MLine1>
            <MFlexBox>
                <MLine2>이제는</MLine2>
                <MSmallLogo><LogoIcon fill='white' style={{height:'15px', width:'84.98px'}}/></MSmallLogo>
                <MLine1>을 통해 아카이빙하세요!</MLine1>
            </MFlexBox>
            <MBlackTxt>흩어져있던 모바일 티켓과 지류 티켓을 한 번에</MBlackTxt>
        </MSubTxtDiv>
    </MWrapper>
    }
    </>
    );
};

export default Landing1;

const MWrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 80px);
    background-color: #E65A2E;
    position: relative;
    z-index: 2;
`
const MTxtWrapper = styled.div`
    display: block;
    padding-top: 7vh;
    position: relative;
    z-index: 1;
    padding-left: 10vw;
`
const MTxtDiv = styled.div`
    > img {
        height: 5vh;
    }
`
const MTxtDiv2 = styled.div`
    padding-top: 30px;
    > img {
        height: 6vh;
    }
`
const MTxtDiv3 = styled.div`
    padding-top: 30px;
    > img {
        height: 6vh;
    }
`
const MStar = styled.div`
    position: absolute;
    z-index: -1;
    top: 0.5vh;
    left: 23vw;
    > img {
        width: 70px;
    }
`
const MBigStar = styled.div`
    position: absolute;
    z-index: -1;
    top: 25vh;
    right: 5vw;
    > img {
        height: 30vh;
    }
`
const MJeanPocket = styled.div`
    position: absolute;
    z-index: 1;
    top: 35vh;
    right: 6vw;
`
const MJeanImg = styled.img`
    height: 24vh;
`
const MBubble = styled.div`
    position: absolute;
    top: 45vh;
    left: 10vw;
`
const MBubbleImg = styled.img`
    width: 70px;
`
const MSubTxtDiv = styled.div`
    color: white;
    font-size: 18px;
    font-weight: 700;
    margin-left: 10vw;
    margin-top: 30vh;
`
const MLine1 = styled.div``
const MLine2 = styled.div`
    margin-right: 5px;
`
const MFlexBox = styled.div`
    display: flex;
    margin-top: 5px;
`
const MSmallLogo = styled.div``
const MBlackTxt = styled.div`
    margin-top: 15px;
    color: #252525;
    font-size: 15px;
`