import React from "react";
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
  padding: 0 100px;
`;
const TicketArea = styled.div`
  width: 50%;
  background-color: rgba(144, 144, 144, 0.06);
  padding: 100px;
  min-height: fit-content;
  overflow: scroll; // ticketarea 스크롤 부분
`;
const CategoryLine = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 5vh;
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

const MyTicketDetailPage = () => {
  const isDesktop = useMediaQuery({ minWidth: 1220 });
  const navigate = useNavigate();
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
              <TicketList />
            </div>
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
