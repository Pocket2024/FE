import React, { useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Ticket from "./Ticket";
import profileimg from "../images/profileimg.png";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const RecentTitle = styled.div`
  font-weight: 700;
  font-size: 25px;
  color: white;
  margin: 100px 0 20px 0;
`;

const RecentList = styled.div`
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
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  div {
    color: white;
    font-size: 18px;
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

let dummy = [
  {
    id: 1,
    profileimg: profileimg,
    nickname: "닉네임1",
    heart: 122,
    title: "제목1",
    place: "장소1",
    seat: "좌석1",
    year: "2024",
    date: "03.27",
  },
  {
    id: 2,
    profileimg: profileimg,
    nickname: "닉네임2",
    heart: 98,
    title: "제목2",
    place: "장소2",
    seat: "좌석2",
    year: "2024",
    date: "09.07",
  },
  {
    id: 3,
    profileimg: profileimg,
    nickname: "닉네임3",
    heart: 77,
    title: "제목3",
    place: "장소3",
    seat: "좌석3",
    year: "2024",
    date: "07.09",
  },
  {
    id: 4,
    profileimg: profileimg,
    nickname: "닉네임4",
    heart: 45,
    title: "제목4",
    place: "장소4",
    seat: "좌석4",
    year: "2024",
    date: "12.12",
  },
];

const RecentTicket = () => {
  const isDesktop = useMediaQuery({ minWidth: 1220 });
  const [isHeart, setIsHeart] = useState(false);

  const handleHeart = () => {
    if (isHeart) {
      setIsHeart(!isHeart);
    } else {
      setIsHeart(!isHeart);
    }
  };
  return (
    <>
      {isDesktop ? (
        <>
          <RecentTitle>🚀 가장 최신 티켓</RecentTitle>
          <RecentList>
            {dummy.map((hot) => (
              <div>
                <FlexLine>
                  <ProfileLine>
                    <img src={hot.profileimg} />
                    <div>{hot.nickname}</div>
                  </ProfileLine>
                  <Heart>
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
                    {hot.heart}
                  </Heart>
                </FlexLine>
                <Ticket
                  key={hot.id}
                  title={hot.title}
                  place={hot.place}
                  seat={hot.seat}
                  year={hot.year}
                  date={hot.date}
                />
              </div>
            ))}
          </RecentList>
        </>
      ) : (
        <Ticket />
      )}
    </>
  );
};

export default RecentTicket;
