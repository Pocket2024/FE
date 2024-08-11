import React, { useEffect, useId, useState } from "react";
import styled from "styled-components";
import dummy from "../dummy/hot.json";
import Ticket from "./Ticket";
import { useParams } from "react-router-dom";
import api from "../api/api";

const List = styled.div`
  display: block;
  margin-top: 30px;
`;
const TicketDiv = styled.div`
  margin-bottom: 30px;
`;

const TicketList = ({ onClickTicket }) => {
  let { pocket } = useParams();
  const userId = localStorage.getItem("userId");
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [ticketlist, setTicketList] = useState([]);

  const getTicketList = () => {
    api
      .get(`/api/reviews/category/${pocket}?userId=${userId}`, {
        headers: {
          Authorization: `${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        console.log(res);
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
    <List>
      {ticketlist.map((ticket) => (
        <>
          <TicketDiv key={ticket.id} onClick={onClickTicket}>
            <Ticket
              title={ticket.title}
              place={ticket.location}
              seat={ticket.seat}
              year={ticket.date.substr(0, 4)}
              date={ticket.date.substr(4, 8)}
              custom={ticket.customimg}
            />
          </TicketDiv>
        </>
      ))}
    </List>
  );
};

export default TicketList;
