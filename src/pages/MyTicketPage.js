import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import profileimg from "../images/profileimg.png";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  background-color: #262626;
  display: flex;
`;
const ProfileArea = styled.div`
  width: 50%;
  background-color: #212121;
  display: flex;
  justify-content: center;
  padding: 0 100px;
`;
const TicketArea = styled.div`
  width: 50%;
  background-color: #111111;
`;

const MyTicketPage = () => {
  const isDesktop = useMediaQuery({ minWidth: 1220 });

  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <ProfileArea>
            <Profile />
          </ProfileArea>
          <TicketArea></TicketArea>
        </Wrapper>
      ) : (
        <Wrapper>
          <Profile />
        </Wrapper>
      )}
    </>
  );
};

export default MyTicketPage;
