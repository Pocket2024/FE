import React from "react";
import styled from "styled-components";
import Detail from "../components/Detail";
import UploadBtn from "../components/UploadBtn";
import { useParams } from "react-router-dom";
import TicketList from "../components/TicketList";
import { useResponsive } from "../context/Responsive";

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

const CalendarDetailPage = () => {
  const { isDesktop } = useResponsive();
  const { date } = useParams();
  const { ticket } = useParams();

  function convertDateFormat(dateString) {
    // 입력받은 문자열이 'yyyy.mm.dd' 형식일 경우
    return dateString.replace(/\./g, "-");
  }

  const convertedDate = convertDateFormat(date);
  console.log(convertedDate);

  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <ProfileArea>
            <div style={{ width: "100%" }}>
              <TicketList date={convertedDate} />
            </div>
          </ProfileArea>
          <TicketArea>
            {ticket ? <Detail /> : <None>티켓이 이곳에 표시됩니다.</None>}
          </TicketArea>
          <UploadBtn />
        </Wrapper>
      ) : (
        <MWrapper>
          <div style={{ width: "100%" }}>
            <TicketList date={convertedDate} />
          </div>
        </MWrapper>
      )}
    </>
  );
};

export default CalendarDetailPage;

const MWrapper = styled.div`
  width: 100vw;
  min-height: calc(100vh - 80px);
  height: fit-content;
  background-color: #262626;
  display: flex;
`;
