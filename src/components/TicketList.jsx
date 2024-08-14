import React, { useEffect, useId, useState } from "react";
import styled from "styled-components";
import Ticket from "./Ticket";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { MdNavigateBefore } from "react-icons/md";
import { useResponsive } from "../context/Responsive";

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
  gap: ${(props) => props.gap};
  align-items: center;
  padding: ${(props) => props.padding};
  .name {
    font-size: ${(props) => props.fontsize};
    font-weight: 700;
    color: white;
  }
  .pocket {
    font-size: ${(props) => props.fontsize};
    font-weight: 700;
    color: white;
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
        gap={isDesktop ? "10px" : "5px"}
        padding={isDesktop ? "" : "0 30px"}
      >
        <MdNavigateBefore
          color="#A9A9A9"
          size={isDesktop ? 50 : 30}
          onClick={() => navigate("/myticket")}
          style={{ cursor: "pointer" }}
        />
        <div className="name" fontsize={isDesktop ? "30px" : "25px"}>
          {category}
        </div>
        <div className="pocket" fontsize={isDesktop ? "30px" : "25px"}>
          포켓
        </div>
      </CategoryLine>
      <List>
        {ticketlist.map((ticket) => (
          <>
            <TicketDiv
              key={ticket.id}
              onClick={() => navigate(`/myticket/${pocket}/${ticket.id}`)}
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
