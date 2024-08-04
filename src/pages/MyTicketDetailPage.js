import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Detail from "../components/Detail";
import UploadBtn from "../components/UploadBtn";

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

const MyTicketDetailPage = () => {
  const isDesktop = useMediaQuery({ minWidth: 1220 });
  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <ProfileArea>
            <div style={{ width: "100%" }}>포켓별 티켓 페이지</div>
          </ProfileArea>
          <TicketArea>
            <Detail />
          </TicketArea>
          <UploadBtn />
        </Wrapper>
      ) : (
        <Wrapper>
          <div style={{ width: "100%" }}>포켓별 티켓 페이지</div>
        </Wrapper>
      )}
    </>
  );
};

export default MyTicketDetailPage;
