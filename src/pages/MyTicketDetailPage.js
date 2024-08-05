import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Detail from "../components/Detail";
import UploadBtn from "../components/UploadBtn";
import { MdNavigateBefore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TicketList from "../components/TicketList";

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
const CategoryLine = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  .name {
    font-size: 30px;
    font-weight: 700;
    color: white;
  }
  .pocket {
    font-size: 30px;
    font-weight: 700;
    color: white;
  }
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
  const isDesktop = useMediaQuery({ minWidth: 1220 });
  const navigate = useNavigate();
  const [ticketClick, setTicketClick] = useState(false);
  const handleTicket = (e) => {
    setTicketClick(true);
  };
  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <ProfileArea>
            <div style={{ width: "100%" }}>
              <CategoryLine>
                <MdNavigateBefore
                  color="#A9A9A9"
                  size={50}
                  onClick={() => navigate("/myticket")}
                  style={{ cursor: "pointer" }}
                />
                <div className="name">야구</div>
                <div className="pocket">포켓</div>
              </CategoryLine>
              <TicketList onClickTicket={handleTicket} />
            </div>
          </ProfileArea>
          <TicketArea>
            {ticketClick ? <Detail /> : <None>티켓이 이곳에 표시됩니다.</None>}
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
