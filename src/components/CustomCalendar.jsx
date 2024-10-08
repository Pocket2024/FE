import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import moment from "moment";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../context/Responsive";

const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  padding: ${(props) => props.padding};
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    background-color: rgba(0, 0, 0, 0);
  }
  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: white;
      font-size: ${(props) => props.fontsize};
    }
  }
  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }
  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: ${(props) => props.fontsize};
    color: white;
  }
  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:hover,
  .react-calendar__navigation button:focus {
    color: #ff7a00;
    background-color: #323232;
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: white;
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }
  /* 일요일에만 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: #d85656;
  }
  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background-color: #4a4a4a;
    abbr {
      color: white;
    }
  }
  /* hover 했을 때 타일 색상 변경 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    abbr {
      color: #ff7a00;
    }
    background-color: #323232;
  }
  .react-calendar__tile {
    aspect-ratio: 1 / 1;
    border-radius: 50%;
  }
  /* 년월 레이블 스타일 */
  .react-calendar__year-view__months {
    abbr {
      color: white;
    }
  }

  .dot {
    height: 8px;
    width: 8px;
    background-color: #e65e2e;
    border-radius: 50%;
    display: flex;
    margin: auto;
  }
`;

const CustomCalendar = () => {
  const [value, setValue] = useState(new Date()); // 초기값은 현재 날짜
  const userId = localStorage.getItem("userId");
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [reviewdate, setReviewdate] = useState([]);
  const navigate = useNavigate();
  const { isDesktop } = useResponsive();

  const handleChange = (date) => {
    setValue(date);
    const formattedDate = moment(date).format("YYYY.MM.DD");
    // 선택된 날짜로 라우팅
    navigate(`/myticket/calendar/${formattedDate}`);
  };

  useEffect(() => {
    const getDate = () => {
      api
        .get(`/api/reviews/dates?userId=${userId}`, {
          headers: {
            Authorization: `${ACCESS_TOKEN}`,
          },
        })
        .then((res) => {
          console.log(res);
          setReviewdate(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("날짜 받아오기 실패");
        });
    };

    getDate();
  }, [userId, ACCESS_TOKEN]);
  return (
    <StyledCalendarWrapper
      padding={!isDesktop && "0 30px"}
      fontsize={isDesktop ? "1.2rem" : "1rem"}
    >
      <Calendar
        onChange={handleChange}
        value={value}
        calendarType="gregory"
        formatDay={(locale, date) => moment(date).format("DD")}
        tileContent={({ date, view }) => {
          if (
            reviewdate.find((x) => x.date === moment(date).format("YYYY.MM.DD"))
          ) {
            return (
              <>
                <div className="flex justify-center items-center absoluteDiv">
                  <div className="dot"></div>
                </div>
              </>
            );
          }
        }}
      />
    </StyledCalendarWrapper>
  );
};

export default CustomCalendar;
