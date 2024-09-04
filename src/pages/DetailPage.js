import React from "react";
import styled from "styled-components";
import Detail from "../components/Detail";

const Wrapper = styled.div`
  background-color: #262626;
  width: 100vw;
  min-height: calc(100vh - 80px);
  padding: 0 30px;
`;

const DetailPage = () => {
  // 배포 확인을 위한 주석 수정
  return (
    <Wrapper>
      <Detail />
    </Wrapper>
  );
};

export default DetailPage;
