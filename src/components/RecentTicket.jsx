import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Ticket from "./Ticket";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import api from "../api/api";
import TicketModal from "./TicketModal";
import { useNavigate } from "react-router-dom";

const RecentTitle = styled.div`
  font-weight: 700;
  font-size: ${(props) => props.fontSize};
  color: white;
  margin: 100px 0 20px 0;
`;

const RecentList = styled.div`
  .pcdiv {
    display: grid;
    grid-template-columns: repeat(2, 45%);
    justify-content: space-between;
    gap: 30px 0;
  }
  .mobilediv {
  }
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
  cursor: pointer;
  img.pc {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  img.mobile {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
  div.pc {
    color: white;
    font-size: 18px;
    font-weight: 600;
  }
  div.mobile {
    color: white;
    font-size: 15px;
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
  const [recentticket, setRecentticket] = useState([]);
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [modal, setModal] = useState(false);
  const userId = localStorage.getItem("userId");
  const [islike, setIslike] = useState(false); // 유저가 좋아요를 눌렀을 때 다시 useEffect 실행시키기 위함

  useEffect(() => {
    const getRecentTicket = () => {
      api
        .get("/api/reviews/latest", {
          headers: {
            Authorization: `${ACCESS_TOKEN}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setRecentticket(res.data.slice(0, 4));
          setIslike(false);
        })
        .catch((err) => {
          console.log("get recent ticket err", err);
        });
    };

    getRecentTicket();
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

  const navigate = useNavigate();

  return (
    <>
      <RecentTitle fontSize={isDesktop ? "25px" : "17px"}>
        🚀 가장 최신 티켓
      </RecentTitle>
      <RecentList className={isDesktop ? "pc" : "mobile"}>
        <div className={isDesktop ? "pcdiv" : "mobilediv"}>
          {recentticket.map((hot) => (
            <div style={!isDesktop ? { marginBottom: "20px" } : {}}>
              <FlexLine>
                <ProfileLine>
                  <img
                    src={hot.authorProfileImageUrl}
                    className={isDesktop ? "pc" : "mobile"}
                  />
                  <div className={isDesktop ? "pc" : "mobile"}>
                    {hot.authorNickname}
                  </div>
                </ProfileLine>
                <Heart>
                  {hot.likedByCurrentUser ? (
                    <FaHeart
                      color="white"
                      onClick={() =>
                        handleHeart(hot.id, hot.likedByCurrentUser)
                      }
                      size={isDesktop ? 20 : 15}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <FaRegHeart
                      color="#8F8F8F"
                      onClick={() =>
                        handleHeart(hot.id, hot.likedByCurrentUser)
                      }
                      size={isDesktop ? 20 : 15}
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
        </div>
      </RecentList>
    </>
  );
};

export default RecentTicket;
