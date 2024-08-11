import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoMdImage } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import DatePicker from "../components/DatePicker";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { MdFileUpload } from "react-icons/md";
import { useResponsive } from "../context/Responsive";

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
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
  height: 55px;
  align-items: center;
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
const TicketBox = styled.label`
  width: 100%;
  height: ${(props) => props.height || "20vh"};
  position: relative;
  background-color: ${(props) => props.background || "#262626"};
  border-radius: 10px;
  overflow: hidden;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 10px;
  margin-bottom: ${(props) => props.marginbottom};
  cursor: pointer;
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
  font-size: ${(props) => props.fontsize || "15px"};
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
  font-size: ${(props) => props.fontsize || "12px"};
  border-radius: 10px;
  width: 100%;
  margin-bottom: ${(props) => props.marginbottom || "15px"};
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
  font-size: ${(props) => props.fontsize || "12px"};
  border-radius: 10px;
  margin-bottom: 15px;
  font-weight: 500;
`;
const ImgInput = styled.input``;

const UploadPage = () => {
  const { isDesktop } = useResponsive();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState("");
  const [seat, setSeat] = useState("");
  const [review, setReview] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [realfile, setRealFile] = useState([]);
  const imgRef = useRef();
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState();
  let ACCESS_TOKEN = localStorage.getItem("accessToken");

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangePlace = (e) => {
    setPlace(e.target.value);
  };
  const onChangeSeat = (e) => {
    setSeat(e.target.value);
  };
  const onChangeReview = (e) => {
    setReview(e.target.value);
  };
  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0] ? imgRef.current.files[0] : "";
    setRealFile(file);
    const reader = new FileReader();
    if (file != "") {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result);
        console.log(reader.result);
      };
    }
  };

  const dateToString = (date) => {
    return (
      date.getFullYear() +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      date.getDate().toString().padStart(2, "0")
    );
  };

  const uploadTicket = () => {
    const formData = new FormData();

    formData.append("ticketCategoryId", 1);
    formData.append("title", title);
    formData.append("content", review);
    formData.append("seat", seat);
    formData.append("date", dateToString(date));
    formData.append("location", place);
    formData.append("images", realfile);

    for (let key of formData.keys()) {
      console.log("key: " + key);
    }
    for (let value of formData.values()) {
      console.log("value: " + value);
    }

    api
      .post("/api/reviews", formData, {
        headers: {
          Authorization: `${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        console.log(res);
        alert("티켓을 업로드했습니다.");
        navigate("/myticket");
      })
      .catch((err) => {
        console.log("upload error", err);
      });
  };

  const getmyCat = () => {
    api
      .get("/api/categories/getTicketCategories", {
        headers: {
          Authorization: `${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        setCategory(res.data.categories);
      })
      .catch((err) => {
        console.log("get category error", err);
      });
  };
  useEffect(() => {
    getmyCat();
  }, []);

  const onChangeCat = (e) => {
    setCategoryId(e.target.value);
  };

  return (
    <>
      {isDesktop ? (
        <Wrapper style={{ display: "flex" }}>
          <RightArea>
            <div style={{ width: "100%" }}>
              <Title fontsize="40px" margin="0 0 10px 0">
                <ItemBox onChange={onChangeCat} value={categoryId}>
                  {category.map((category) => (
                    <Item key={category.id} value={category.id}>
                      {category.category}
                    </Item>
                  ))}
                </ItemBox>{" "}
                포켓에 티켓 업로드
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
              <ImgInput
                id="customimg"
                type="file"
                accept="image/*"
                onChange={saveImgFile}
                ref={imgRef}
                style={{ display: imgFile ? "" : "none" }}
              />
              <TicketBox
                marginbottom="20px"
                for="customimg"
                background={imgFile ? "white" : "#262626"}
              >
                <Circle top="-5px" />
                <Circle bottom="-5px" />
                <FaPlus color="white" size={20} />
                <div>커스텀 이미지 선택하기</div>
                {imgFile ? <img src={imgFile} className="custom-img" /> : <></>}
              </TicketBox>
              <Explain fontsize="18px">
                티켓 표지를 꾸며보세요! 🎫 <br />
                원하는 이미지를 표지에 커스텀할 수 있습니다. <br />
                티켓 내용을 작성하면 해당 티켓 표지를 미리보기할 수 있습니다.
              </Explain>
            </div>
          </RightArea>
          <LeftArea>
            <InfoTitle fontsize="25px" style={{ marginBottom: "15px" }}>
              티켓 정보
            </InfoTitle>
            <InfoTitle fontsize="20px">제목</InfoTitle>
            <Input
              value={title}
              onChange={onChangeTitle}
              marginbottom="25px"
              fontsize="18px"
            />
            <InfoTitle fontsize="20px">날짜</InfoTitle>
            <DatePicker
              selectedDate={date}
              setSelectedDate={setDate}
              marginbottom="25px"
            />
            <InfoTitle fontsize="20px">장소</InfoTitle>
            <Input
              value={place}
              onChange={onChangePlace}
              marginbottom="25px"
              fontsize="18px"
            />
            <InfoTitle fontsize="20px">좌석</InfoTitle>
            <Input
              value={seat}
              onChange={onChangeSeat}
              marginbottom="25px"
              fontsize="18px"
            />
            <InfoTitle fontsize="20px">사진</InfoTitle>
            <input type="file" onChange={saveImgFile} ref={imgRef} />
            <InfoTitle fontsize="20px">나의 후기</InfoTitle>
            <ReviewArea
              value={review}
              onChange={onChangeReview}
              marginbottom="25px"
              fontsize="18px"
            />
            <Button onClick={uploadTicket}>
              <MdFileUpload size={30} />
              <div>티켓 업로드</div>
            </Button>
          </LeftArea>
        </Wrapper>
      ) : (
        <Wrapper style={{ padding: "0 30px" }}>
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

const Button = styled.button`
  background-color: white;
  border: none;
  color: #262626;
  padding: 20px 30px;
  display: flex;
  height: fit-content;
  z-index: 100;
  border-radius: 50px;
  gap: 0 10px;
  float: right;
  margin-top: 20px;
  div {
    font-size: 20px;
    font-weight: 600;
  }
  &:hover {
    background-color: #ffe976;
  }
`;

const ItemBox = styled.select`
  padding: 5px 20px;
  width: 150px;
  font-size: 40px;
  font-weight: 700;
  border: 1.5px solid #c6c6c6;
  border-radius: 20px;
  cursor: pointer;
  text-align: center;
  color: #ca3525;
`;
const Item = styled.option``;
