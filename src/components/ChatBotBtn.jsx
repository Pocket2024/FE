import React from "react";
import styled from "styled-components";
import { RiRobot2Fill } from "react-icons/ri";

const ChatBotButton = styled.button`
  position: fixed;
  bottom: 17vh;
  right: 50px;
  border: 5px solid #3c8fdb;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: white;
  padding: 10px;
`;

const ChatBotBtn = () => {
  return (
    <ChatBotButton>
      <RiRobot2Fill size={30} />
    </ChatBotButton>
  );
};

export default ChatBotBtn;
