import React from "react";
import styled from "styled-components";
import profileimg from "../images/profileimg.png";
import { MdSaveAlt } from "react-icons/md";
import { MdPlace } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa6";

const Wrapper = styled.div``;
const TicketBox = styled.div`
  background-color: white;
  border-radius: 30px;
  width: 100%;
  padding: 50px;
`;
const FirstLine = styled.div`
  width: 100%;
  display: flex;
  line-height: 50px;
  justify-content: space-between;
`;
const ProfileLine = styled.div`
  display: flex;
`;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Nickname = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-left: 15px;
`;
const SaveBtn = styled.div`
  cursor: pointer;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin: 20px 0;
`;
const PlaceLine = styled.div`
  display: flex;
  height: 25px;
  line-height: 25px;
  gap: 0 10px;
  margin: 20px 0;
`;
const Place = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const Seat = styled.div`
  color: #989898;
  font-size: 20px;
  font-weight: 600;
`;

const Detail = () => {
  return (
    <Wrapper>
      <TicketBox>
        <FirstLine>
          <ProfileLine>
            <ProfileImg src={profileimg} />
            <Nickname>포켓몬</Nickname>
          </ProfileLine>
          <SaveBtn>
            <MdSaveAlt color="#DEDEDE" size={40} />
          </SaveBtn>
        </FirstLine>
        <Title>2023 aespa 1st Concert ‘SYNK : HYPER LINE’</Title>
        <PlaceLine>
          <MdPlace size={25} />
          <Place>잠실체육관</Place>
          <Seat>2층 A구역 2열 3</Seat>
        </PlaceLine>
        <PlaceLine>
          <FaRegCalendar size={23} />
          <Place>2023.02.25</Place>
        </PlaceLine>
      </TicketBox>
    </Wrapper>
  );
};

export default Detail;
