import React, { useEffect, useId, useState } from "react";
import styled from "styled-components";
import Ticket from "./Ticket";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { MdNavigateBefore } from "react-icons/md";

const List = styled.div`
  display: block;
  margin-top: 30px;
`;
const TicketDiv = styled.div`
  margin-bottom: 30px;
`;
const CategoryLine = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  .name {
    font-size: 30px;
    font-weight: 700;
    color: white;
  }
  .pocket {
    font-size: 30px;
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
      <CategoryLine>
        <MdNavigateBefore
          color="#A9A9A9"
          size={50}
          onClick={() => navigate("/myticket")}
          style={{ cursor: "pointer" }}
        />
        <div className="name">{category}</div>
        <div className="pocket">포켓</div>
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
                custom={ticket.customimg}
              />
            </TicketDiv>
          </>
        ))}
      </List>
    </>
  );
};

export default TicketList;
