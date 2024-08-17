import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ticket_component from "../images/ticket_component.png";

// 스캔 라인의 애니메이션 정의
const scanAnimation = keyframes`
  0% {
    top: 0;
  }
  50% {
    top: 50%;
  }
  100% {
    top: 100%;
  }
`;
const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(33, 33, 33, 0.73);
  position: absolute;
  top: -80px;
  z-index: 999;
`;

// 티켓 이미지 스타일
const TicketContainer = styled.div`
  position: relative;
  width: 20vw;
  height: 28vw;
  margin: 20px auto;
  border-radius: 10px;
  top: 20%;
  img {
    position: absolute;
    width: 20vw;
    height: fit-content;
  }
  div {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 18px;
    font-weight: 700;
  }
`;

// 스캔 라인 스타일 및 애니메이션 적용
const ScanLine = styled.div`
  position: absolute;
  width: 120%;
  height: 5px;
  top: 0;
  left: -10%;
  background-color: rgba(0, 255, 0, 0.7); /* 녹색 반투명 배경색 */
  box-shadow: 0px 0px 10px rgba(0, 255, 0, 0.7);
  animation: ${scanAnimation} 3s infinite;
`;

// 티켓 스캔 컴포넌트
const TicketScan = () => {
  const [scanning, setScanning] = useState(true);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setScanning(false);
  //       if (onScanComplete) {
  //         onScanComplete(); // 스캔 완료 후 콜백 호출
  //       }
  //     }, 3000); // 3초 후 스캔 완료

  //     return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  //   }, [onScanComplete]);

  return (
    <LoadingWrapper>
      <TicketContainer>
        <img src={ticket_component} alt="티켓" />
        <div>티켓 정보 추출 중 ...</div>
        {scanning && <ScanLine />} {/* 스캔 중일 때만 스캔 라인 표시 */}
      </TicketContainer>
    </LoadingWrapper>
  );
};

export default TicketScan;
