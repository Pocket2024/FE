import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Ticket from "./Ticket";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { MdNavigateBefore } from "react-icons/md";
import { useResponsive } from "../context/Responsive";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
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
  .pocket {
    font-weight: 700;
    color: white;
    margin-left: 5px;
    margin-right: 10px;
  }
  .delete-btn {
    background-color: #323232;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    cursor: pointer;
    padding: 10px;
    &:hover {
      background-color: #4a4a4a;
    }
  }
`;
const CreateBtn = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 20px;
  background-color: #323232;
  color: #aeaeae;
  font-size: 15px;
  font-weight: 600;
  span {
    margin-left: 5px;
  }
  &:hover {
    color: white;
    background-color: #4a4a4a;
  }
`;

const TicketList = ({ date }) => {
  let { pocket } = useParams();
  let { otheruserId } = useParams();
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [ticketlist, setTicketList] = useState([]);
  const [category, setCategory] = useState(location.state);
  const navigate = useNavigate();
  const { isDesktop } = useResponsive();
  const [selectedTicketId, setSelectedTicketId] = useState(null); // 클릭된 티켓 ID를 추적
  const { showNotification } = useNotificationStore();

  useEffect(() => {
    const getTicketList = () => {
      api
        .get(
          date
            ? `/api/reviews/bydates?userId=${userId}&date=${date}`
            : `/api/reviews/category/${pocket}?userId=${userId}`,
          {
            headers: {
              Authorization: `${ACCESS_TOKEN}`,
            },
          }
        )
        .then((res) => {
          if (res.data[0].ticketcategory.category) {
            setCategory(res.data[0].ticketcategory.category);
          }
          setTicketList(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log("get ticketlist error", err);
        });
    };

    getTicketList();
  }, [pocket, userId, ACCESS_TOKEN]);

  const handleTicketClick = (ticketId) => {
    setSelectedTicketId(ticketId); // 클릭된 티켓 ID를 설정
    if (isDesktop) {
      if (date) {
        navigate(`/myticket/calendar/${date}/${ticketId}`);
      } else {
        otheruserId
          ? navigate(`/user/${otheruserId}/${pocket}/${ticketId}`)
          : navigate(`/myticket/${pocket}/${ticketId}`);
      }
    } else {
      navigate(`/detail/${ticketId}`);
    }
  };

  const handleDeletePocket = () => {
    api
      .delete(`/api/categories/${pocket}?userId=${userId}`, {
        headers: {
          Authorization: `${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        showNotification("🗑️ 포켓이 삭제 되었습니다.");
        navigate("/myticket");
      })
      .catch((err) => {
        showNotification("⚠️ 포켓을 삭제하는데 실패했습니다.");
        console.log("pocket delete error", err);
      });
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
            onClick={() =>
              otheruserId ? navigate(`/user/${otheruserId}`) : navigate(-1)
            }
            style={{ cursor: "pointer" }}
          />
          <div className="name">{date ? date : category}</div>
          {!date && <div className="pocket">포켓</div>}
          {!date && !otheruserId && (
            <div className="delete-btn" onClick={handleDeletePocket}>
              <FaTrash size={15} color="#aeaeae" />
            </div>
          )}
        </div>
        {!date && !otheruserId && (
          <CreateBtn
            onClick={() =>
              navigate("/upload", {
                state: { categoryName: category, categoryId: pocket },
              })
            }
          >
            <FaPlus />
            <span style={{ fontSize: "12px" }}>티켓 추가하기</span>
          </CreateBtn>
        )}
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

export default TicketList;

const None = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: #afafaf;
  font-size: 20px;
  font-size: 500;
  margin-top: 100px;
`;
