import React from "react";
import styled from "styled-components";
import ticket from "../images/component_ticket.svg";
import dummy_img from "../images/profileimg.png";

const Wrapper = styled.div``;

const TicketBox = styled.div`
  width: 100%;
  height: 20vh;
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
  font-size: 2vh;
  font-weight: 900;
`;
const Place = styled.div`
  font-size: 2vh;
  font-weight: 700;
  left: 2vh;
  position: absolute;
  z-index: 5;
  bottom: 5vh;
`;
const Seat = styled.div`
  font-size: 2vh;
  font-weight: 700;
  left: 2vh;
  position: absolute;
  z-index: 5;
  bottom: 2vh;
`;
const Date = styled.div`
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 3vh;
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
  return (
    <Wrapper>
      <TicketBox>
        <Circle top="-10px" />
        <Title>2024 &TEAM CONCERT TOUR ‘FIRST PAW PRINT’ IN SEOUL</Title>
        <img src={ticket} className="white-ticket" alt="back-img" />
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
  );
};

export default Ticket;
