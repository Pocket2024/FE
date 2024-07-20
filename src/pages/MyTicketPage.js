import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import profileimg from "../images/profileimg.png";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";
import Ticket from "../components/Ticket";

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
  div {
    width: 100%;
  }
`;
const TicketArea = styled.div`
  width: 50%;
  background-color: #111111;
`;
const FavTicket = styled.div`
  color: white;
`;

const MyTicketPage = () => {
  const isDesktop = useMediaQuery({ minWidth: 1220 });
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [infoData, setInfoData] = useState([]);
  const navigate = useNavigate();

  const getMyInfo = () => {
    axios
      .get("http://127.0.0.1:8080/api/users/details", {
        headers: {
          Authorization: `${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        console.log(res);
        setInfoData(res.data);
      })
      .catch((err) => {
        console.error("Error get info", err);
      });
  };
  useEffect(() => {
    getMyInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <ProfileArea>
            <div>
              <Profile />
              <FavTicket>{infoData.nickname}님의 대표 티켓</FavTicket>
              <Ticket />
            </div>
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
