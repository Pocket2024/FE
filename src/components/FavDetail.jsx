import React, { useRef, useState } from "react";
import styled from "styled-components";
import { MdNavigateBefore } from "react-icons/md";
import { MdSaveAlt } from "react-icons/md";
import { MdPlace } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa6";
//import domtoimage from "dom-to-image";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useResponsive } from "../context/Responsive";
import { useNavigate } from "react-router-dom";
import ImgModal from "./ImgModal";
import line from "../images/line.svg";

const Wrapper = styled.div``;
const TicketBox = styled.div`
  background-color: white;
  border-radius: 30px;
  width: 100%;
  padding: 50px;
  position: relative;
  -webkit-mask: radial-gradient(
      circle 20px at 0px ${(props) => props.y},
      transparent 19px,
      black 20px
    ),
    radial-gradient(
      circle 20px at 100% ${(props) => props.y},
      transparent 19px,
      black 20px
    );
  -webkit-mask-composite: destination-out;
  mask-composite: intersect;
  mask: radial-gradient(
      circle 20px at 0px ${(props) => props.y},
      transparent 19px,
      black 20px
    ),
    radial-gradient(
      circle 20px at 100% ${(props) => props.y},
      transparent 19px,
      black 20px
    );
  mask-composite: intersect;
`;
const FirstLine = styled.div`
  width: 100%;
  display: flex;
  line-height: ${(props) => props.lineHeight || "50px"};
  justify-content: space-between;
`;
const ProfileLine = styled.div`
  display: flex;
`;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
const Nickname = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-left: 15px;
`;
const SaveBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: white;
`;
const Title = styled.div`
  font-size: ${(props) => props.fontSize || "30px"};
  font-weight: 700;
  margin: 20px 0;
`;
const PlaceLine = styled.div`
  display: flex;
  height: ${(props) => props.height || "25px"};
  line-height: ${(props) => props.height || "25px"};
  gap: 0 10px;
  margin: 20px 0;
`;
const Place = styled.div`
  font-size: ${(props) => props.fontSize || "20px"};
  font-weight: 600;
  width: fit-content;
  white-space: nowrap; // 티켓이미지 저장 시 줄바꿈 방지
`;
const Seat = styled.div`
  color: #989898;
  font-size: ${(props) => props.fontSize || "17px"};
  font-weight: 600;
  width: fit-content;
  white-space: nowrap; // 티켓이미지 저장 시 줄바꿈 방지
`;
const Comment = styled.div`
  font-size: ${(props) => props.fontSize || "15px"};
  font-weight: 500;
  margin-top: 30px;
`;
const HeartLine = styled.div`
  display: flex;
  height: ${(props) => props.height || "15px"};
  line-height: ${(props) => props.height || "15px"};
  margin-top: 20px;
  gap: 0 10px;
  div {
    color: #8f8f8f;
    font-size: ${(props) => props.height || "15px"};
  }
`;
const ImageLine = styled.div`
  display: flex;
  width: 100%;
  gap: 0 10px;
  img {
    border-radius: 10px;
    background-size: cover;
    cursor: pointer;
    object-fit: cover;
  }
`;

