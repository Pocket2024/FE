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
import { useParams } from "react-router-dom";
import FavDetail from "../components/FavDetail";

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
  margin: 40px 0 15px 0;
  padding: ${(props) => props.padding};
  div {
    color: white;
    font-size: 15px;
    font-weight: 600;
    height: 15px;
    line-height: 15px;
    gap: 0 5px;
  }
`;

const OtherUserPage = () => {
  const { isDesktop } = useResponsive();
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  // eslint-disable-next-line
  const { otheruserId } = useParams();
  const [infoData, setInfoData] = useState([]);
  const [clickticket, setClickticket] = useState(false);
  const [favticket, setFavticket] = useState([]);

  const getMyInfo = async () => {
    try {
      // 첫 번째 API 호출
      const userInfoResponse = await api.get(
        `/api/users/details/${otheruserId}`,
        {
          headers: {
            Authorization: `${ACCESS_TOKEN}`,
          },
        }
      );

      // 첫 번째 API 호출에서 받은 데이터 처리
      const fetchedInfoData = userInfoResponse.data;
      setInfoData(fetchedInfoData); // 상태 업데이트

      // 두 번째 API 호출
      const featuredReviewResponse = await api.get(
        `/api/reviews/${fetchedInfoData.featuredReviewId}?userId=${otheruserId}`,
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

  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <ProfileArea>
            <div style={{ width: "100%" }}>
              <Profile otheruserId={otheruserId} />
              <FavTicket>
                <BsFillPinFill color="white" />
                {infoData.nickName}님의 대표 티켓
              </FavTicket>
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
              <PocketTitle>
                <FaGetPocket color="white" />
                <div>{infoData.nickName}님의 포켓</div>
              </PocketTitle>
              <Pocket otheruserId={otheruserId} />
            </div>
          </ProfileArea>
          <TicketArea>
            {clickticket ? (
              <FavDetail favticket={favticket} otheruserId={otheruserId} />
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
            <div onClick={handleTicket} style={{ padding: "0 30px" }}>
              <Ticket
                title={favticket.title}
                place={favticket.location}
                seat={favticket.seat}
                year={favticket.date ? favticket.date.substr(0, 4) : ""}
                date={favticket.date ? favticket.date.substr(5, 9) : ""}
                custom={favticket.customImageUrl}
              />
            </div>
            <PocketTitle padding="0 30px">
              <FaGetPocket color="white" />
              <div>{infoData.nickName}님의 포켓</div>
            </PocketTitle>
            <Pocket />
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default OtherUserPage;
