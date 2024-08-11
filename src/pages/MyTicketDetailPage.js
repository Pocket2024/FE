import React, { useState } from "react";
import styled from "styled-components";
import Detail from "../components/Detail";
import UploadBtn from "../components/UploadBtn";
import { useParams } from "react-router-dom";
import TicketList from "../components/TicketList";
import { useResponsive } from "../context/Responsive";

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
`;
const TicketArea = styled.div`
  width: 50%;
  background-color: rgba(144, 144, 144, 0.06);
  padding: 10vh 100px;
  min-height: fit-content;
  overflow: scroll; // ticketarea 스크롤 부분
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

const MyTicketDetailPage = () => {
  const { isDesktop } = useResponsive();
  const { ticket } = useParams();

  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <ProfileArea>
            <div style={{ width: "100%" }}>
              <TicketList />
            </div>
          </ProfileArea>
          <TicketArea>
            {ticket ? <Detail /> : <None>티켓이 이곳에 표시됩니다.</None>}
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