const FavDetail = ({ favticket, otheruserId }) => {
  const { isDesktop } = useResponsive();
  const ticketRef = useRef();
  const [heart, setHeart] = useState(0);
  const [isHeart, setIsHeart] = useState(false);
  let detail = favticket;
  const navigate = useNavigate();

  const onDownloadBtn = async () => {
    if (window.confirm("티켓 이미지를 저장하시겠습니까?")) {
      const ticket = ticketRef.current; // 현재 티켓 dom에 접근
      //   const filter = (card) => {
      //     // button 태그 필터링
      //     return card.tagName !== "BUTTON";
      //   };

      try {
        const canvas = await html2canvas(ticket, {
          backgroundColor: null, // 배경을 투명하게 설정
          scale: 4,
          ignoreElements: (element) => {
            return element.tagName === "BUTTON"; // Ignore button elements
          },
        }); // Await the promise and get the canvas

        const ctx = canvas.getContext("2d");

        // 원래 캔버스 내용 복사
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // 원의 좌표 및 반지름
        const leftCircle = { x: 0, y: 315 * 4, radius: 50 };
        const rightCircle = {
          x: canvas.width,
          y: 315 * 4,
          radius: 50,
        };

        // 원 부분을 투명하게 만들기
        const makeCircleTransparent = (circle) => {
          for (
            let y = circle.y - circle.radius;
            y <= circle.y + circle.radius;
            y++
          ) {
            for (
              let x = circle.x - circle.radius;
              x <= circle.x + circle.radius;
              x++
            ) {
              const dx = circle.x - x;
              const dy = circle.y - y;
              if (dx * dx + dy * dy <= circle.radius * circle.radius) {
                const index = (y * canvas.width + x) * 4;
                imageData.data[index + 3] = 0; // 알파 채널을 0으로 설정하여 투명하게 만듦
              }
            }
          }
        };

        // 왼쪽 및 오른쪽 원을 투명하게 설정
        makeCircleTransparent(leftCircle);
        makeCircleTransparent(rightCircle);

        // 업데이트된 이미지 데이터를 다시 그리기
        ctx.putImageData(imageData, 0, 0);

        canvas.toBlob((blob) => {
          if (blob !== null) {
            saveAs(blob, "ticketimg.png");
          }
        });
      } catch (error) {
        console.error("Error generating image: ", error);
      }

      //   domtoimage.toBlob(ticket, { filter: filter }).then((blob) => {
      //     saveAs(blob, "ticketimg.png"); // png로 저장
      //   });
    }
  };
  const handleHeart = () => {
    if (isHeart) {
      setIsHeart(!isHeart);
      setHeart(0);
    } else {
      setIsHeart(!isHeart);
      setHeart(1);
    }
  };

  const [modal, setModal] = useState(false);
  const [clickimgurl, setClickimgurl] = useState(""); // 지금 클릭한 이미지 url

  const handleClickimg = (imgUrl) => {
    setClickimgurl(imgUrl);
    setModal(true);
  };

  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <TicketBox
            className="ticketimg"
            ref={ticketRef}
            id="ticketbox"
            y="315px"
          >
            <FirstLine>
              <ProfileLine>
                <ProfileImg src={`${detail.authorProfileImageUrl}`} />
                <Nickname>{detail.authorNickname}</Nickname>
              </ProfileLine>
              {otheruserId ? (
                <></>
              ) : (
                <div style={{ display: "flex", gap: "0 10px" }}>
                  <SaveBtn onClick={onDownloadBtn}>
                    <MdSaveAlt color="#DEDEDE" size={40} />
                  </SaveBtn>
                </div>
              )}
            </FirstLine>
            <Title>{detail.title}</Title>
            <PlaceLine>
              <MdPlace size={25} />
              <Place>{detail.location}</Place>
              <Seat>{detail.seat}</Seat>
            </PlaceLine>
            <PlaceLine>
              <FaRegCalendar size={23} />
              <Place>{detail.date}</Place>
            </PlaceLine>
            {!detail.images ? (
              <></>
            ) : (
              <ImageLine>
                {detail.images && detail.images.length === 1 ? (
                  detail.images.map((img) => (
                    <img
                      key={img.id}
                      src={img.url}
                      alt="img1"
                      onClick={() => handleClickimg(img.url)}
                      style={{
                        width: "100%",
                        height: "200px",
                      }}
                    />
                  ))
                ) : (
                  <></>
                )}
                {detail.images && detail.images.length === 2 ? (
                  detail.images.map((img) => (
                    <img
                      key={img.id}
                      src={img.url}
                      alt={img.id}
                      onClick={() => handleClickimg(img.url)}
                      style={{
                        width: "50%",
                        height: "200px",
                      }}
                    />
                  ))
                ) : (
                  <></>
                )}

                {detail.images && detail.images.length === 3 ? (
                  detail.images.map((img) => (
                    <img
                      key={img.id}
                      src={img.url}
                      alt={img.id}
                      onClick={() => handleClickimg(img.url)}
                      style={{
                        width: "32%",
                        height: "200px",
                      }}
                    />
                  ))
                ) : (
                  <></>
                )}
              </ImageLine>
            )}
            <Line src={line} />
            <Comment>{detail.content}</Comment>
          </TicketBox>
          <HeartLine height="20px">
            {isHeart ? (
              <FaHeart
                color="white"
                onClick={handleHeart}
                size={20}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <FaRegHeart
                color="#8F8F8F"
                onClick={handleHeart}
                size={20}
                style={{ cursor: "pointer" }}
              />
            )}
            <div>{heart}</div>
          </HeartLine>
          <ImgModal
            isOpen={modal}
            onRequestClose={() => setModal(false)}
            imgUrl={clickimgurl}
          />
        </Wrapper>
      ) : (
        <Wrapper>
          <div
            style={{ height: "30px", lineHeight: "30px", marginBottom: "30px" }}
          >
            <MdNavigateBefore
              color="#A9A9A9"
              size={isDesktop ? 50 : 30}
              onClick={() => navigate(`/myticket/${detail.ticketcategory.id}`)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <MTicketBox className="ticketimg" ref={ticketRef} id="ticketbox">
            <FirstLine lineHeight="35px">
              <ProfileLine>
                <MProfileImg src={`${detail.authorProfileImageUrl}`} />
                <MNickname>{detail.authorNickname}</MNickname>
              </ProfileLine>
              {otheruserId ? (
                <></>
              ) : (
                <SaveBtn onClick={onDownloadBtn}>
                  <MdSaveAlt color="#DEDEDE" size={25} />
                </SaveBtn>
              )}
            </FirstLine>
            <Title fontSize="22px">{detail.title}</Title>
            <PlaceLine height="20px">
              <MdPlace size={20} />
              <Place fontSize="15px">{detail.location}</Place>
              <Seat fontSize="10px">{detail.seat}</Seat>
            </PlaceLine>
            <PlaceLine height="20px">
              <FaRegCalendar size={15} />
              <Place fontSize="15px">{detail.date}</Place>
            </PlaceLine>
            {!detail.images ? (
              <></>
            ) : (
              <ImageLine>
                {detail.images && detail.images.length === 1 ? (
                  detail.images.map((img) => (
                    <img
                      key={img.id}
                      src={img.url}
                      alt="img1"
                      onClick={() => handleClickimg(img.url)}
                      style={{
                        width: "100%",
                        height: "25vw",
                      }}
                    />
                  ))
                ) : (
                  <></>
                )}
                {detail.images && detail.images.length === 2 ? (
                  detail.images.map((img) => (
                    <img
                      key={img.id}
                      src={img.url}
                      alt={img.id}
                      onClick={() => handleClickimg(img.url)}
                      style={{
                        width: "50%",
                        height: "25vw",
                      }}
                    />
                  ))
                ) : (
                  <></>
                )}

                {detail.images && detail.images.length === 3 ? (
                  detail.images.map((img) => (
                    <img
                      key={img.id}
                      src={img.url}
                      alt={img.id}
                      onClick={() => handleClickimg(img.url)}
                      style={{
                        width: "32%",
                        height: "25vw",
                      }}
                    />
                  ))
                ) : (
                  <></>
                )}
              </ImageLine>
            )}
            <Line src={line} />
            <Comment fontSize="12px">{detail.content}</Comment>
          </MTicketBox>
          <HeartLine>
            {isHeart ? (
              <FaHeart color="white" onClick={handleHeart} />
            ) : (
              <FaRegHeart color="#8F8F8F" onClick={handleHeart} />
            )}
            <div>{heart}</div>
          </HeartLine>
        </Wrapper>
      )}
    </>
  );
};

export default FavDetail;

const MTicketBox = styled.div`
  background-color: white;
  border-radius: 20px;
  width: 100%;
  padding: 35px;
  position: relative;
  -webkit-mask: radial-gradient(
      circle 10px at 0px 315px,
      transparent 9px,
      black 10px
    ),
    radial-gradient(circle 10px at 100% 315px, transparent 9px, black 10px);
  -webkit-mask-composite: destination-out;
  mask-composite: intersect;
  mask: radial-gradient(circle 10px at 0px 315px, transparent 9px, black 10px),
    radial-gradient(circle 10px at 100% 315px, transparent 9px, black 10px);
  mask-composite: intersect;
`;
const MProfileImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;
const MNickname = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-left: 10px;
`;

const Line = styled.img`
  width: 100%;
  margin-top: 30px;
`;
