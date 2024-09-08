import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import moment from "moment";
import api from "../api/api";

const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
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
      font-size: 1.2rem;
    }
  }
  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }
  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1.2rem;
    color: white;
  }
  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: white;
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: white;
    color: ${(props) => props.theme.darkBlack};
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
    color: red;
  }
  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background: none;
    abbr {
      color: yellow;
    }
  }
  /* hover 했을 때 타일 색상 변경 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: var(--festie-primary-orange, #ff7a00);
  }
  .react-calendar__tile {
    aspect-ratio: 1 / 1;
    border-radius: 50%;
  }

  .dot {
    height: 8px;
    width: 8px;
    background-color: #f87171;
    border-radius: 50%;
    display: flex;
    margin-left: 1px;
  }
`;

const CustomCalendar = () => {
  const [value, onChange] = useState(new Date()); // 초기값은 현재 날짜
  const userId = localStorage.getItem("userId");
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [reviewdate, setReviewdate] = useState([]);

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
    <StyledCalendarWrapper>
      <Calendar
        onChange={onChange}
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
