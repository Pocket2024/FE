import React from "react";
import styled from "styled-components";
import dummy from "../dummy/hot.json";
import Ticket from "./Ticket";

const List = styled.div`
  display: block;
  margin-top: 30px;
`;
const TicketDiv = styled.div`
  margin-bottom: 30px;
`;

const TicketList = () => {
  return (
    <List>
      {dummy.data.map((ticket) => (
        <>
          <TicketDiv>
            <Ticket
              key={ticket.id}
              title={ticket.title}
              place={ticket.place}
              seat={ticket.seat}
              year={ticket.year}
              date={ticket.date}
              custom={ticket.customimg}
            />
          </TicketDiv>
        </>
      ))}
    </List>
  );
};

export default TicketList;
