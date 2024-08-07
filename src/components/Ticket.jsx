import React from "react";
import styled from "styled-components";
import dummy_img from "../images/profileimg.png";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  cursor: pointer;
  padding: ${(props) => props.padding};
`;

const TicketBox = styled.div`
  width: 100%;
  height: ${(props) => props.height || "20vh"};
  position: relative;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  z-index: 1;
  .custom-img {
    width: 100%;
    position: absolute;
    z-index: 2;
    background-blend-mode: overlay;
    opacity: 0.4;
    border-radius: 10px;
    left: 0;
  }
`;
const Title = styled.div`
  color: #262626;
  width: 60%;
  position: absolute;
  z-index: 5;
  top: 2vh;
  left: 2vh;
  font-size: ${(props) => props.fontsize || "20px"};
  font-weight: 900;
`;
const Place = styled.div`
  font-size: ${(props) => props.fontsize || "2vh"};
  font-weight: 700;
  left: 2vh;
  position: absolute;
  z-index: 5;
  bottom: ${(props) => props.bottom || "5vh"};
`;
const Seat = styled.div`
  font-size: ${(props) => props.fontsize || "2vh"};
  font-weight: 700;
  left: 2vh;
  position: absolute;
  z-index: 5;
  bottom: 2vh;
`;
const Date = styled.div`
  font-family: "Montserrat";
  font-weight: 500;
  font-size: ${(props) => props.fontsize || "2vw"};
  position: absolute;
  right: 2vh;
  z-index: 5;
  bottom: 2vh;
  .year {
    padding-left: 5px;
  }
`;
const Circle = styled.div`
  width: 20px !important;
  height: 20px;
  border-radius: 50%;
  background-color: #262626;
  position: absolute;
  z-index: 3;
  left: 70%;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
`;

const Ticket = () => {
  const isDesktop = useMediaQuery({ minWidth: 1220 });
  const navigate = useNavigate();
  const id = 1;
  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <TicketBox>
            <Circle top="-10px" />
            <Title>2024 &TEAM CONCERT TOUR ‘FIRST PAW PRINT’ IN SEOUL</Title>
            <img src={dummy_img} className="custom-img" alt="custom-img" />
            <Place>KBS 아레나</Place>
            <Seat>3층 I구역 2열 1</Seat>
            <Date>
              <div className="year">2024</div>
              <div>02.07</div>
            </Date>
            <Circle bottom="-10px" />
          </TicketBox>
        </Wrapper>
      ) : (
        <Wrapper padding="030px">
          <TicketBox height="130px" onClick={() => navigate(`/detail/${id}`)}>
            <Circle top="-10px" />
            <Title fontsize="13px">
              2024 &TEAM CONCERT TOUR ‘FIRST PAW PRINT’ IN SEOUL
            </Title>
            <img src={dummy_img} className="custom-img" alt="custom-img" />
            <Place fontsize="10px" bottom="4vh">
              KBS 아레나
            </Place>
            <Seat fontsize="10px">3층 I구역 2열 1</Seat>
            <Date fontsize="17px">
              <div className="year">2024</div>
              <div>02.07</div>
            </Date>
            <Circle bottom="-10px" />
          </TicketBox>
        </Wrapper>
      )}
    </>
  );
};

export default Ticket;
