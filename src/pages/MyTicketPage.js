import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { BsFillPinFill } from "react-icons/bs";
import Profile from "../components/Profile";
import Ticket from "../components/Ticket";
import Detail from "../components/Detail";

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  background-color: #262626;
  display: flex;
`;
const ProfileArea = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  padding: 0 100px;
`;
const TicketArea = styled.div`
  width: 50%;
  background-color: rgba(144, 144, 144, 0.06);
  padding: 100px;
  min-height: fit-content;
  overflow: scroll; // ticketarea 스크롤 부분
`;
const FavTicket = styled.div`
  color: white;
  display: flex;
  font-size: 15px;
  font-weight: 600;
  margin: 40px 0 15px 0;
  height: 15px;
  line-height: 15px;
  gap: 0 5px;
  padding: ${(props) => props.padding};
`;

const MyTicketPage = () => {
  const isDesktop = useMediaQuery({ minWidth: 1220 });
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  // eslint-disable-next-line
  const [infoData, setInfoData] = useState([]);

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
              <FavTicket>
                <BsFillPinFill color="white" />
                {/*{infoData.nickname}*/}포켓몬님의 대표 티켓
              </FavTicket>
              <Ticket />
            </div>
          </ProfileArea>
          <TicketArea>
            <Detail />
          </TicketArea>
        </Wrapper>
      ) : (
        <Wrapper>
          <div style={{ width: "100%" }}>
            <Profile />
            <FavTicket padding="0 30px">
              <BsFillPinFill color="white" />
              {/*{infoData.nickname}*/}포켓몬님의 대표 티켓
            </FavTicket>
            <Ticket />
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default MyTicketPage;
