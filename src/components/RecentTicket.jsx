import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Ticket from "./Ticket";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import api from "../api/api";
import TicketModal from "./TicketModal";

const RecentTitle = styled.div`
  font-weight: 700;
  font-size: 25px;
  color: white;
  margin: 100px 0 20px 0;
`;

const RecentList = styled.div`
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
    object-fit: cover;
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

const RecentTicket = () => {
  const isDesktop = useMediaQuery({ minWidth: 1220 });
  const [isHeart, setIsHeart] = useState(false);
  const [recentticket, setRecentticket] = useState([]);
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const getRecentTicket = () => {
      api
        .get("/api/reviews/popular", {
          headers: {
            Authorization: `${ACCESS_TOKEN}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setRecentticket(res.data.slice(0, 4));
        })
        .catch((err) => {
          console.log("get recent ticket err", err);
        });
    };

    getRecentTicket();
  }, [ACCESS_TOKEN]);

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
          <RecentTitle>🚀 가장 최신 티켓</RecentTitle>
          <RecentList>
            {recentticket.map((hot) => (
              <div>
                <FlexLine>
                  <ProfileLine>
                    <img src={hot.authorProfileImageUrl} />
                    <div>{hot.authorNickname}</div>
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
                    {hot.likes}
                  </Heart>
                </FlexLine>
                <div onClick={handleTicket}>
                  <Ticket
                    key={hot.id}
                    title={hot.title}
                    place={hot.place}
                    seat={hot.seat}
                    year={hot.date.substr(0, 4)}
                    date={hot.date.substr(5, 9)}
                    custom={hot.customImageUrl}
                  />
                </div>
                <TicketModal
                  isOpen={modal}
                  onRequestClose={() => setModal(false)}
                  info={hot}
                />
              </div>
            ))}
          </RecentList>
        </>
      ) : (
        <Ticket />
      )}
    </>
  );
};

export default RecentTicket;
