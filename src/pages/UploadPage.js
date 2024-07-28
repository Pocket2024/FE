import React, { useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { IoMdImage } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import DatePicker from "../components/DatePicker";

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
`;
const RightArea = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  padding: 0 100px;
`;
const LeftArea = styled.div`
  width: 50%;
  background-color: #262626;
  padding: 100px;
  min-height: fit-content;
  overflow: scroll; // 스크롤 부분
`;
const Title = styled.div`
  font-size: ${(props) => props.fontsize || "20px"};
  font-weight: 700;
  color: black;
  display: flex;
  gap: 0 5px;
  margin: ${(props) => props.margin || "5vh 0 0 0"};
  white-space: nowrap;
  div {
    color: #ca3525;
  }
`;
const Explain = styled.div`
  font-size: ${(props) => props.fontsize || "10px"};
  font-weight: 500;
  color: #737373;
  line-height: calc(${(props) => props.fontsize || "10px"} + 1px);
  margin-bottom: 30px;
  white-space: nowrap;
`;
const AutoBtn = styled.button`
  border: 1px solid #262626;
  background-color: white;
  color: #262626;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
  gap: 0 10px;
  margin-bottom: ${(props) => props.marginbottom || "20px"};
`;
const TicketBox = styled.div`
  width: 100%;
  height: ${(props) => props.height || "20vh"};
  position: relative;
  background-color: #262626;
  border-radius: 10px;
  overflow: hidden;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 10px;
  margin-bottom: ${(props) => props.marginbottom};
  div {
    color: white;
    font-size: 15px;
    font-weight: 600;
  }
  .custom-img {
    width: 100%;
    position: absolute;
    z-index: 2;
    background-blend-mode: overlay;
    opacity: 0.4;
    border-radius: 10px;
    left: 0;
  }
`;
const Circle = styled.div`
  width: 10px !important;
  height: 10px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  z-index: 3;
  left: 70%;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
`;
const TicketInfo = styled.div`
  background-color: #262626;
  border-radius: 20px 20px 0 0;
  width: 100vw;
  margin-left: calc(-50vw + 50%); // 부모 Padding 무시
  margin-top: 40px;
  padding: 30px;
  .ticket-info {
    margin-bottom: 15px;
  }
`;
const InfoTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: white;
  margin-bottom: 5px;
`;
const Input = styled.input`
  border: none;
  background-color: rgba(255, 255, 255, 0.22);
  padding: 15px;
  color: white;
  outline: none;
  font-size: 12px;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 15px;
  font-weight: 500;
`;
const ReviewArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 100px;
  border: none;
  background-color: rgba(255, 255, 255, 0.22);
  padding: 15px;
  color: white;
  outline: none;
  font-size: 12px;
  border-radius: 10px;
  margin-bottom: 15px;
  font-weight: 500;
`;

const UploadPage = () => {
  const isDesktop = useMediaQuery({ minWidth: 1220 });
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState("");
  const [seat, setSeat] = useState("");
  const [review, setReview] = useState("");

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangePlace = (e) => {
    setPlace(e.target.place);
  };
  const onChangeSeat = (e) => {
    setSeat(e.target.value);
  };
  const onChangeReview = (e) => {
    setReview(e.target.value);
  };

  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <RightArea>
            <div style={{ width: "100%" }}>
              <Title fontsize="40px" margin="0 0 10px 0">
                <div>아이돌</div>포켓에 티켓 업로드
              </Title>
              <Explain fontsize="18px">
                티켓 이미지를 업로드하여 자동입력해보세요. 🤩
                <br />
                자동입력을 원하지 않으면 직접 정보를 입력할 수 있습니다.
              </Explain>
              <AutoBtn marginbottom="60px">
                <IoMdImage size={20} />
                자동입력에 사용할 티켓 이미지 선택하기
              </AutoBtn>
              <TicketBox marginbottom="20px">
                <Circle top="-5px" />
                <Circle bottom="-5px" />
                <FaPlus color="white" size={20} />
                <div>커스텀 이미지 선택하기</div>
              </TicketBox>
              <Explain fontsize="18px">
                티켓 표지를 꾸며보세요! 🎫 <br />
                원하는 이미지를 표지에 커스텀할 수 있습니다. <br />
                티켓 내용을 작성하면 해당 티켓 표지를 미리보기할 수 있습니다.
              </Explain>
            </div>
          </RightArea>
          <LeftArea>
            <InfoTitle className="ticket-info">티켓 정보</InfoTitle>
            <InfoTitle>제목</InfoTitle>
            <Input value={title} onChange={onChangeTitle} />
            <InfoTitle>날짜</InfoTitle>
            <DatePicker selectedDate={date} setSelectedDate={setDate} />
            <InfoTitle>장소</InfoTitle>
            <Input value={place} onChange={onChangePlace} />
            <InfoTitle>좌석</InfoTitle>
            <Input value={seat} onChange={onChangeSeat} />
            <InfoTitle>나의 후기</InfoTitle>
            <ReviewArea value={review} onChange={onChangeReview} />
          </LeftArea>
        </Wrapper>
      ) : (
        <Wrapper>
          <Title>
            <div>아이돌</div>포켓에 티켓 업로드
          </Title>
          <Explain>
            티켓 이미지를 업로드하여 자동입력해보세요. 🤩
            <br />
            자동입력을 원하지 않으면 직접 정보를 입력할 수 있습니다.
          </Explain>
          <AutoBtn>
            <IoMdImage size={20} />
            자동입력에 사용할 티켓 이미지 선택하기
          </AutoBtn>
          <TicketBox height="130px">
            <Circle top="-5px" />
            <Circle bottom="-5px" />
            <FaPlus color="white" size={20} />
            <div>커스텀 이미지 선택하기</div>
          </TicketBox>
          <TicketInfo>
            <InfoTitle className="ticket-info">티켓 정보</InfoTitle>
            <InfoTitle>제목</InfoTitle>
            <Input value={title} onChange={onChangeTitle} />
            <InfoTitle>날짜</InfoTitle>
            <DatePicker selectedDate={date} setSelectedDate={setDate} />
            <InfoTitle>장소</InfoTitle>
            <Input value={place} onChange={onChangePlace} />
            <InfoTitle>좌석</InfoTitle>
            <Input value={seat} onChange={onChangeSeat} />
            <InfoTitle>나의 후기</InfoTitle>
            <ReviewArea value={review} onChange={onChangeReview} />
          </TicketInfo>
        </Wrapper>
      )}
    </>
  );
};

export default UploadPage;
