import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";

const CustomCalendar = () => {
  const [value, onChange] = useState(new Date()); // 초기값은 현재 날짜
  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};

export default CustomCalendar;
