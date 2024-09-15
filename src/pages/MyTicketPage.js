import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api/api";
import { FaGetPocket } from "react-icons/fa";
import { BsFillPinFill } from "react-icons/bs";
import Profile from "../components/Profile";
import Ticket from "../components/Ticket";
import UploadBtn from "../components/UploadBtn";
import Pocket from "../components/Pocket";
import { useResponsive } from "../context/Responsive";
import FavDetail from "../components/FavDetail";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import CustomCalendar from "../components/CustomCalendar";

const Wrapper = styled.div`
  width: 100vw;
  min-height: calc(100vh - 80px);
  background-color: #262626;
  display: flex;
`;
const ProfileArea = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  padding: 10vh 100px;
  overflow-y: auto;
`;
const TicketArea = styled.div`
  width: 50%;
  background-color: rgba(144, 144, 144, 0.06);
  padding: 10vh 100px;
  min-height: fit-content;
  overflow-y: auto;
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
const None = styled.div`
  display: flex;
  align-items: center;
  height: calc(80vh - 80px);
  width: 100%;
  justify-content: center;
  color: rgba(255, 255, 255, 0.59);
  font-size: 25px;
  font-weight: 600;
`;
const PocketTitle = styled.div`
  display: flex;
  gap: 0 10px;
  padding: ${(props) => props.padding};
  cursor: pointer;
  div {
    color: white;
    font-size: 15px;
    font-weight: 600;
    height: 15px;
    line-height: 15px;
    gap: 0 5px;
  }
`;
const CalendatBtn = styled.button`
  border: none;
  outline: none;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  &:hover {
    background-color: #4a4a4a;
  }
`;
const PocketTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 15px 0;
`;

const MyTicketPage = () => {
  const { isDesktop } = useResponsive();
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  // eslint-disable-next-line
  let userId = localStorage.getItem("userId");
  const [infoData, setInfoData] = useState([]);
  const [clickticket, setClickticket] = useState(false);
  const [favticket, setFavticket] = useState([]);
  const navigate = useNavigate();
  const [iscalendar, setIscalendar] = useState(false);

  const getMyInfo = async () => {
    try {
      // 첫 번째 API 호출
      const userInfoResponse = await api.get(`/api/users/details/${userId}`, {
        headers: {
          Authorization: `${ACCESS_TOKEN}`,
        },
      });

      // 첫 번째 API 호출에서 받은 데이터 처리
      const fetchedInfoData = userInfoResponse.data;
      setInfoData(fetchedInfoData); // 상태 업데이트

      // 두 번째 API 호출
      const featuredReviewResponse = await api.get(
        fetchedInfoData.featuredReviewId !== null &&
          `/api/reviews/${fetchedInfoData.featuredReviewId}?userId=${userId}`,
        {
          headers: {
            Authorization: `${ACCESS_TOKEN}`,
          },
        }
      );

      // 두 번째 API 호출에서 받은 데이터 처리
      console.log("대표티켓정보", featuredReviewResponse);
      setFavticket(featuredReviewResponse.data);
    } catch (err) {
      console.error("Error occurred during API requests", err);
    }
  };
  useEffect(() => {
    getMyInfo();
    // eslint-disable-next-line
  }, []);

  const handleTicket = () => {
    setClickticket(true);
  };
  const handleMobileTicket = (ticketId) => {
    navigate(`/detail/${ticketId}`);
  };

  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <ProfileArea>
            <div style={{ width: "100%" }}>
              <Profile />
              <FavTicket>
                <BsFillPinFill color="white" />
                {infoData.nickName}님의 대표 티켓
              </FavTicket>
              {infoData.featuredReviewId === null ? (
                <NoneMsg>대표 티켓을 설정하지 않았습니다.</NoneMsg>
              ) : (
                <div onClick={handleTicket}>
                  <Ticket
                    title={favticket.title}
                    place={favticket.location}
                    seat={favticket.seat}
                    year={favticket.date ? favticket.date.substr(0, 4) : ""}
                    date={favticket.date ? favticket.date.substr(5, 9) : ""}
                    custom={favticket.customImageUrl}
                  />
                </div>
              )}
              <PocketTitleDiv>
                <PocketTitle onClick={() => setIscalendar(false)}>
                  <FaGetPocket color="white" />
                  <div>{infoData.nickName}님의 포켓</div>
                </PocketTitle>
                <CalendatBtn
                  onClick={() => setIscalendar(!iscalendar)}
                  style={{
                    backgroundColor: iscalendar
                      ? "#4a4a4a"
                      : "rgba(0, 0, 0, 0)",
                  }}
                >
                  <FaCalendarAlt fill="white" />
                </CalendatBtn>
              </PocketTitleDiv>
              {iscalendar ? <CustomCalendar /> : <Pocket />}
            </div>
          </ProfileArea>
          <TicketArea>
            {clickticket ? (
              <FavDetail favticket={favticket} />
            ) : (
              <None>티켓이 이곳에 표시됩니다.</None>
            )}
          </TicketArea>
          <UploadBtn />
        </Wrapper>
      ) : (
        <Wrapper>
          <div style={{ width: "100%" }}>
            <Profile />
            <FavTicket padding="0 30px">
              <BsFillPinFill color="white" />
              {infoData.nickName}님의 대표 티켓
            </FavTicket>
            {infoData.featuredReviewId === null ? (
              <NoneMsg height="130px">대표 티켓을 설정하지 않았습니다.</NoneMsg>
            ) : (
              <div
                onClick={() => handleMobileTicket(favticket.id)}
                style={{ padding: "0 30px" }}
              >
                <Ticket
                  title={favticket.title}
                  place={favticket.location}
                  seat={favticket.seat}
                  year={favticket.date ? favticket.date.substr(0, 4) : ""}
                  date={favticket.date ? favticket.date.substr(5, 9) : ""}
                  custom={favticket.customImageUrl}
                />
              </div>
            )}
            <PocketTitleDiv style={{ marginRight: "30px" }}>
              <PocketTitle padding="0 30px">
                <FaGetPocket color="white" />
                <div>{infoData.nickName}님의 포켓</div>
              </PocketTitle>
              <CalendatBtn
                onClick={() => setIscalendar(!iscalendar)}
                style={{
                  backgroundColor: iscalendar ? "#4a4a4a" : "rgba(0, 0, 0, 0)",
                }}
              >
                <FaCalendarAlt fill="white" />
              </CalendatBtn>
            </PocketTitleDiv>
            {iscalendar ? <CustomCalendar /> : <Pocket />}
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default MyTicketPage;

const NoneMsg = styled.div`
  width: 100%;
  height: ${(props) => props.height || "20vh"};
  align-items: center;
  display: flex;
  justify-content: center;
  color: #afafaf;
  font-size: 15px;
  font-weight: 600;
`;
