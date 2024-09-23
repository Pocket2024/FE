import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Ticket from "./Ticket";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import TicketModal from "./TicketModal";
import { useResponsive } from "../context/Responsive";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "../store/notificationStore";

const HotTitle = styled.div`
  font-weight: 700;
  font-size: ${(props) => props.fontSize};
  color: white;
  margin: 50px 0 20px 0;
`;

const HotList = styled.div`
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

const HotTicket = () => {
  const { isDesktop } = useResponsive();
  const [modal, setModal] = useState(false);
  const [hotticket, setHotticket] = useState([]);
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const [islike, setIslike] = useState(false); // 유저가 좋아요를 눌렀을 때 다시 useEffect 실행시키기 위함
  const [selected, setSelected] = useState([]);
  const { showNotification } = useNotificationStore();

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
          showNotification("♡ 좋아요 취소");
          setIslike(true);
        })
        .catch((err) => {
          showNotification("⚠️ 좋아요 취소가 반영되지 못했어요.");
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
          showNotification("♥ 좋아요");
          setIslike(true);
        })
        .catch((err) => {
          showNotification("⚠️ 좋아요가 반영되지 못했어요.");
          console.log("좋아요 err", err);
        });
    }
  };

  const handleTicket = (hot) => {
    setModal(true);
    setSelected(hot);
  };

  const navigate = useNavigate();

  return (
    <>
      <HotTitle fontSize={isDesktop ? "25px" : "17px"}>
        🔥 지금 핫한 티켓
      </HotTitle>
      <HotList>
        <div className={isDesktop ? "pcdiv" : "mobilediv"}>
          {hotticket.map((hot) => (
            <div
              key={hot.id}
              style={!isDesktop ? { marginBottom: "20px" } : {}}
            >
              <TicketModal
                isOpen={modal}
                onRequestClose={() => setModal(false)}
                info={selected}
              />
              <FlexLine>
                <ProfileLine onClick={() => navigate(`/user/${hot.authorId}`)}>
                  <img
                    src={hot.authorProfileImageUrl}
                    alt="profileimg"
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
              <div onClick={() => handleTicket(hot)}>
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
            </div>
          ))}
        </div>
      </HotList>
    </>
  );
};

export default HotTicket;

const MHotList = styled.div``;
