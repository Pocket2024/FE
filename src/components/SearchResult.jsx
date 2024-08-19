import React, { useState } from "react";
import styled from "styled-components";
import Ticket from "./Ticket";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import TicketModal from "./TicketModal";
import { useResponsive } from "../context/Responsive";

const SearchTitle = styled.div`
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

const SearchResult = ({ results, keyword }) => {
  const { isDesktop } = useResponsive();
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
          <SearchTitle>'{keyword}' 검색 결과</SearchTitle>
          <HotList>
            {results.map((result) => (
              <div key={result.id}>
                <FlexLine>
                  <ProfileLine>
                    <img src={result.authorProfileImageUrl} alt="profile" />
                    <div>{result.authorNickname}</div>
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
                    {result.likes}
                  </Heart>
                </FlexLine>
                <div onClick={handleTicket}>
                  <Ticket
                    key={result.id}
                    title={result.title}
                    place={result.location}
                    seat={result.seat}
                    year={result.date.substr(0, 4)}
                    date={result.date.substr(5, 9)}
                    custom={result.customImageUrl}
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

export default SearchResult;
