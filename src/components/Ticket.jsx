import React from "react";
import styled from "styled-components";

const TicketBox = styled.div`
  width: 100%;
  height: 20vh;
  background-color: aliceblue;
`;
const Title = styled.div``;

const Ticket = () => {
  return (
    <TicketBox>
      <Title></Title>
    </TicketBox>
  );
};

export default Ticket;
