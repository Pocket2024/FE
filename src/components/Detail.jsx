import React, { useRef } from "react";
import styled from "styled-components";
import profileimg from "../images/profileimg.png";
import { MdSaveAlt } from "react-icons/md";
import { MdPlace } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa6";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

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
const SaveBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: white;
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
  const ticketRef = useRef();
  const onDownloadBtn = () => {
    const ticket = ticketRef.current; // 현재 티켓 dom에 접근
    const filter = (card) => {
      // button 태그 필터링
      return card.tagName !== "BUTTON";
    };
    domtoimage.toBlob(ticket, { filter: filter }).then((blob) => {
      saveAs(blob, "ticketimg.png"); // png로 저장
    });
  };

  return (
    <Wrapper>
      <TicketBox className="ticketimg" ref={ticketRef}>
        <FirstLine>
          <ProfileLine>
            <ProfileImg src={profileimg} />
            <Nickname>포켓몬</Nickname>
          </ProfileLine>
          <SaveBtn onClick={onDownloadBtn}>
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
