import React from "react";
import styled, { keyframes } from "styled-components";
import txt_ticket from "../images/ticket_txt.svg";
import txt_inmy from "../images/inmy_txt.svg";
import txt_pocket from "../images/pocket_txt.svg";
import icon_ticket from "../images/ticket.svg";
import icon_star from "../images/star.svg";
import icon_pocket from "../images/pocket.svg";
import { ReactComponent as LogoIcon } from "../images/pocketlogo_white.svg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-scroll/modules";
import { useResponsive } from "../context/Responsive";

const roll = keyframes`
    0% {
        transform: translateX(0);
        }
    100% {
        transform: translateX(-100%);
        }
`;
const reverse_roll = keyframes`
    0% {
        transform: translateX(-100%);
        }
    100% {
        transform: translateX(0);
        }
`;
const arrow = keyframes`
    0% {
    transform: translate(0, 0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(0, 20px);
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  height: calc(100vh - 80px);
  background-color: #262626;
  position: relative;
  z-index: 2;
`;
const TxtWrapper = styled.div`
  display: flex;
  white-space: nowrap;
`;
const TxtDiv = styled.div`
  margin-top: 12vh;
  display: flex;
  height: 15vh;
  line-height: 10vh;
  animation: ${roll} 20s linear infinite;
  .roll2:last-child & {
    animation-delay: 20s;
  }
  gap: 0 3vw;
  margin-left: 3vw;
`;
const ReTxtDiv = styled.div`
  margin-top: 5vh;
  display: flex;
  height: 15vh;
  line-height: 10vh;
  animation: ${reverse_roll} 20s linear infinite;
  .roll2:last-child & {
    animation-delay: 20s;
  }
  gap: 0 3vw;
  margin-left: 3vw;
`;
const SubTxtDiv = styled.div`
  padding-left: 12vw;
  color: white;
  font-size: 25px;
  font-weight: 700;
  margin-top: 10vh;
`;
const Line1 = styled.div``;
const Line2 = styled.div`
  margin-right: 13px;
`;
const FlexBox = styled.div`
  display: flex;
  margin-top: 10px;
`;
const SmallLogo = styled.div`
  height: 25px;
`;
const BlackTxt = styled.div`
  margin-top: 20px;
  color: #b5b5b5;
  font-size: 20px;
`;
const ArrowDiv = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  animation: ${arrow} 2s infinite;
  cursor: pointer;
  > MdKeyboardArrowDown {
    position: absolute;
    bottom: 0;
  }
`;
const Landing1 = () => {
  const { isDesktop } = useResponsive();
  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <TxtWrapper>
            <TxtDiv className="roll1">
              <img src={txt_ticket} alt="" />
              <img src={icon_ticket} alt="" />
              <img src={txt_inmy} alt="" />
              <img src={icon_star} alt="" />
              <img src={txt_pocket} alt="" />
              <img src={icon_pocket} alt="" />
            </TxtDiv>
            <TxtDiv className="roll2">
              <img src={txt_ticket} alt="" />
              <img src={icon_ticket} alt="" />
              <img src={txt_inmy} alt="" />
              <img src={icon_star} alt="" />
              <img src={txt_pocket} alt="" />
              <img src={icon_pocket} alt="" />
            </TxtDiv>
          </TxtWrapper>
          <TxtWrapper>
            <ReTxtDiv className="roll1">
              <img src={txt_pocket} alt="" />
              <img src={icon_pocket} alt="" />
              <img src={txt_ticket} alt="" />
              <img src={icon_ticket} alt="" />
              <img src={txt_inmy} alt="" />
              <img src={icon_star} alt="" />
            </ReTxtDiv>
            <ReTxtDiv className="roll2">
              <img src={txt_pocket} alt="" />
              <img src={icon_pocket} alt="" />
              <img src={txt_ticket} alt="" />
              <img src={icon_ticket} alt="" />
              <img src={txt_inmy} alt="" />
              <img src={icon_star} alt="" />
            </ReTxtDiv>
          </TxtWrapper>
          <SubTxtDiv>
            <Line1>모아두고 싶었던 티켓들을</Line1>
            <FlexBox>
              <Line2>이제는</Line2>
              <SmallLogo>
                <LogoIcon fill="white" />
              </SmallLogo>
              <Line1>을 통해 아카이빙하세요!</Line1>
            </FlexBox>
            <BlackTxt>흩어져있던 모바일 티켓과 지류 티켓을 한 번에</BlackTxt>
          </SubTxtDiv>
          <Link to="2" spy={true} smooth={true} duration={1}>
            <ArrowDiv>
              <MdKeyboardArrowDown size={80} fill="rgba(255,255,255,0.55)" />
            </ArrowDiv>
          </Link>
        </Wrapper>
      ) : (
        <MWrapper>
          <MTxtWrapper>
            <MTxtDiv>
              <img src={txt_ticket} alt="" />
              <img src={icon_ticket} alt="" />
            </MTxtDiv>
            <MTxtDiv2>
              <div>
                <img src={icon_star} alt="" id="star" />
                <img src={txt_inmy} alt="" />
              </div>
            </MTxtDiv2>
            <MTxtDiv3>
              <img src={txt_pocket} alt="" />
              <img src={icon_pocket} alt="" />
            </MTxtDiv3>
          </MTxtWrapper>
          <MSubTxtDiv>
            <MLine1>모아두고 싶었던 티켓들을</MLine1>
            <MFlexBox>
              <MLine2>이제는</MLine2>
              <MSmallLogo>
                <LogoIcon
                  fill="white"
                  style={{ height: "15px", width: "84.98px" }}
                />
              </MSmallLogo>
              <MLine1>을 통해 아카이빙하세요!</MLine1>
            </MFlexBox>
            <MBlackTxt>흩어져있던 모바일 티켓과 지류 티켓을 한 번에</MBlackTxt>
          </MSubTxtDiv>
          <Link to="2m" spy={true} smooth={true} duration={1}>
            <ArrowDiv>
              <MdKeyboardArrowDown size={50} fill="rgba(255,255,255,0.55)" />
            </ArrowDiv>
          </Link>
        </MWrapper>
      )}
    </>
  );
};

export default Landing1;

const lotate = keyframes`
    0% {
      transform : rotate(0deg)
    }
  
    50% {
      transform : rotate(180deg)
    }
  
    100% {
      transform : rotate(360deg)
    }
`;

const MWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  background-color: #262626;
  position: relative;
  z-index: 2;
`;
const MTxtWrapper = styled.div`
  display: block;
  position: relative;
  z-index: 1;
  padding: 0 7vw;
  padding-top: 10vh;
`;
const MTxtDiv = styled.div`
  display: flex;
  gap: 5vw;
  img {
    height: 6vh;
  }
`;
const MTxtDiv2 = styled.div`
  padding-top: 7vh;
  display: flex;
  img {
    height: 6vh;
  }
  div {
    margin-left: auto;
    display: flex;
    gap: 5vw;
    #star {
      animation: ${lotate} 3s linear infinite;
    }
  }
`;
const MTxtDiv3 = styled.div`
  padding-top: 7vh;
  display: flex;
  gap: 5vw;
  img {
    height: 6vh;
  }
`;
const MSubTxtDiv = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 500;
  margin: 10vh 0 2vh 10vw;
`;
const MLine1 = styled.div``;
const MLine2 = styled.div`
  margin-right: 5px;
`;
const MFlexBox = styled.div`
  display: flex;
  margin-top: 5px;
`;
const MSmallLogo = styled.div``;
const MBlackTxt = styled.div`
  margin-top: 15px;
  color: #b5b5b5;
  font-size: 15px;
`;
