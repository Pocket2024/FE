import React, { useEffect, useId, useState } from "react";
import styled from "styled-components";
import Ticket from "./Ticket";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { MdNavigateBefore } from "react-icons/md";
import { useResponsive } from "../context/Responsive";
import { FaPlus } from "react-icons/fa6";

const List = styled.div`
  display: block;
  margin-top: 30px;
  padding-bottom: 10vh;
`;
const TicketDiv = styled.div`
  margin-bottom: 30px;
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

const TicketList = () => {
  let { pocket } = useParams();
  const userId = localStorage.getItem("userId");
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [ticketlist, setTicketList] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { isDesktop } = useResponsive();

  const getTicketList = () => {
    api
      .get(`/api/reviews/category/${pocket}?userId=${userId}`, {
        headers: {
          Authorization: `${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        setCategory(res.data[0].ticketcategory.category);
        setTicketList(res.data);
      })
      .catch((err) => {
        console.log("get ticketlist error", err);
      });
  };

  useEffect(() => {
    getTicketList();
  }, []);

  return (
    <>
      <CategoryLine
        padding={isDesktop ? "" : "0 30px"}
        fontsize={isDesktop ? "30px" : "25px"}
      >
        <div gap={isDesktop ? "10px" : "5px"}>
          <MdNavigateBefore
            color="#A9A9A9"
            size={isDesktop ? 50 : 30}
            onClick={() => navigate("/myticket")}
            style={{ cursor: "pointer" }}
          />
          <div className="name">{category}</div>
          <div className="pocket">포켓</div>
        </div>
        <CreateBtn
          onClick={() =>
            navigate("/upload", {
              state: { categoryName: category, categoryId: pocket },
            })
          }
        >
          <FaPlus />
          <span>티켓 추가하기</span>
        </CreateBtn>
      </CategoryLine>
      <List>
        {ticketlist.map((ticket) => (
          <>
            <TicketDiv
              key={ticket.id}
              onClick={() =>
                isDesktop
                  ? navigate(`/myticket/${pocket}/${ticket.id}`)
                  : navigate(`/detail/${ticket.id}`)
              }
            >
              <Ticket
                title={ticket.title}
                place={ticket.location}
                seat={ticket.seat}
                year={ticket.date.substr(0, 4)}
                date={ticket.date.substr(5, 9)}
                custom={ticket.customImageUrl}
              />
            </TicketDiv>
          </>
        ))}
      </List>
    </>
  );
};

export default TicketList;
