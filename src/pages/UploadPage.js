import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa6";
import DatePicker from "../components/DatePicker";
import api from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import { MdFileUpload } from "react-icons/md";
import { useResponsive } from "../context/Responsive";
import { IoMdImage } from "react-icons/io";
import TicketScan from "../components/TicketScan";
import useNotificationStore from "../store/notificationStore";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
`;
const RightArea = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  padding: 0 100px;
  overflow-y: auto;
`;
const LeftArea = styled.div`
  width: 50%;
  background-color: #262626;
  padding: 100px;
  min-height: fit-content;
  overflow-y: auto;
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
const AutoBtn = styled.label`
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
  cursor: pointer;
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
  min-height: fit-content;
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

const FileUpload = styled.div`
  width: 100%;
  display: flex;
  gap: 0 10px;
`;

const FileContainer = styled.div`
  width: 35%;
  height: ${(props) => props.height || "200px"};
  border-radius: 10px;
  border: 2px dashed #707070;
  background-color: none;
`;
const PreviewContainer = styled.div`
  width: 35%;
  height: ${(props) => props.height || "200px"};
  border-radius: 10px;
  background-size: cover;
`;
const MultiImgInput = styled.div`
  display: flex;
  gap: 0 15px;
  label {
    background-color: #565656;
    color: white;
    font-size: 15px;
    font-weight: 600;
    padding: 10px 15px;
    border-radius: 10px;
    line-height: 20px;
    span {
      margin-left: 10px;
    }
    margin-bottom: 20px;
  }
  input {
    display: none;
  }
  div {
    color: #b1b1b1;
    font-size: 15px;
    font-weight: 600;
    line-height: 40px;
  }
`;

