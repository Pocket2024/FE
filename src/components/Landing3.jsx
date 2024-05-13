import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowRoundForward } from "react-icons/io";
import {useMediaQuery} from 'react-responsive';

const Wrapper3 = styled.div`
    height: calc(100vh - 80px);
    background-color: #E65A2E;
    position: relative;
    z-index: 2;
`
const Txt = styled.div`
    color: white;
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    padding-top: 100px;
`
const Button = styled.button`
    display: flex;
    border: none;
    background-color: #161616;
    padding: 30px 100px 30px 80px;
    border-radius: 20px;
    margin: 80px 20px;
    cursor: pointer;
    &:hover {
        background-color: white;
        > div {
            color: #161616;
        }
    }
    > div {
        margin-left: 20px;
        color: white;
        font-size: 30px;
        font-weight: 700;
        line-height: 70px;
    }
`
const ButtonLine = styled.div`
    display: flex;
    justify-content: center;
`

const Landing3 = () => {
    const [isHover, setIsHover] = useState(false);
    const [isHover2, setIsHover2] = useState(false);
    const isDesktop = useMediaQuery({ minWidth: 1220 });
    return (
        <>
        {isDesktop?
        <Wrapper3>
            <Txt>지금 당장 나만의 티켓북을 만들고 싶다면</Txt>
            <ButtonLine>
                <Button 
                    onMouseOver={() => setIsHover(true)}
                    onMouseOut={() => setIsHover(false)}>
                    <IoIosArrowRoundForward color={isHover? '#161616' : 'white'} size={70}/>
                    <div>로그인하기</div>
                </Button>
                <Button
                    onMouseOver={() => setIsHover2(true)}
                    onMouseOut={() => setIsHover2(false)}>
                    <IoIosArrowRoundForward color={isHover2? '#161616' : 'white'} size={70}/>
                    <div>회원가입하기</div>
                </Button>
            </ButtonLine>
        </Wrapper3>
        :
        <MWrapper3>
            <MTxt>지금 당장 나만의 티켓북을 만들고 싶다면</MTxt>
            <MButtonLine>
                <MButton 
                    onMouseOver={() => setIsHover(true)}
                    onMouseOut={() => setIsHover(false)}>
                    <IoIosArrowRoundForward color={isHover? '#161616' : 'white'} size={25}/>
                    <div>로그인하기</div>
                </MButton>
                <MButton
                    onMouseOver={() => setIsHover2(true)}
                    onMouseOut={() => setIsHover2(false)}>
                    <IoIosArrowRoundForward color={isHover2? '#161616' : 'white'} size={25}/>
                    <div>회원가입하기</div>
                </MButton>
            </MButtonLine>
        </MWrapper3>
    }
    </>
    );
};

export default Landing3;

const MWrapper3 = styled.div`
    height: calc(100vh - 80px);
    background-color: #E65A2E;
    position: relative;
    z-index: 2;
`
const MTxt = styled.div`
    color: white;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    padding-top: 100px;
`
const MButton = styled.button`
    display: flex;
    border: none;
    background-color: #161616;
    padding: 20px;
    border-radius: 10px;
    margin: 50px 5px;
    cursor: pointer;
    &:hover {
        background-color: white;
        > div {
            color: #161616;
        }
    }
    > div {
        margin-left: 20px;
        color: white;
        font-size: 15px;
        font-weight: 700;
    }
`
const MButtonLine = styled.div`
    display: flex;
    justify-content: center;
`