import React from "react";
import styled, { keyframes } from "styled-components";
import { IoCheckmarkSharp } from "react-icons/io5";
import { ReactComponent as LogoIcon } from "../images/pocketlogo_white.svg";
import one from "../images/first.svg";
import two from "../images/second.svg";
import three from "../images/third.svg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-scroll/modules";
import { useResponsive } from "../context/Responsive";

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

const Wrapper2 = styled.div`
  height: 100vh;
  background-color: white;
  position: relative;
  z-index: 2;
  padding: calc(80px + 5vh) 6vw;
`;
const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Explain = styled.div`
  > div {
    font-size: 40px;
    font-weight: bolder;
    margin-bottom: 10px;
  }
`;
const LineTxt = styled.div`
  display: flex;
`;
const BlackLine = styled.div`
  width: 30vw;
  height: 15px;
  background-color: #1b1b1b;
  margin-top: 70px;
`;
const TicketTxt = styled.div`
  font-size: 55px;
  font-weight: bolder;
  margin-top: 45px;
  margin-left: 30px;
`;
const SubTxt = styled.div`
  margin-top: 30px;
  > div {
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 5px;
  }
`;
const SmallLogo = styled.div`
  height: 25px;
  margin-top: 5px;
  margin-left: 10px;
`;
const Title = styled.div`
  display: flex;
  line-height: 35px;
  justify-content: center;
  margin-bottom: 20px;
`;
const TitleTxt = styled.div`
  > div {
    font-size: 25px;
    font-weight: 600;
    margin-left: 10px;
  }
`;
const Rule = styled.div`
  width: 40vw;
  position: absolute;
  right: 6vw;
`;
const RuleBox = styled.div`
  width: 100%;
  background-color: #393939;
  border-radius: 20px;
  padding: 30px 0;
  margin-bottom: 10px;
`;
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
`;
const ArrowDiv = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 3vh;
  left: 48%;
  animation: ${arrow} 2s infinite;
  cursor: pointer;
`;

const Landing2 = () => {
  const { isDesktop } = useResponsive();

  return (
    <>
      {isDesktop ? (
        <Wrapper2 id="2">
          <FlexBox>
            <Explain>
              <div>내 경험의 증표이자 </div>
              <div>문화생활을 기록하는 수단</div>
            </Explain>
            <LineTxt>
              <BlackLine />
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
              <IoCheckmarkSharp size="35" color="#CA3525" />
              <TitleTxt>
                <div>한 눈에 보는</div>
              </TitleTxt>
              <SmallLogo>
                <LogoIcon fill="black" />
              </SmallLogo>
              <TitleTxt>
                <div>사용법</div>
              </TitleTxt>
            </Title>
            <RuleBox>
              <Number>
                <img src={one} alt="" />
                <div>티켓들을 아카이빙할 나만의 포켓을 만들어요</div>
              </Number>
            </RuleBox>
            <RuleBox>
              <Number>
                <img src={two} alt="" />
                <div>티켓 사진을 업로드하고 자동입력된 내용을 확인해요</div>
              </Number>
            </RuleBox>
            <RuleBox>
              <Number>
                <img src={three} alt="" />
                <div>함께한 사람, 후기 등을 작성하면 나만의 티켓북 완성!</div>
              </Number>
            </RuleBox>
          </Rule>
          <Link to="3" spy={true} smooth={true} duration={1}>
            <ArrowDiv>
              <MdKeyboardArrowDown size={80} fill="rgba(121,121,121,0.55)" />
            </ArrowDiv>
          </Link>
        </Wrapper2>
      ) : (
        <MWrapper2 id="2m">
          <MFlexBox>
            <MExplain>
              <div>내 경험의 증표이자 </div>
              <div>문화생활을 기록하는 수단</div>
            </MExplain>
            <MLineTxt>
              <MBlackLine />
              <MTicketTxt>티켓!</MTicketTxt>
            </MLineTxt>
          </MFlexBox>
          <MSubTxt>
            <div>티켓을 나만의 주머니에 손쉽게 저장해보세요.</div>
            <div>티켓 사진을 통해 직접 입력하는 수고 없이 </div>
            <div>간편한 업로드가 가능해요. 👀</div>
          </MSubTxt>
          <MRule>
            <MTitle>
              <IoCheckmarkSharp size="15" color="#E65A2E" />
              <MTitleTxt>
                <div>한 눈에 보는</div>
              </MTitleTxt>
              <MSmallLogo>
                <LogoIcon
                  fill="black"
                  style={{ height: "10px", width: "56.65px" }}
                />
              </MSmallLogo>
              <MTitleTxt>
                <div>사용법</div>
              </MTitleTxt>
            </MTitle>
            <MRuleBox>
              <MNumber>
                <img src={one} alt="" />
                <div>티켓들을 아카이빙할 나만의 포켓을 만들어요</div>
              </MNumber>
            </MRuleBox>
            <MRuleBox>
              <MNumber>
                <img src={two} alt="" />
                <div>티켓 사진을 업로드하고 자동입력된 내용을 확인해요</div>
              </MNumber>
            </MRuleBox>
            <MRuleBox>
              <MNumber>
                <img src={three} alt="" />
                <div>함께한 사람, 후기 등을 작성하면 나만의 티켓북 완성!</div>
              </MNumber>
            </MRuleBox>
          </MRule>
          <Link to="3m" spy={true} smooth={true} duration={1}>
            <MArrowDiv>
              <MdKeyboardArrowDown size={50} fill="rgba(121,121,121,0.55)" />
            </MArrowDiv>
          </Link>
        </MWrapper2>
      )}
    </>
  );
};

export default Landing2;

const MWrapper2 = styled.div`
  height: 100vh;
  padding: calc(80px + 3vh) 8vw;
  background-color: white;
  position: relative;
  z-index: 2;
`;
const MFlexBox = styled.div`
  display: flex;
  margin-top: 3vh;
  justify-content: space-between;
`;
const MExplain = styled.div`
  > div {
    font-size: 17px;
    font-weight: bolder;
    margin-bottom: 2px;
  }
`;
const MLineTxt = styled.div`
  display: flex;
`;
const MBlackLine = styled.div`
  width: 20vw;
  height: 4px;
  background-color: #1b1b1b;
  margin-top: 40px;
`;
const MTicketTxt = styled.div`
  font-size: 20px;
  font-weight: 800;
  margin-top: 25px;
  margin-left: 10px;
`;
const MSubTxt = styled.div`
  margin-top: 20px;
  > div {
    font-size: 13px;
    font-weight: 600;
  }
`;
const MSmallLogo = styled.div`
  height: 12px;
  margin-left: 7px;
`;
const MTitle = styled.div`
  display: flex;
  line-height: 12px;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 30px;
`;
const MTitleTxt = styled.div`
  > div {
    font-size: 10px;
    font-weight: 600;
    margin-left: 5px;
    margin-top: 2px;
  }
`;
const MRule = styled.div``;
const MRuleBox = styled.div`
  width: 100%;
  background-color: #393939;
  border-radius: 20px;
  padding: 30px 0;
  margin-bottom: 10px;
`;
const MNumber = styled.div`
  display: flex;
  > img {
    height: 12px;
    margin-right: 10px;
    margin-left: 20px;
  }
  > div {
    font-size: 12px;
    line-height: 12px;
    font-weight: 600;
    color: white;
  }
`;

const MArrowDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2vh;
  animation: ${arrow} 2s infinite;
  cursor: pointer;
`;