const UploadPage = () => {
  const { isDesktop } = useResponsive();
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState("");
  const [seat, setSeat] = useState("");
  const [review, setReview] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [customImg, setCustomImg] = useState([]);
  const imgRef = useRef();
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(
    location.state != null ? location.state.categoryId : null
  );
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  let userId = localStorage.getItem("userId");
  const [checked, setChecked] = useState(false);
  const [isocr, setIsocr] = useState(false);
  const { showNotification } = useNotificationStore();

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
    setCustomImg(file);
    const reader = new FileReader();
    if (file !== "") {
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
      "." +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "." +
      date.getDate().toString().padStart(2, "0")
    );
  };

  const uploadTicket = () => {
    const formData = new FormData();

    formData.append("ticketCategoryId", categoryId);
    formData.append("title", title);
    formData.append("content", review);
    formData.append("seat", seat);
    formData.append("date", dateToString(date));
    formData.append("location", place);
    formData.append("private", checked);
    formData.append("ocr", isocr);
    if (realimg) {
      for (let i = 0; i < realimg.length; i++) {
        formData.append("images", realimg[i]); //반복문을 활용하여 파일들을 formDataR객체에 추가
      }
    }
    if (customImg) {
      formData.append("customImageFile", customImg);
    }

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
        showNotification("🎫 티켓이 업로드되었습니다.");
        navigate("/myticket");
      })
      .catch((err) => {
        console.log("upload error", err);
      });
  };

  useEffect(() => {
    const getmyCat = () => {
      if (location.state === null) {
        api
          .get(`/api/categories/getTicketCategories/${userId}`, {
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
      }
    };

    getmyCat();
  }, [userId, ACCESS_TOKEN, location.state]);

  const onChangeCat = (e) => {
    setCategoryId(e.target.value);
  };

  const [image1, setImage1Src] = useState("");
  const [image2, setImage2Src] = useState("");
  const [image3, setImage3Src] = useState("");
  const [realimg, setRealimg] = useState([]);

  const img1encodeFileToBase64 = (fileBlob) => {
    const reader1 = new FileReader();
    const reader2 = new FileReader();
    const reader3 = new FileReader();

    reader1.readAsDataURL(fileBlob[0]);
    if (fileBlob[1]) {
      reader2.readAsDataURL(fileBlob[1]);
    }
    if (fileBlob[2]) {
      reader3.readAsDataURL(fileBlob[2]);
    }
    setRealimg(fileBlob);
    return new Promise((resolve) => {
      reader1.onload = () => {
        setImage1Src(reader1.result);
        resolve();
      };

      if (fileBlob[1]) {
        reader2.onload = () => {
          setImage2Src(reader2.result);
          resolve();
        };
      }

      if (fileBlob[2]) {
        reader3.onload = () => {
          setImage3Src(reader3.result);
          resolve();
        };
      }
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const onChangeOcr = async (fileBlob) => {
    const formData = new FormData();

    formData.append("file", fileBlob[0]);

    for (let key of formData.keys()) {
      console.log("key: " + key);
    }
    for (let value of formData.values()) {
      console.log("value: " + value);
    }

    try {
      setIsLoading(true); // 로딩 시작

      const res = await api.post("/api/ocr/upload", formData, {
        headers: {
          Authorization: `${ACCESS_TOKEN}`,
        },
      });

      console.log("ocr 정보", res);
      setTitle(res.data.title);
      setPlace(res.data.location);
      setSeat(res.data.seat);
      setDate(new Date(res.data.date));
      setIsocr(true);
      showNotification("🪄 티켓 정보 추출 완료!");
    } catch (err) {
      showNotification("⚠️ 파일용량이 너무 큽니다.");
      console.log("ocr 에러", err);
    } finally {
      setIsLoading(false); // 로딩 끝
    }
  };

  return (
    <>
      {isDesktop ? (
        <Wrapper style={{ display: "flex", position: "relative" }}>
          <RightArea>
            <div style={{ width: "100%" }}>
              <Title fontsize="40px" margin="0 0 10px 0">
                {location.state ? (
                  <div style={{ color: "#ca3525" }}>
                    {location.state.categoryName}
                  </div>
                ) : (
                  <ItemBox onChange={onChangeCat} value={categoryId}>
                    {category.map((category) => (
                      <Item key={category.id} value={category.id}>
                        {category.category}
                      </Item>
                    ))}
                  </ItemBox>
                )}
                포켓에 티켓 업로드
              </Title>
              <Explain fontsize="18px">
                티켓 이미지를 업로드하여 자동입력해보세요. 🤩
                <br />
                자동입력을 원하지 않으면 직접 정보를 입력할 수 있습니다.
              </Explain>
              <input
                type="file"
                accept="image/*"
                id="ocrimg"
                style={{ display: "none" }}
                onChange={(e) => {
                  onChangeOcr(e.target.files);
                }}
              />
              <AutoBtn marginbottom="60px" htmlFor="ocrimg">
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
                {imgFile ? (
                  <img src={imgFile} className="custom-img" alt="" />
                ) : (
                  <></>
                )}
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
            <InfoTitle fontsize="20px">나의 후기</InfoTitle>
            <ReviewArea
              value={review}
              onChange={onChangeReview}
              marginbottom="25px"
              fontsize="18px"
            />
            <InfoTitle fontsize="20px">사진</InfoTitle>
            <MultiImgInput>
              <label for="file">
                <IoMdImage color="white" size={20} />
                <span>사진 선택하기</span>
              </label>
              <input
                type="file"
                name="file"
                id="file"
                multiple="multiple"
                onChange={(e) => {
                  img1encodeFileToBase64(e.target.files);
                }}
              />
              <div>*최대 3장까지 업로드 가능</div>
            </MultiImgInput>
            <FileUpload>
              {!image1 && <FileContainer></FileContainer>}
              {image1 && (
                <PreviewContainer
                  style={{
                    backgroundImage: `url(${image1})`,
                  }}
                />
              )}
              {!image2 && <FileContainer></FileContainer>}
              {image2 && (
                <PreviewContainer
                  style={{
                    backgroundImage: `url(${image2})`,
                  }}
                />
              )}

              {!image3 && <FileContainer></FileContainer>}
              {image3 && (
                <PreviewContainer
                  style={{
                    backgroundImage: `url(${image3})`,
                  }}
                />
              )}
            </FileUpload>
            <StyledLabel htmlFor="private" fontsize="20px">
              <StyledInput
                type="checkbox"
                id="private"
                name="private"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <StyledP>비공개</StyledP>
              <div className="explain">
                *비공개를 체크하면 해당 티켓은 나만 볼 수 있어요
              </div>
            </StyledLabel>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={uploadTicket}>
                <MdFileUpload size={30} />
                <div>티켓 업로드</div>
              </Button>
            </div>
          </LeftArea>
          {isLoading && <TicketScan />}
        </Wrapper>
      ) : (
        <Wrapper style={{ padding: "0 30px", minHeight: "fit-content" }}>
          <Title>
            <div style={{ color: "#ca3525" }}>
              {location.state.categoryName}
            </div>
            포켓에 티켓 업로드
          </Title>
          <Explain>
            티켓 이미지를 업로드하여 자동입력해보세요. 🤩
            <br />
            자동입력을 원하지 않으면 직접 정보를 입력할 수 있습니다.
          </Explain>
          <input
            type="file"
            accept="image/*"
            id="ocrimg"
            style={{ display: "none" }}
            onChange={(e) => {
              onChangeOcr(e.target.files);
            }}
          />
          <AutoBtn htmlFor="ocrimg">
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
            height="130px"
            for="customimg"
            background={imgFile ? "white" : "#262626"}
          >
            <Circle top="-5px" />
            <Circle bottom="-5px" />
            <FaPlus color="white" size={20} />
            <div>커스텀 이미지 선택하기</div>
            {imgFile ? (
              <img src={imgFile} className="custom-img" alt="" />
            ) : (
              <></>
            )}
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
            <InfoTitle>사진</InfoTitle>
            <MultiImgInput>
              <label for="file">
                <IoMdImage color="white" size={20} />
                <span>사진 선택하기</span>
              </label>
              <input
                type="file"
                name="file"
                id="file"
                multiple="multiple"
                onChange={(e) => {
                  img1encodeFileToBase64(e.target.files);
                }}
              />
              <div>*최대 3장까지 업로드 가능</div>
            </MultiImgInput>
            <FileUpload>
              {!image1 && <FileContainer height="35vw"></FileContainer>}
              {image1 && (
                <PreviewContainer
                  height="35vw"
                  style={{
                    backgroundImage: `url(${image1})`,
                  }}
                />
              )}
              {!image2 && <FileContainer height="35vw"></FileContainer>}
              {image2 && (
                <PreviewContainer
                  height="35vw"
                  style={{
                    backgroundImage: `url(${image2})`,
                  }}
                />
              )}

              {!image3 && <FileContainer height="35vw"></FileContainer>}
              {image3 && (
                <PreviewContainer
                  height="35vw"
                  style={{
                    backgroundImage: `url(${image3})`,
                  }}
                />
              )}
            </FileUpload>
            <StyledLabel htmlFor="private" fontsize="20px">
              <StyledInput
                type="checkbox"
                id="private"
                name="private"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <StyledP style={{ fontSize: "15px" }}>비공개</StyledP>
            </StyledLabel>
            <PrivateExplain>
              *비공개를 체크하면 해당 티켓은 나만 볼 수 있어요
            </PrivateExplain>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={uploadTicket}>
                <MdFileUpload size={30} />
                <div>티켓 업로드</div>
              </Button>
            </div>
          </TicketInfo>
          {isLoading && <TicketScan />}
        </Wrapper>
      )}
    </>
  );
};

export default UploadPage;

const StyledInput = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='black' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: white;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
  align-items: center;
  font-size: ${(props) => props.fontsize || "15px"};
  font-weight: 600;
  margin-top: 30px;
  .explain {
    color: #b1b1b1;
    font-size: 15px;
    font-weight: 600;
    line-height: 40px;
    margin-left: 15px;
  }
`;

const StyledP = styled.div`
  margin-left: 10px;
  color: white;
`;

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
  width: fit-content;
  font-size: 40px;
  font-weight: 700;
  border: 1.5px solid #c6c6c6;
  border-radius: 20px;
  cursor: pointer;
  text-align: center;
  color: #ca3525;
`;
const Item = styled.option``;

const PrivateExplain = styled.div`
  color: #b1b1b1;
  font-size: 15px;
  font-weight: 600;
  line-height: 40px;
  margin-bottom: 30px;
`;
