import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
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
import { useMatch, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import ImgModal from "./ImgModal";
import { BsFillPinFill } from "react-icons/bs";
import { useCookies } from "react-cookie";
import line from "../images/line.svg";
import { MdDelete } from "react-icons/md";
import useNotificationStore from "../store/notificationStore";
import verified from "../images/verified.png";

const slideDown = keyframes`
  0% {
    transform: translateY(20%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

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

  // 애니메이션 적용
  animation: ${(props) => (props.animate ? slideDown : "none")} 0.5s ease-out;
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
  display: flex;
  align-items: center;
  gap: 0 10px;
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
  white-space: pre-wrap;
  div {
    color: #cdcdcd;
    display: flex;
    justify-content: flex-end;
    font-size: ${(props) => props.fontSize};
    margin-top: 15px;
  }
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
  .translate-btn {
    font-size: 15px;
    text-decoration: underline;
    cursor: pointer;
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
const FavBtn = styled.button`
  border-radius: 50%;
  height: ${(props) => props.lineHeight || "50px"};
  width: ${(props) => props.lineHeight || "50px"};
  border: none;
  background-color: ${(props) => props.bgColor};
  &:hover {
    background-color: #fff6a1;
    .pin-icon {
      fill: #f2d84f;
    }
  }
`;

const Delete = styled.button`
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 10px;
  gap: 0 5px;
  &:hover {
    text-decoration: underline;
  }
`;

const Detail = ({ info }) => {
  const { isDesktop } = useResponsive();
  const ticketRef = useRef();
  const [isHeart, setIsHeart] = useState(false);
  const { ticket } = useParams();
  const userId = localStorage.getItem("userId");
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [detail, setDetail] = useState(info ? info : []);
  const navigate = useNavigate();
  const [cookies] = useCookies(["access"]);
  const [animate, setAnimate] = useState(false);
  const likedticket = useMatch("/myticket/like/*");
  const { otheruserId } = useParams();
  const favticketId = localStorage.getItem("favticketId");
  const { showNotification } = useNotificationStore();

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
          useCORS: true, // 이미지 로드 문제 해결
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
      api
        .delete(`/api/likes/unlike/${ticket}?userId=${userId}`, {
          headers: {
            Authorization: `${ACCESS_TOKEN}`,
          },
        })
        .then(() => {
          showNotification("♡ 좋아요 취소");
          setIsHeart(false);
        })
        .catch((err) => {
          console.log("좋아요 취소 err", err);
        });
    } else {
      api
        .post(
          `/api/likes/like/${ticket}?userId=${userId}`,
          {},
          {
            headers: {
              Authorization: `${ACCESS_TOKEN}`,
            },
          }
        )
        .then(() => {
          showNotification("♥ 좋아요");
          setIsHeart(true);
        })
        .catch((err) => {
          console.log("좋아요 err", err);
        });
    }
  };

  useEffect(() => {
    const getDetail = () => {
      !info &&
        api
          .get(`/api/reviews/${ticket}?userId=${userId}`, {
            headers: {
              Authorization: `${ACCESS_TOKEN}`,
            },
          })
          .then((res) => {
            console.log(res);
            setDetail(res.data);
            setIsHeart(res.data.likedByCurrentUser);
          })
          .catch((err) => {
            console.log("get detail err", err);
          });
    };

    getDetail();

    // 티켓 변경 시 애니메이션 트리거
    setAnimate(true);
    const timeoutId = setTimeout(() => {
      setAnimate(false);
    }, 500); // 애니메이션 지속 시간과 동일하게 설정

    return () => clearTimeout(timeoutId);
  }, [ticket, isHeart, userId, ACCESS_TOKEN, favticketId]);

  const [modal, setModal] = useState(false);
  const [clickimgurl, setClickimgurl] = useState(""); // 지금 클릭한 이미지 url

  const handleClickimg = (imgUrl) => {
    setClickimgurl(imgUrl);
    setModal(true);
  };

  const handleFavTicket = () => {
    api
      .post(
        `/api/reviews/${ticket}/feature`,
        {},
        {
          headers: {
            Authorization: `${cookies.access}`,
          },
        }
      )
      .then(() => {
        showNotification("📌 대표 티켓으로 설정되었습니다.");
        localStorage.setItem("favticketId", ticket);
      })
      .catch((err) => {
        console.log("post feature ticket err", err);
        alert("실패");
      });
  };

  const handleDelete = () => {
    api
      .delete(`/api/reviews/${ticket}?userId=${userId}`, {
        headers: {
          Authorization: `${cookies.access}`,
        },
      })
      .then(() => {
        showNotification("🗑️ 티켓이 삭제되었습니다.");
        if (otheruserId) {
          navigate(`/user/${otheruserId}`);
        } else {
          navigate("/myticket");
        }
      })
      .catch((err) => {
        console.log("delete err", err);
      });
  };

  const [translateResult, setTranslateResult] = useState([]);
  const [istranslate, setIstranslate] = useState(false);

  const handleTranslate = (title, location, seat, content) => {
    api
      .post(
        "/api/reviews/translate",
        {
          title: title,
          location: location,
          seat: seat,
          content: content,
        },
        {
          headers: {
            Authorization: `${cookies.access}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setTranslateResult(res.data);
        setIstranslate(true);
      })
      .catch((err) => {
        console.log("translate error", err);
      });
  };

  return (
    <>
      {detail && isDesktop ? (
        <Wrapper>
          {otheruserId || info || likedticket ? (
            <></>
          ) : (
            <Delete onClick={handleDelete}>
              <MdDelete />
              <div>삭제하기</div>
            </Delete>
          )}
          <TicketBox
            className="ticketimg"
            ref={ticketRef}
            id="ticketbox"
            y="315px"
            animate={animate}
          >
            <FirstLine>
              <ProfileLine>
                <ProfileImg src={`${detail.authorProfileImageUrl}`} />
                <Nickname>{detail.authorNickname}</Nickname>
              </ProfileLine>
              {otheruserId || info || likedticket ? (
                <></>
              ) : (
                <div style={{ display: "flex", gap: "0 10px" }}>
                  <SaveBtn onClick={onDownloadBtn}>
                    <MdSaveAlt color="#DEDEDE" size={40} />
                  </SaveBtn>
                  <FavBtn
                    onClick={handleFavTicket}
                    bgColor={favticketId === ticket ? "#fff6a1" : "#f4f4f4"}
                  >
                    <BsFillPinFill
                      size={25}
                      color={favticketId === ticket ? "#f2d84f" : "#E2E2E2"}
                      className="pin-icon"
                    />
                  </FavBtn>
                </div>
              )}
            </FirstLine>
            <Title>
              {istranslate ? translateResult.title : detail.title}{" "}
              {detail.ocr && (
                <img src={verified} alt="" style={{ height: "70px" }} />
              )}
            </Title>
            <PlaceLine>
              <MdPlace size={25} />
              <Place>
                {istranslate ? translateResult.location : detail.location}
              </Place>
              <Seat>{istranslate ? translateResult.seat : detail.seat}</Seat>
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
                      alt={img.id}
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
            <Comment>
              {istranslate ? translateResult.content : detail.content}
              {detail.ocr && (
                <div fontSize="15px">👀 &nbsp; 관람 인증된 티켓</div>
              )}
            </Comment>
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
            <div>{detail.likes}</div>
            <div
              className="translate-btn"
              onClick={() =>
                istranslate
                  ? setIstranslate(false)
                  : handleTranslate(
                      detail.title,
                      detail.location,
                      detail.seat,
                      detail.content
                    )
              }
            >
              {istranslate ? "본문보기" : "번역하기(translate)"}
            </div>
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
            style={
              info
                ? {}
                : { height: "30px", lineHeight: "30px", marginBottom: "30px" }
            }
          >
            {!info && (
              <MdNavigateBefore
                color="#A9A9A9"
                size={isDesktop ? 50 : 30}
                onClick={() =>
                  navigate(`/myticket/${detail.ticketcategory.id}`)
                }
                style={{ cursor: "pointer" }}
              />
            )}
            {otheruserId || info ? (
              <></>
            ) : (
              <Delete onClick={handleDelete}>
                <MdDelete />
                <div>삭제하기</div>
              </Delete>
            )}
          </div>
          <MTicketBox className="ticketimg" ref={ticketRef} id="ticketbox">
            <FirstLine lineHeight="35px">
              <ProfileLine>
                <MProfileImg src={`${detail.authorProfileImageUrl}`} />
                <MNickname>{detail.authorNickname}</MNickname>
              </ProfileLine>
              <SaveBtn onClick={onDownloadBtn}>
                <MdSaveAlt color="#DEDEDE" size={25} />
              </SaveBtn>
            </FirstLine>
            <Title fontSize="22px">
              {istranslate ? translateResult.title : detail.title}
              {detail.ocr && (
                <img src={verified} alt="" style={{ height: "50px" }} />
              )}
            </Title>
            <PlaceLine height="20px">
              <MdPlace size={20} />
              <Place fontSize="15px">
                {istranslate ? translateResult.location : detail.location}
              </Place>
              <Seat fontSize="10px">
                {istranslate ? translateResult.seat : detail.seat}
              </Seat>
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
                      alt={img.id}
                      onClick={() => handleClickimg(img.url)}
                      style={{
                        width: "100%",
                        height: "25vw",
                        objectFit: "cover",
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
                        objectFit: "cover",
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
                        objectFit: "cover",
                      }}
                    />
                  ))
                ) : (
                  <></>
                )}
              </ImageLine>
            )}
            <Line src={line} />
            <Comment fontSize="12px">
              {istranslate ? translateResult.content : detail.content}
              {detail.ocr && (
                <div fontSize="10px">👀 &nbsp; 관람 인증된 티켓</div>
              )}
            </Comment>
          </MTicketBox>
          <HeartLine>
            {isHeart ? (
              <FaHeart color="white" onClick={handleHeart} />
            ) : (
              <FaRegHeart color="#8F8F8F" onClick={handleHeart} />
            )}
            <div>{detail.likes}</div>
            <div
              className="translate-btn"
              onClick={() =>
                istranslate
                  ? setIstranslate(false)
                  : handleTranslate(
                      detail.title,
                      detail.location,
                      detail.seat,
                      detail.content
                    )
              }
            >
              {istranslate ? "본문보기" : "번역하기(translate)"}
            </div>
          </HeartLine>
          <ImgModal
            isOpen={modal}
            onRequestClose={() => setModal(false)}
            imgUrl={clickimgurl}
          />
        </Wrapper>
      )}
    </>
  );
};

export default Detail;

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
  object-fit: cover;
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
