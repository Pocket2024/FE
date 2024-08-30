import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Ticket from "./Ticket";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import TicketModal from "./TicketModal";
import { useResponsive } from "../context/Responsive";
import api from "../api/api";

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

const HotTicket = () => {
  const { isDesktop } = useResponsive();
  const [modal, setModal] = useState(false);
  const [hotticket, setHotticket] = useState([]);
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const [islike, setIslike] = useState(false); // 유저가 좋아요를 눌렀을 때 다시 useEffect 실행시키기 위함

  useEffect(() => {
    const getHotTicket = () => {
      api
        .get("/api/reviews/popular", {
          headers: {
            Authorization: `${ACCESS_TOKEN}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setHotticket(res.data.slice(0, 4));
          setIslike(false);
        })
        .catch((err) => {
          console.log("get hot ticket err", err);
        });
    };

    getHotTicket();
  }, [ACCESS_TOKEN, islike]);

  const handleHeart = (ticketId, isHeart) => {
    if (isHeart) {
      api
        .delete(`/api/likes/unlike/${ticketId}?userId=${userId}`, {
          headers: {
            Authorization: `${ACCESS_TOKEN}`,
          },
        })
        .then(() => {
          alert("좋아요 취소");
          setIslike(true);
        })
        .catch((err) => {
          console.log("좋아요 취소 err", err);
        });
    } else {
      api
        .post(
          `/api/likes/like/${ticketId}?userId=${userId}`,
          {},
          {
            headers: {
              Authorization: `${ACCESS_TOKEN}`,
            },
          }
        )
        .then(() => {
          alert("좋아요");
          setIslike(true);
        })
        .catch((err) => {
          console.log("좋아요 err", err);
        });
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
            {hotticket.map((hot) => (
              <div>
                <FlexLine>
                  <ProfileLine>
                    <img src={hot.authorProfileImageUrl} />
                    <div>{hot.authorNickname}</div>
                  </ProfileLine>
                  <Heart>
                    {hot.likedByCurrentUser ? (
                      <FaHeart
                        color="white"
                        onClick={() =>
                          handleHeart(hot.id, hot.likedByCurrentUser)
                        }
                        size={20}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <FaRegHeart
                        color="#8F8F8F"
                        onClick={() =>
                          handleHeart(hot.id, hot.likedByCurrentUser)
                        }
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
                    place={hot.location}
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
          </HotList>
        </>
      ) : (
        <Ticket />
      )}
    </>
  );
};

export default HotTicket;
