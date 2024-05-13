import React from 'react';
import styled from 'styled-components';
import { IoCheckmarkSharp } from "react-icons/io5";
import { ReactComponent as LogoIcon } from '../images/pocketlogo_white.svg';
import one from '../images/first.svg';
import two from '../images/second.svg';
import three from '../images/third.svg';

const Wrapper2 = styled.div`
    height: calc(100vh - 80px);
    background-color: white;
    position: relative;
    z-index: 2;
    padding-left: 6vw;
    padding-right: 6vw;
`
const FlexBox = styled.div`
    display: flex;
    margin-top: 100px;
    justify-content: space-between;
`
const Explain = styled.div`
    >div {
        font-size: 40px;
        font-weight: bolder;
        margin-bottom: 10px;
    }
`
const LineTxt = styled.div`
    display: flex;
`
const BlackLine = styled.div`
    width: 30vw;
    height: 15px;
    background-color: #1B1B1B;
    margin-top: 70px;
`
const TicketTxt = styled.div`
    font-size: 55px;
    font-weight: bolder;
    margin-top: 45px;
    margin-left: 30px;
`
const SubTxt = styled.div`
    margin-top: 30px;
    >div {
        font-size: 25px;
        font-weight: 600;
        margin-bottom: 5px;
    }
`
const SmallLogo = styled.div`
    height: 25px;
    margin-top: 5px;
    margin-left: 10px;
`
const Title = styled.div`
    display: flex;
    line-height: 35px;
    justify-content: center;
    margin-bottom: 20px;
`
const TitleTxt = styled.div`
    >div {
        font-size: 25px;
        font-weight: 600;
        margin-left: 10px;
    }
`
const Rule = styled.div`
    width: 40vw;
    position: absolute;
    right: 6vw;
`
const RuleBox = styled.div`
    width: 100%;
    background-color: #393939;
    border-radius: 20px;
    padding: 30px 0;
    margin-bottom: 10px;
`
const Number = styled.div`
    display: flex;
    > img {
        height: 25px;
        margin-right: 10px;
        margin-left: 50px;
    }
    > div {
        font-size: 20px;
        line-height: 25px;
        font-weight: 600;
        color: white;
    }
`

const Landing2 = () => {
    return (
        <Wrapper2>
            <FlexBox>
                <Explain>
                <div>내 경험의 증표이자 </div>
                <div>문화생활을 기록하는 수단</div>
                </Explain>
                <LineTxt>
                    <BlackLine/>
                    <TicketTxt>티켓!</TicketTxt>
                </LineTxt>
            </FlexBox>
            <SubTxt>
                <div>티켓을 나만의 주머니에 손쉽게 저장해보세요.</div>
                <div>티켓 사진을 통해 직접 입력하는 수고 없이 </div>
                <div>간편한 업로드가 가능해요. 👀</div>
            </SubTxt>
            <Rule>
                <Title>
                    <IoCheckmarkSharp size='35' color='#E65A2E'/>
                    <TitleTxt><div>한 눈에 보는</div></TitleTxt>
                    <SmallLogo><LogoIcon fill='black'/></SmallLogo>
                    <TitleTxt><div>사용법</div></TitleTxt>
                </Title>
                <RuleBox>
                    <Number>
                        <img src={one} alt=''/>
                        <div>티켓들을 아카이빙할 나만의 포켓을 만들어요</div>
                    </Number>
                </RuleBox>
                <RuleBox>
                    <Number>
                        <img src={two} alt=''/>
                        <div>티켓 사진을 업로드하고 자동입력된 내용을 확인해요</div>
                    </Number>
                </RuleBox>
                <RuleBox>
                    <Number>
                        <img src={three} alt=''/>
                        <div>함께한 사람, 후기 등을 작성하면 나만의 티켓북 완성!</div>
                    </Number>
                </RuleBox>
            </Rule>
        </Wrapper2>
    );
};

export default Landing2;