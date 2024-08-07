import React, { useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Ticket from "./Ticket";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import dummy from "../dummy/hot.json";
import TicketModal from "./TicketModal";

const HotTitle = styled.div`
  font-weight: 700;
  font-size: 25px;
  color: white;
  margin: 50px 0 20px 0;
`;

const HotList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 45%);
  justify-content: space-between;
  gap: 30px 0;
`;
const FlexLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const ProfileLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  div {
    color: white;
    font-size: 18px;
    font-weight: 600;
  }
`;
const Heart = styled.div`
  display: flex;
  color: #8f8f8f;
  gap: 0 10px;
  align-items: center;
  font-weight: 500;
`;

const HotTicket = () => {
  const isDesktop = useMediaQuery({ minWidth: 1220 });
  const [isHeart, setIsHeart] = useState(false);
  const [modal, setModal] = useState(false);

  const handleHeart = () => {
    if (isHeart) {
      setIsHeart(!isHeart);
    } else {
      setIsHeart(!isHeart);
    }
  };
  const handleTicket = () => {
    setModal(true);
  };
  return (
    <>
      {isDesktop ? (
        <>
          <HotTitle>🔥 지금 핫한 티켓</HotTitle>
          <HotList>
            {dummy.data.map((hot) => (
              <div>
                <FlexLine>
                  <ProfileLine>
                    <img src={hot.profileimg} />
                    <div>{hot.nickname}</div>
                  </ProfileLine>
                  <Heart>
                    {isHeart ? (
                      <FaHeart
                        color="white"
                        onClick={handleHeart}
                        size={20}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <FaRegHeart
                        color="#8F8F8F"
                        onClick={handleHeart}
                        size={20}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                    {hot.heart}
                  </Heart>
                </FlexLine>
                <div onClick={handleTicket}>
                  <Ticket
                    key={hot.id}
                    title={hot.title}
                    place={hot.place}
                    seat={hot.seat}
                    year={hot.year}
                    date={hot.date}
                    custom={hot.customimg}
                  />
                </div>
              </div>
            ))}
          </HotList>
          <TicketModal isOpen={modal} onRequestClose={() => setModal(false)} />
        </>
      ) : (
        <Ticket />
      )}
    </>
  );
};

export default HotTicket;
