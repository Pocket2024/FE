import React, { useState } from "react";
import styled from "styled-components";
import Ticket from "./Ticket";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import TicketModal from "./TicketModal";
import { useResponsive } from "../context/Responsive";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import useNotificationStore from "../store/notificationStore";

const SearchTitle = styled.div`
  font-weight: 700;
  font-size: 25px;
  color: white;
  margin: 50px 0 20px 0;
`;

const ResultList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 45%);
  justify-content: space-between;
  gap: 30px 0;
`;
const FlexLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const ProfileLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0 10px;
  img {
    width: ${(props) => props.width};
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    object-fit: cover;
  }
  div {
    color: white;
    font-size: ${(props) => props.fontSize};
    font-weight: 600;
  }
`;
const Heart = styled.div`
  display: flex;
  color: #8f8f8f;
  gap: 0 10px;
  align-items: center;
  font-weight: 500;
`;
const NoResult = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: #afafaf;
  font-size: 20px;
  font-size: 500;
  margin-top: 100px;
`;

const SearchResult = ({ results, keyword }) => {
  const { isDesktop } = useResponsive();
  const [islike, setIslike] = useState(false);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const { showNotification } = useNotificationStore();

  const handleHeart = (ticketId, isHeart) => {
    if (isHeart) {
      api
        .delete(`/api/likes/unlike/${ticketId}?userId=${userId}`, {
          headers: {
            Authorization: `${ACCESS_TOKEN}`,
          },
        })
        .then(() => {
          showNotification("♡ 좋아요 취소");
          setIslike(true);
        })
        .catch((err) => {
          console.log("좋아요 취소 err", err);
        });
    } else {
      api
        .post(
          `/api/likes/like/${ticketId}?userId=${userId}`,
          {},
          {
            headers: {
              Authorization: `${ACCESS_TOKEN}`,
            },
          }
        )
        .then(() => {
          showNotification("♥ 좋아요");
          setIslike(true);
        })
        .catch((err) => {
          console.log("좋아요 err", err);
        });
    }
  };

  const [selected, setSelected] = useState([]);

  const handleTicket = (selected) => {
    setModal(true);
    setSelected(selected);
  };
  return (
    <>
      {isDesktop ? (
        <>
          <SearchTitle>'{keyword}' 검색 결과</SearchTitle>
          {results.length === 0 && <NoResult>검색 결과가 없습니다.</NoResult>}
          <ResultList>
            {results.map((result) => (
              <div key={result.id}>
                <TicketModal
                  isOpen={modal}
                  onRequestClose={() => setModal(false)}
                  info={selected}
                />
                <FlexLine>
                  <ProfileLine>
                    <img
                      src={result.authorProfileImageUrl}
                      alt="profile"
                      width="40px"
                    />
                    <div fontSize="18px">{result.authorNickname}</div>
                  </ProfileLine>
                  <Heart>
                    {result.likedByCurrentUser ? (
                      <FaHeart
                        color="white"
                        onClick={() =>
                          handleHeart(result.id, result.likedByCurrentUser)
                        }
                        size={20}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <FaRegHeart
                        color="#8F8F8F"
                        onClick={() =>
                          handleHeart(result.id, result.likedByCurrentUser)
                        }
                        size={20}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                    {result.likes}
                  </Heart>
                </FlexLine>
                <div onClick={() => handleTicket(result)}>
                  <Ticket
                    key={result.id}
                    title={result.title}
                    place={result.location}
                    seat={result.seat}
                    year={result.date.substr(0, 4)}
                    date={result.date.substr(5, 9)}
                    custom={result.customImageUrl}
                  />
                </div>
              </div>
            ))}
          </ResultList>
        </>
      ) : (
        <>
          <MSearchTitle>'{keyword}' 검색 결과</MSearchTitle>
          {results.length === 0 && <MNoResult>검색 결과가 없습니다.</MNoResult>}
          <MResultList>
            {results.map((result) => (
              <div key={result.id} className="resultdiv">
                <FlexLine>
                  <ProfileLine
                    onClick={() => navigate(`/user/${result.authorId}`)}
                  >
                    <img
                      src={result.authorProfileImageUrl}
                      alt="profile"
                      width="30px"
                    />
                    <div fontSize="15px">{result.authorNickname}</div>
                  </ProfileLine>
                  <Heart>
                    {result.likedByCurrentUser ? (
                      <FaHeart
                        color="white"
                        onClick={handleHeart}
                        size={15}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <FaRegHeart
                        color="#8F8F8F"
                        onClick={handleHeart}
                        size={15}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                    {result.likes}
                  </Heart>
                </FlexLine>
                <div onClick={handleTicket}>
                  <Ticket
                    key={result.id}
                    title={result.title}
                    place={result.location}
                    seat={result.seat}
                    year={result.date.substr(0, 4)}
                    date={result.date.substr(5, 9)}
                    custom={result.customImageUrl}
                  />
                </div>
                <TicketModal
                  isOpen={modal}
                  onRequestClose={() => setModal(false)}
                  info={result}
                />
              </div>
            ))}
          </MResultList>
        </>
      )}
    </>
  );
};

export default SearchResult;

const MSearchTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: white;
  margin: 30px 0;
`;

const MNoResult = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: #afafaf;
  font-size: 15px;
  font-size: 500;
  margin-top: 100px;
`;

const MResultList = styled.div`
  .resultdiv {
    margin-bottom: 40px;
  }
`;
