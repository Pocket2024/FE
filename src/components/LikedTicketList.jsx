import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Ticket from "./Ticket";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { MdNavigateBefore } from "react-icons/md";
import { useResponsive } from "../context/Responsive";
import useNotificationStore from "../store/notificationStore";

const List = styled.div`
  display: block;
  margin-top: 30px;
  padding: ${(props) => props.padding || "0 0 10vh 0 "};
`;
const TicketDiv = styled.div`
  margin-bottom: 30px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isSelected ? "#4f4f4f" : "transparent"};
  &:hover {
    background-color: #4f4f4f;
  }
  cursor: pointer;
`;
const CategoryLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontsize};
  div {
    gap: ${(props) => props.gap};
    display: flex;
    align-items: center;
  }
  .name {
    font-weight: 700;
    color: white;
  }
`;

const LikedTicketList = () => {
  let { pocket } = useParams();
  let { otheruserId } = useParams();
  const userId = localStorage.getItem("userId");
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [ticketlist, setTicketList] = useState([]);
  const navigate = useNavigate();
  const { isDesktop } = useResponsive();
  const [selectedTicketId, setSelectedTicketId] = useState(null); // 클릭된 티켓 ID를 추적

  useEffect(() => {
    const getTicketList = () => {
      api
        .get(`/api/reviews/liked?userId=${userId}`, {
          headers: {
            Authorization: `${ACCESS_TOKEN}`,
          },
        })
        .then((res) => {
          setTicketList(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log("get liked ticketlist error", err);
        });
    };

    getTicketList();
  }, [pocket, userId, ACCESS_TOKEN]);

  const handleTicketClick = (ticketId) => {
    setSelectedTicketId(ticketId); // 클릭된 티켓 ID를 설정
    navigate(`/myticket/like/${ticketId}`);
  };
  return (
    <>
      <CategoryLine
        padding={isDesktop ? "" : "0 30px"}
        fontsize={isDesktop ? "30px" : "18px"}
      >
        <div gap={isDesktop ? "10px" : "5px"}>
          <MdNavigateBefore
            color="#A9A9A9"
            size={isDesktop ? 50 : 30}
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          />
          <div className="name">내가 좋아요 누른 티켓</div>
        </div>
      </CategoryLine>
      {ticketlist.length === 0 && <None>티켓이 없습니다.</None>}
      <List padding={isDesktop ? "" : "0 30px 10vh 30px"}>
        {ticketlist.map((ticket) => (
          <>
            <TicketDiv
              isSelected={ticket.id === selectedTicketId}
              key={ticket.id}
              onClick={
                () => handleTicketClick(ticket.id) // 클릭 이벤트 핸들러
              }
            >
              <Ticket
                title={ticket.title}
                place={ticket.location}
                seat={ticket.seat}
                year={ticket.date.substr(0, 4)}
                date={ticket.date.substr(5, 9)}
                custom={ticket.customImageUrl}
                isprivate={ticket.private}
              />
            </TicketDiv>
          </>
        ))}
      </List>
    </>
  );
};

export default LikedTicketList;

const None = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: #afafaf;
  font-size: 20px;
  font-size: 500;
  margin-top: 100px;
`;
