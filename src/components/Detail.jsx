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
  // GPU 가속 활용
  transform: translateZ(0);
  will-change: transform;

  // 불필요한 레이어 생성 방지
  contain: layout style paint;

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
  // 이미지 렌더링 최적화
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  // GPU 가속
  transform: translateZ(0);
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
    // 이미지 렌더링 최적화
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    // 레이아웃 시프트 방지
    width: 100%;
    height: auto;
    // GPU 가속
    transform: translateZ(0);
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

  // 메모리 사용량 모니터링 커스텀 훅
  const useMemoryMonitor = () => {
    const [memoryInfo, setMemoryInfo] = useState(null);

    useEffect(() => {
      const checkMemory = () => {
        if ("memory" in performance) {
          const memory = performance.memory;
          setMemoryInfo({
            used: Math.round(memory.usedJSHeapSize / 1048576), // MB
            total: Math.round(memory.totalJSHeapSize / 1048576),
            limit: Math.round(memory.jsHeapSizeLimit / 1048576),
          });
        }
      };

      const interval = setInterval(checkMemory, 1000);
      return () => clearInterval(interval);
    }, []);

    return memoryInfo;
  };

  // 안전한 이미지 생성 래퍼
  const safeImageGeneration = async (element, options = {}) => {
    // 메모리 체크
    if ("memory" in performance) {
      const memory = performance.memory;
      const availableMemory = memory.jsHeapSizeLimit - memory.usedJSHeapSize;
      const estimatedUsage =
        element.offsetWidth *
        element.offsetHeight *
        4 *
        (options.scale || 1) ** 2;

      if (estimatedUsage > availableMemory * 0.5) {
        throw new Error("메모리 부족으로 이미지 생성을 중단합니다.");
      }
    }

    // 타임아웃 설정
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("이미지 생성 시간 초과")), 30000);
    });

    const canvasPromise = html2canvas(element, options);

    try {
      return await Promise.race([canvasPromise, timeoutPromise]);
    } catch (error) {
      // 메모리 정리
      if (global.gc) {
        global.gc();
      }
      throw error;
    }
  };

  const onDownloadBtn = async () => {
    if (!window.confirm("티켓 이미지를 저장하시겠습니까?")) {
      return;
    }

    const ticket = ticketRef.current;

    try {
      const canvas = await safeImageGeneration(ticket, {
        // 배경을 투명하게 설정하여 불필요한 렌더링 제거
        backgroundColor: null,

        // 고해상도 출력을 위한 스케일링 (메모리 사용량 16배 증가 주의)
        scale: 4,

        // CORS 이미지 처리 최적화
        useCORS: true,
        allowTaint: false,

        // 로깅 비활성화로 성능 향상
        logging: false,

        // 렌더링 최적화 옵션
        removeContainer: true,

        // 불필요한 요소 제외
        ignoreElements: (element) => {
          return (
            element.tagName === "BUTTON" ||
            element.classList.contains("exclude-from-capture")
          );
        },

        // 이미지 품질 vs 성능 균형
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          // 클론된 문서에서 불필요한 스타일 제거
          const styleElements = clonedDoc.querySelectorAll("style");
          styleElements.forEach((style) => {
            if (!style.textContent.includes("ticket")) {
              style.remove();
            }
          });
        },
      });

      // Canvas 처리 후 즉시 메모리 정리
      processCanvas(canvas);
    } catch (error) {
      console.error("Canvas generation failed:", error);
      showNotification("⚠️ 이미지 생성에 실패했습니다.");
    }
  };

  const processCanvas = (canvas) => {
    const ctx = canvas.getContext("2d");

    // 원래 캔버스 내용을 ImageData로 추출
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // 메모리 효율적인 픽셀 조작
    const data = imageData.data;
    const { width, height } = canvas;

    // 티켓 특유의 원형 홀 처리 (scale 4 적용)
    const leftCircle = { x: 0, y: 315 * 4, radius: 50 };
    const rightCircle = { x: width, y: 315 * 4, radius: 50 };

    // 최적화된 원형 마스크 적용
    applyCircularMask(data, width, height, leftCircle);
    applyCircularMask(data, width, height, rightCircle);

    // 수정된 데이터를 다시 캔버스에 적용
    ctx.putImageData(imageData, 0, 0);

    // Blob 생성 및 다운로드
    canvas.toBlob(
      (blob) => {
        if (blob !== null) {
          saveAs(blob, `ticket-${Date.now()}.png`);
          showNotification("✅ 티켓 이미지가 저장되었습니다.");
        }

        // 메모리 정리
        cleanupCanvas(canvas);
      },
      "image/png",
      0.95
    ); // 품질 95%로 파일 크기 최적화
  };

  // 효율적인 원형 마스크 처리
  const applyCircularMask = (data, width, height, circle) => {
    const { x: cx, y: cy, radius } = circle;
    const radiusSquared = radius * radius;

    // 바운딩 박스로 처리 영역 제한
    const minX = Math.max(0, cx - radius);
    const maxX = Math.min(width, cx + radius);
    const minY = Math.max(0, cy - radius);
    const maxY = Math.min(height, cy + radius);

    for (let y = minY; y < maxY; y++) {
      for (let x = minX; x < maxX; x++) {
        const dx = x - cx;
        const dy = y - cy;

        if (dx * dx + dy * dy <= radiusSquared) {
          const index = (y * width + x) * 4;
          data[index + 3] = 0; // 알파 채널만 수정
        }
      }
    }
  };

  // 캔버스 메모리 정리
  const cleanupCanvas = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Canvas 크기를 1x1로 축소하여 메모리 해제
    canvas.width = 1;
    canvas.height = 1;
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
